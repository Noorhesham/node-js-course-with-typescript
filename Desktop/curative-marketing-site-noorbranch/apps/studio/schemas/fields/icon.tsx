import { Icon, iconIds } from '@/components/Icon'
import { defineField } from 'sanity'

export const icon = defineField({
  name: 'icon',
  title: 'Icon',
  type: 'iconPicker',
  options: {
    collapsible: false,
    configurations: [
      {
        title: 'Webstacks Icons',
        provider: 'webstacks',
        icons: () =>
          iconIds.map((iconId) => ({
            name: iconId,
            component: () => <Icon size={24} icon={iconId} />,
            tags: [iconId],
          })),
      },
    ],
  },
  preview: {
    select: {
      provider: 'icon.provider',
      name: 'icon.name',
    },
    prepare(icon) {
      return {
        title: icon.provider,
        subtitle: icon.name,
      }
    },
  },
})
