import { Box, Card, Stack, Text, TextInput, Flex, Switch, Button, Tooltip } from '@sanity/ui'
import { DragHandleIcon, EyeClosedIcon, EyeOpenIcon, SyncIcon } from '@sanity/icons'
import { GoHeading } from 'react-icons/go'
import { PortableTextBlock } from '@portabletext/types'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFormValue, useClient, type Path } from 'sanity'
import { v4 as uuidv4 } from 'uuid'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

// Types
interface TOCItem {
  key: string
  title: string
  originalTitle: string
  level: number
  sectionId: string
  hidden: boolean
  order: number
}

interface TableOfContentsProps {
  value: PortableTextBlock[] | { body: PortableTextBlock[] }
  path?: Path;
}

type SortableItemProps = {
  item: TOCItem
  onToggle: (key: string) => void
  onChange: (key: string, title: string) => void
}

interface TOCItemContentProps {
  item: TOCItem
  onToggle: (key: string) => void
  onChange: (key: string, title: string) => void
  attributes: Record<string, any>
  listeners: Record<string, any>
  style: Record<string, any>
}

// Components
const DragHandle = () => (
  <Box style={{ cursor: 'grab' }}>
    <DragHandleIcon />
  </Box>
)

const TOCItemContent = memo(({ item, onToggle, onChange, attributes, listeners, style }: TOCItemContentProps) => {
  const [localTitle, setLocalTitle] = useState(item.title)
  const itemKey = item.key || `toc-item-${item.order}`

  const onTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(event.currentTarget.value)
  }, [])

  const onTitleBlur = useCallback(() => {
    onChange(itemKey, localTitle)
  }, [itemKey, localTitle, onChange])

  useEffect(() => {
    setLocalTitle(item.title)
  }, [item.title])

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onToggle(itemKey)
  }, [itemKey, onToggle])

  if (!item) {
    console.error('Rendering without item')
    return null
  }

  return (
    <div style={style}>
      <Flex gap={2} align="center">
        <div {...attributes} {...listeners}>
          <DragHandle />
        </div>
        <Text size={0} muted>H{item.level}</Text>
        <Box flex={1}>
          <TextInput
            value={localTitle}
            onChange={onTitleChange}
            onBlur={onTitleBlur}
            style={{ width: '100%' }}
            disabled={item.hidden}
          />
        </Box>
        <Button
          icon={item.hidden ? EyeClosedIcon : EyeOpenIcon}
          mode="bleed"
          padding={2}
          onClick={handleToggle}
          data-testid={`toggle-${item.key}`}
        />
      </Flex>
    </div>
  )
})

const SortableItem = memo(({ item, onToggle, onChange }: SortableItemProps) => {
  if (!item) {
    console.error('SortableItem received no item')
    return null
  }
  
  // Ensure we have a valid key
  const itemKey = item.key || `toc-item-${item.order}`

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: itemKey
  })

  const style = useMemo(() => ({
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition
  }), [transform, transition])

  return (
    <div ref={setNodeRef}>
      <TOCItemContent 
        item={item}
        onToggle={onToggle}
        onChange={onChange}
        attributes={attributes}
        listeners={listeners}
        style={style}
      />
    </div>
  )
})

// Main component
export function TableOfContents({ value, path }: TableOfContentsProps) {
  const documentId = useFormValue(['_id']) as string
  const parentPath = path || []
  const existingToc = useFormValue([...parentPath, 'tableOfContents']) as TOCItem[] | undefined
  const tocPath = [...parentPath, 'tableOfContents'].reduce((a, b) => typeof b === 'string' ? `${a}${a === '' ? '' : '.'}${b}` : `${a}[_key=="${(b as any)['_key']}"]`) as string;
  const bodyContent = useFormValue([...parentPath, 'body']) as PortableTextBlock[]
  const client = useClient({ apiVersion: '2024-01-01' })
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const timerRef = useRef<NodeJS.Timeout>()

  const generateKey = useCallback((text: string, index: number) => {
    if (!text) {
      return `heading-${index}`
    }
    const base = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
    return `toc-${base}`
  }, [])

  const generateTocItems = useCallback((blocks: PortableTextBlock[]): TOCItem[] => {
    if (!blocks || !Array.isArray(blocks)) {
      return []
    }

    // Find all heading blocks

    const headingBlocks = blocks.filter(block => 
      block._type === 'block' && 
      block.style?.match(/^h[1-6]$/) &&
      block.children?.[0]?.text
    )


    // Map them to TOC items
    return headingBlocks.map((block, index) => {
      const title = block.children[0].text.trim()
      const level = parseInt(block.style.substring(1))
      const key = generateKey(title, index)

      return {
        _key: uuidv4(),
        key,
        title,
        originalTitle: title,
        level,
        sectionId: key,
        hidden: false,
        order: index
      }
    })
  }, [generateKey])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Initialize TOC items from existing TOC or generate from body content
  useEffect(() => {
    const initialize = async () => {
      if (tocItems.length > 0) {
        return
      }

      
      // First try to use existing TOC
      if (existingToc?.length) {
        setTocItems(existingToc)
        return
      }
      // Then try to use body content
      if (bodyContent?.length) {
        const items = generateTocItems(bodyContent)
        if (items.length > 0) {
          setTocItems(items)
          try {
            await client
              .patch(documentId)
              .set({ [tocPath]: items })
              .commit()
          } catch (error) {
            console.error('Error saving initial TOC:', error)
          }
        }
        return
      }

      // Finally try to use value prop
      const blocks = Array.isArray(value) ? value : value?.body
      if (blocks?.length) {
        const items = generateTocItems(blocks)

        if (items.length > 0) {
          setTocItems(items)
          try {
            await client
              .patch(documentId)
              .set({ [tocPath]: items })
              .commit()
          } catch (error) {
            console.error('Error saving initial TOC:', error)
          }
        }
      }
    }

    initialize()
  }, [existingToc, bodyContent, value, documentId, generateTocItems, client])


  // Initialize TOC items from existing TOC or generate from body content
  useEffect(() => {
    if (tocItems.length > 0) {
      return
    }

    
    // First try to use existing TOC
    if (existingToc?.length) {
      setTocItems(existingToc)
      return
    }

    // Then try to use body content
    if (bodyContent?.length) {
      const items = generateTocItems(bodyContent)
      if (items.length > 0) {
        setTocItems(items)
        client
          .patch(documentId)
          .set({ [tocPath]: items })
          .commit()
          .catch(() => {})
      }
      return
    }

    // Finally try to use value prop
    const blocks = Array.isArray(value) ? value : value?.body
    if (blocks?.length) {
      const items = generateTocItems(blocks)
      console.log('Generated', items.length, 'items from value prop')
      if (items.length > 0) {
        setTocItems(items)
        client
          .patch(documentId)
          .set({ [tocPath]: items })
          .commit()
          .catch(() => {})
      }
    }
  }, [existingToc, bodyContent, value, documentId, generateTocItems, client, tocItems])

  const updateTocItem = useCallback(async (index: number, updates: Partial<TOCItem>) => {
    if (!documentId || index < 0 || index >= tocItems.length) {
      return
    }
    
    try {
      
      // Get current item state
      const currentItem = tocItems[index]
      const updatedItem = { ...currentItem, ...updates }
      
      // Create a single atomic update
      const patch = client.patch(documentId)
      
      // Update local state first for immediate feedback
      setTocItems(prevItems => {
        const newItems = [...prevItems]
        newItems[index] = updatedItem
        return newItems
      })

      // Then update Sanity atomically
      await patch
        .set({ [`${tocPath}[${index}]`]: updatedItem })
        .commit()

    } catch (error) {
      // Revert local state on error
      setTocItems(prevItems => {
        const newItems = [...prevItems]
        newItems[index] = tocItems[index]
        return newItems
      })
    }
  }, [documentId, client, tocItems])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    
    if (over && active.id !== over.id) {
      const oldIndex = tocItems.findIndex((item) => item.key === active.id)
      const newIndex = tocItems.findIndex((item) => item.key === over.id)
      
      const newItems = arrayMove(tocItems, oldIndex, newIndex).map((item, i) => ({
        ...item,
        order: i
      }))
      
      client
        .patch(documentId)
        .set({ [tocPath]: newItems })
        .commit()
        .catch(() => {})
      
      setTocItems(newItems)
    }
  }, [tocItems, client, documentId])

  const handleItemChange = useCallback((key: string, newTitle: string) => {
    const index = tocItems.findIndex((i) => i.key === key)
    if (index === -1) return
    updateTocItem(index, { title: newTitle })
  }, [tocItems, updateTocItem])

  const handleItemToggle = useCallback((itemKey: string) => {
    
    const index = tocItems.findIndex(item => item.key === itemKey)
    if (index === -1) {
      return
    }

    // Toggle the hidden state
    const newHiddenState = !tocItems[index].hidden

    // Use updateTocItem to handle both state and Sanity update
    updateTocItem(index, { hidden: newHiddenState })
  }, [tocItems, updateTocItem])

  const resetToDefault = useCallback(async () => {
    // Wait a short moment to ensure we have latest content
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Try bodyContent first
    if (bodyContent?.length) {
      console.log('Using bodyContent for reset:', bodyContent.length, 'blocks')
      const items = generateTocItems(bodyContent)
      if (items.length > 0) {
        console.log('Generated', items.length, 'items from bodyContent')
        setTocItems(items)
        client
          .patch(documentId)
          .set({ [tocPath]: items })
          .commit()
          .catch(error => console.error('Error resetting TOC:', error))
        return
      }
    }

    // Fall back to value prop
    const blocks = Array.isArray(value) ? value : value?.body
    if (blocks?.length) {
      console.log('Using value prop for reset:', blocks.length, 'blocks')
      const items = generateTocItems(blocks)
      if (items.length > 0) {

        setTocItems(items)
        client
          .patch(documentId)
          .set({ [tocPath]: items })
          .commit()
          .catch(error => console.error('Error resetting TOC:', error))
        return
      }
    }

    console.error('No valid content found for reset')
  }, [bodyContent, value, generateTocItems, client, documentId])

  const fetchNewHeadings = useCallback(async () => {
    // Wait a short moment to ensure latest changes are saved
    await new Promise(resolve => setTimeout(resolve, 100))
    console.log('Fetching new headings')
    
    // Create a map of existing items by their title for quick lookup
    const existingItemsMap = new Map(tocItems.map(item => [item.originalTitle, item]))
    console.log('Existing items:', [...existingItemsMap.entries()])
    
    // Try bodyContent first
    if (bodyContent?.length) {
      console.log('Checking bodyContent:', bodyContent)
      const newItems = generateTocItems(bodyContent)
      console.log('Generated items from bodyContent:', newItems)
      if (newItems.length > 0) {
        // Merge new items with existing ones, preserving changes
        const mergedItems = newItems.map(newItem => {
          const existingItem = existingItemsMap.get(newItem.originalTitle)
          if (existingItem) {
            console.log('Found existing item for:', newItem.originalTitle, { existing: existingItem, new: newItem })
            // Preserve existing item's properties
            return {
              ...newItem,
              title: existingItem.title, // Keep user's title changes
              hidden: existingItem.hidden, // Keep visibility state
              key: existingItem.key, // Keep the same key
              sectionId: existingItem.sectionId // Keep the same sectionId
            }
          }
          console.log('New item:', newItem.originalTitle)
          return newItem // Use new item as is if it doesn't exist
        })

        console.log('Final merged items:', mergedItems)
        setTocItems(mergedItems)
        client
          .patch(documentId)
          .set({ [tocPath]: mergedItems })
          .commit()
          .catch(error => console.error('Error updating TOC:', error))
        return
      }
    }

    // Fall back to value prop
    const blocks = Array.isArray(value) ? value : value?.body
    if (blocks?.length) {
      console.log('Checking value prop:', blocks)
      const newItems = generateTocItems(blocks)
      console.log('Generated items from value prop:', newItems)
      if (newItems.length > 0) {
        // Merge new items with existing ones, preserving changes
        const mergedItems = newItems.map(newItem => {
          const existingItem = existingItemsMap.get(newItem.originalTitle)
          if (existingItem) {
            console.log('Found existing item for:', newItem.originalTitle, { existing: existingItem, new: newItem })
            // Preserve existing item's properties
            return {
              ...newItem,
              title: existingItem.title, // Keep user's title changes
              hidden: existingItem.hidden, // Keep visibility state
              key: existingItem.key, // Keep the same key
              sectionId: existingItem.sectionId // Keep the same sectionId
            }
          }
          console.log('New item:', newItem.originalTitle)
          return newItem // Use new item as is if it doesn't exist
        })

        console.log('Final merged items:', mergedItems)
        setTocItems(mergedItems)
        client
          .patch(documentId)
          .set({ [tocPath]: mergedItems })
          .commit()
          .catch(error => console.error('Error updating TOC:', error))
        return
      }
    }

    console.error('No valid content found for fetching headings')
    
    // Combine all headings and sort them by their position in the document
    const allHeadings = [...tocItems, ...headingsToAdd].sort((a, b) => {
      // Find the original indices in the document
      const aIndex = bodyBlocks.findIndex(block => block._key === a.key)
      const bIndex = bodyBlocks.findIndex(block => block._key === b.key)
      return aIndex - bIndex
    })
    
    // Update order while preserving other properties of existing items
    const updatedItems = allHeadings.map((item, idx) => ({
      ...(existingItemsMap.get(item.key) || item), // Preserve existing item properties if it exists
      order: idx
    }))
    
    client
      .patch(documentId)
      .set({ [tocPath]: updatedItems })
      .commit()
      .catch(error => console.error('Error adding new headings:', error))
    
    setTocItems(updatedItems)
  }, [value, generateTocItems, client, documentId, tocItems])

  return (
    <Stack space={4}>
      <Flex justify="space-between" align="center">
        <Text weight="semibold" size={1}>Table of Contents</Text>
        <Flex gap={2}>
          <Tooltip
            content={
              <Box padding={2}>
                <Text size={1}>Reset to default (will remove all custom changes)</Text>
              </Box>
            }
            placement="top"
          >
            <Button
              icon={SyncIcon}
              mode="ghost"
              onClick={() => resetToDefault().catch(error => console.error('Error resetting TOC:', error))}
              tone="critical"
              size={1}
            />
          </Tooltip>
          <Button
            icon={GoHeading}
            mode="ghost"
            text="Fetch new headings"
            onClick={() => fetchNewHeadings().catch(error => console.error('Error fetching headings:', error))}
            size={1}
          />
        </Flex>
      </Flex>

      <Box style={{ background: 'var(--card-bg-color)' }}>
        <Card padding={4} radius={2} shadow={1}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={tocItems.map(item => item.key)}
              strategy={verticalListSortingStrategy}
            >
              <Stack space={3}>
                {tocItems.map((item) => (
                  <SortableItem
                    key={item.key}
                    item={item}
                    onToggle={handleItemToggle}
                    onChange={handleItemChange}
                  />
                ))}
              </Stack>
            </SortableContext>
          </DndContext>
        </Card>
      </Box>
    </Stack>
  )
}
