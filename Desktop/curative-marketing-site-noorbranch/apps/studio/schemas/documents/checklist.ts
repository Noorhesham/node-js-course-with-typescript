import { TbChecklist } from 'react-icons/tb'
import { defineType } from 'sanity'
import { downloadBase } from '../fields/downloadBase'

export const checklist = defineType({
  name: 'checklist',
  title: 'Checklist',
  icon: TbChecklist,
  type: 'document',
  ...downloadBase
})
