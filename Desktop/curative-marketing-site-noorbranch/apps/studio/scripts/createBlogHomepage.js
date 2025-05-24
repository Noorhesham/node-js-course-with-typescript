/**
 * This script creates the Blog Homepage document if it doesn't exist already.
 * Run this script after deploying changes to ensure the document is created.
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Create a client using the same project ID and dataset as your Sanity Studio
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  token: process.env.SANITY_API_TOKEN, // You must have a token with write permissions
  apiVersion: process.env.SANITY_STUDIO_API_VERSION || '2023-03-15',
  useCdn: false,
})

// Check if blog homepage document exists
async function createBlogHomepageIfNotExists() {
  try {
    // Check if the document already exists
    const existingDoc = await client.fetch('*[_id == "blogHomepage"][0]')
    
    if (existingDoc) {
      console.log('Blog Homepage document already exists. No action needed.')
      return
    }
    
    // Create the document if it doesn't exist
    const blogHomepage = {
      _id: 'blogHomepage',
      _type: 'blogHomepage',
      title: 'Blog Homepage',
      featuredArticles: [],
      conversionPanels: [],
      seo: {
        title: 'Blog - Webstacks',
        description: 'Explore our latest insights and articles on web development, marketing, and design.'
      }
    }
    
    const result = await client.createOrReplace(blogHomepage)
    console.log(`Created Blog Homepage document with ID: ${result._id}`)
  } catch (error) {
    console.error('Error creating Blog Homepage document:', error)
  }
}

// Run the function
createBlogHomepageIfNotExists()
