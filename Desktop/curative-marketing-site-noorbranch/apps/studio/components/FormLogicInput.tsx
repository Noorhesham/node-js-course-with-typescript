import { type FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Dialog, Flex, Text, Select, TextInput, Button } from '@sanity/ui'
import { InputProps, set } from 'sanity'

import { getAllFormData, getFormData } from '@/utils/fetchHubspotForm'

interface Logic {
  fieldName?: string
  progressiveFieldOptions?: string
  dependentFields?: {
    option?: number
    filterValue?: string
    thenShow?: string
  }[]
}

const optionList = [
  'contains',
  "doesn't contain",
  'starts with',
  'ends with',
  'is not empty',
]

const FormLogicInput: FC<InputProps> = (props) => {
  const { onChange, value } = props

  const [formIDData, setFormIDData] = useState<any>()
  const [data, setData] = useState<any>()
  const [openDialog, setOpenDialog] = useState(false)
  const [logicArray, setLogicArray] = useState<Logic[]>(
    (value as any)?.logic || [],
  )
  const [formID, setFormID] = useState((value as any)?.formId)
  const [selectedItem, setSelectedItem] = useState<any>()
  const [formFieldConditions, setFormFieldConditions] = useState({
    option: '',
    filterValue: '',
    thenShow: '',
  })
  const [progressiveFieldOptionValue, setProgressiveFieldOptionValue] =
    useState('')

  const onCloseDialog = useCallback(() => setOpenDialog(false), [])

  const getFormByID = async (formID: string) => {
    const fetchedData = await getFormData(formID)
    setData(fetchedData)
    onChange(set({ ...(value as any), formId: formID }))
  }

  useEffect(() => {
    formID && getFormByID(formID)
  }, [formID])

  useEffect(() => {
    if (!selectedItem || !progressiveFieldOptionValue) {
      return
    }
    const existingLogicIndex = logicArray.findIndex(
      (logic) => logic.fieldName === selectedItem?.name,
    )

    let updatedLogicArray

    if (existingLogicIndex !== -1) {
      const existingLogic = logicArray[existingLogicIndex]
      updatedLogicArray = [...logicArray]
      updatedLogicArray[existingLogicIndex] = {
        ...existingLogic,
        progressiveFieldOptions: progressiveFieldOptionValue,
      }
    } else {
      const newLogic: Logic = {
        fieldName: selectedItem?.name,
        progressiveFieldOptions: progressiveFieldOptionValue ?? 0,
      }
      updatedLogicArray = [...logicArray, newLogic]
    }
    setLogicArray(updatedLogicArray)
    onChange(set({ ...(value as any), logic: updatedLogicArray }))
  }, [progressiveFieldOptionValue])

  useEffect(() => {
    const init = async () => {
      const formIDs = await getAllFormData()
      setFormIDData(formIDs)
    }
    init()
  }, [])

  const onIDChange = (e: any) => {
    const currentID = formIDData?.formIds[e.target.value].id
    setFormID(currentID)
  }

  const handleAddLogic = () => {
    if (formFieldConditions.filterValue && formFieldConditions.thenShow) {
      const newCondition = {
        option: parseInt(formFieldConditions.option) ?? 0,
        filterValue: formFieldConditions.filterValue,
        thenShow: formFieldConditions.thenShow,
      }

      const existingLogicIndex = logicArray.findIndex(
        (logic) => logic.fieldName === selectedItem?.name,
      )

      let updatedLogicArray

      if (existingLogicIndex !== -1) {
        const existingLogic = logicArray[existingLogicIndex]
        updatedLogicArray = [...logicArray]
        updatedLogicArray[existingLogicIndex] = {
          ...existingLogic,
          dependentFields: [
            ...(existingLogic.dependentFields || []),
            newCondition,
          ],
        }
      } else {
        const newLogic: Logic = {
          fieldName: selectedItem?.name,
          progressiveFieldOptions: progressiveFieldOptionValue ?? 0,
          dependentFields: [newCondition],
        }
        updatedLogicArray = [...logicArray, newLogic]
      }
      setLogicArray(updatedLogicArray)
      onChange(set({ ...(value as any), logic: updatedLogicArray }))
    } else {
      // Form is invalid
    }
  }

  const memoizedFormOptions = useMemo(
    () =>
      formIDData?.formIds?.map((form: any, idx: number) => (
        <option key={`option-${idx}`} value={idx}>
          {form.name}
        </option>
      )),
    [formIDData],
  )

  const currentLogic = useMemo(() => {
    return logicArray.find((logic) => logic.fieldName === selectedItem?.name)
  }, [logicArray, selectedItem])

  return (
    <Flex direction="column" gap={5} align="center" style={{ width: '100%' }}>
      <Flex
        direction="column"
        gap={3}
        align="baseline"
        style={{ width: '100%' }}
      >
        <Text size={1} style={{ fontWeight: 600 }}>
          Form ID
        </Text>
        <Select
          fontSize={2}
          padding={3}
          space={2}
          onChange={onIDChange}
          value={formIDData?.formIds.findIndex(
            (form: any) => form.id === formID,
          )}
        >
          {memoizedFormOptions}
        </Select>
      </Flex>
      <Flex direction="column" gap={2} align="center" style={{ width: '100%' }}>
        {data?.fieldGroups?.map((group: any, idx: number) => (
          <Flex
            direction="row"
            gap={2}
            align="center"
            key={`fieldGroup-${idx}`}
            style={{ width: '100%', cursor: 'pointer' }}
          >
            {group?.fields?.map((item: any, index: number) => (
              <Flex
                direction="column"
                key={`field-${idx}-${index}`}
                gap={2}
                style={{ width: '100%' }}
                onClick={() => {
                  setOpenDialog(true)
                  setSelectedItem(item)
                }}
              >
                <Text size={1}>{item?.label}</Text>
                <Box
                  style={{ height: '25px', width: '100%', border: '1px solid' }}
                />
              </Flex>
            ))}
          </Flex>
        ))}
      </Flex>
      {openDialog && (
        <Dialog
          header={`Edit ${selectedItem?.name}`}
          id="dialog-logic"
          onClose={onCloseDialog}
          zOffset={1000}
        >
          <Flex padding={5} gap={2} direction="column">
            <Text>Progressive field Options</Text>
            <Select
              onChange={(e: any) =>
                setProgressiveFieldOptionValue(e.target.value)
              }
            >
              <option value="leave">Leave Field on the form</option>
              <option value="replace">
                Replace with queued progressive field
              </option>
            </Select>
            {!!currentLogic?.dependentFields?.length && (
              <Flex
                style={{
                  paddingTop: '20px',
                  paddingBottom: '20px',
                }}
                gap={3}
                direction="column"
              >
                {currentLogic?.dependentFields?.map((condition, index) => (
                  <Flex key={`condition-${index}`} gap={2} align="center">
                    <Text size={1}>
                      {`If ${currentLogic.fieldName} ${optionList[condition.option ?? 0]} ${condition.filterValue} then show ${condition.thenShow}`}
                    </Text>
                    <Button
                      tone="critical"
                      text="Delete"
                      onClick={() => {
                        const updatedDependentFields =
                          currentLogic.dependentFields?.filter(
                            (_, i) => i !== index,
                          )
                        const updatedLogicArray = logicArray.map((logic) =>
                          logic.fieldName === currentLogic.fieldName
                            ? {
                                ...logic,
                                dependentFields: updatedDependentFields,
                              }
                            : logic,
                        )
                        setLogicArray(updatedLogicArray)
                        onChange(
                          set({ ...(value as any), logic: updatedLogicArray }),
                        )
                      }}
                    />
                  </Flex>
                ))}
              </Flex>
            )}
            <Text>If {selectedItem?.name}</Text>
            <Select
              onChange={(e: any) =>
                setFormFieldConditions({
                  ...formFieldConditions,
                  option: e.target.value,
                })
              }
            >
              {optionList.map((option: any, idx: number) => (
                <option key={idx} value={idx}>
                  {option}
                </option>
              ))}
            </Select>
            <TextInput
              onChange={(e: any) =>
                setFormFieldConditions({
                  ...formFieldConditions,
                  filterValue: e.target.value,
                })
              }
            />
            <Text>then show:</Text>
            <Select
              onChange={(e: any) =>
                setFormFieldConditions({
                  ...formFieldConditions,
                  thenShow: e.target.value,
                })
              }
            >
              <option>Please choose a form field</option>
              {data?.fieldGroups?.map((group: any, rowIndex: number) =>
                group?.fields?.map((item: any, colIndex: number) => (
                  <option
                    key={`option-${rowIndex}-${colIndex}`}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                )),
              )}
            </Select>
            <Button text="Add" tone="primary" onClick={handleAddLogic} />
          </Flex>
        </Dialog>
      )}
    </Flex>
  )
}

export default FormLogicInput
