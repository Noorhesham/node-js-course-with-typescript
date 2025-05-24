import { DocumentPdfIcon } from '@sanity/icons'
import { defineType } from 'sanity'
import { downloadBase } from '../fields/downloadBase'

export const report = defineType({
  name: 'report',
  title: 'Report',
  icon: DocumentPdfIcon,
  type: 'document',
  ...downloadBase
})
