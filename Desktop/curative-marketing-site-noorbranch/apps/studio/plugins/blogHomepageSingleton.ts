/**
 * Plugin that ensures the blog homepage document exists.
 * Sets it up as a singleton so there's only one document of this type.
 */

import { definePlugin } from 'sanity'

export const blogHomepageSingleton = definePlugin({
  name: 'blog-homepage-singleton',
  document: {
    // Ensure there can be only one blog homepage document
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId !== 'blogHomepage')
      }
      return prev
    },
    // Remove the "duplicate" action for blog homepage
    actions: (prev, { schemaType }) => {
      if (schemaType === 'blogHomepage') {
        return prev.filter(({ action }) => action !== 'duplicate')
      }
      return prev
    },
  },
})
