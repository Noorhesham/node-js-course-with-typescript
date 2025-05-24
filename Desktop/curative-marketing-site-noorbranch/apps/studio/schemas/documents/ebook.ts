import { IoBookOutline } from 'react-icons/io5'
import { defineType } from 'sanity'
import { downloadBase } from '../fields/downloadBase'

export const ebook = defineType({
  name: 'ebook',
  title: 'Ebook',
  icon: IoBookOutline,
  type: 'document',
  ...downloadBase
})
