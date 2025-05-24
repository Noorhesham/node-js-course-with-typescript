import { OlistIcon } from '@sanity/icons'
import { defineType } from 'sanity'
import { downloadBase } from '../fields/downloadBase'

export const guide = defineType({
  name: 'guide',
  title: 'Guide',
  icon: OlistIcon,
  type: 'document',
  ...downloadBase
})
