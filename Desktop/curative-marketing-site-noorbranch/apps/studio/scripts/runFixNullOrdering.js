import { createClient } from '@sanity/client'
import { fixNullOrdering } from '../migrations/fixNullOrdering.js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Create a Sanity client
const client = createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_STUDIO_TOKEN, // needs write access
    useCdn: false,
})

console.log('🚀 Starting to fix null ordering values...')

fixNullOrdering(client)
    .then(() => {
        console.log('✨ Migration completed successfully!')
        process.exit(0)
    })
    .catch((error) => {
        console.error('💥 Migration failed:', error)
        process.exit(1)
    }) 