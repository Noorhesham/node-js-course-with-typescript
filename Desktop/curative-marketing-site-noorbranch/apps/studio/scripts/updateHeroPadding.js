/**
 * Script to update the responsivePadding for hero sections on any document type
 * 
 * Run this script using:
 * cd apps/studio
 * node scripts/updateHeroPadding.js [documentType]
 * 
 * Examples:
 * node scripts/updateHeroPadding.js technologyPage
 * node scripts/updateHeroPadding.js capabilitiesPage
 * node scripts/updateHeroPadding.js industryPage
 * node scripts/updateHeroPadding.js page
 * node scripts/updateHeroPadding.js landingPage
 * node scripts/updateHeroPadding.js all (to update all document types with hero sections)
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../../.env' });

// Create a Sanity client
const client = createClient({
  projectId: 'q9c9g16o',
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_STUDIO_TOKEN, // Using the SANITY_STUDIO_TOKEN for authentication
  apiVersion: '2021-10-21',
  useCdn: false,
});

// Define the responsive padding we want to set
const targetResponsivePadding = {
  default: {
    bottom: 48,
    top: 160
  },
  lg: {
    bottom: 96,
    top: 192
  },
  md: {
    bottom: 80,
    top: 144
  },
  sm: {
    bottom: 64,
    top: 160
  },
  twoXl: {
    bottom: 96,
    top: 192
  },
  xl: {
    bottom: 96,
    top: 192
  }
};

// Get document type from command line arguments
const documentType = process.argv[2] || 'technologyPage';

// Common document types that might have hero sections
const commonDocTypes = [
  'technologyPage',
  'capabilitiesPage',
  'industryPage',
  'page',
  'landingPage',
  'paidLandingPage',
  'solutionsPage',
  'useCasePage',
  'stagePage',
  'meetingThankYouPage'
];

// Main function to update hero padding
async function updateHeroPadding(docType) {
  try {
    // If 'all' is specified, update all common document types
    if (docType === 'all') {
      console.log('Updating hero sections for ALL document types...');
      let totalUpdated = 0;
      
      for (const type of commonDocTypes) {
        const updated = await processDocumentType(type);
        totalUpdated += updated;
      }
      
      console.log(`\n🎉 TOTAL: Updated ${totalUpdated} hero sections across all document types!`);
      return;
    }
    
    // Otherwise update the specified document type
    await processDocumentType(docType);
    
  } catch (error) {
    console.error('Error updating hero padding:', error);
  }
}

// Process a specific document type
async function processDocumentType(docType) {
  console.log(`\n📄 Fetching ${docType} documents with hero sections...`);
  
  // Query for all documents of the specified type that have a body array containing a hero section
  const query = `*[_type == "${docType}" && count(body[_type == "hero"]) > 0] {
    _id,
    _rev,
    "heroSections": body[_type == "hero"] {
      _key
    }
  }`;
  
  const pages = await client.fetch(query);
  console.log(`Found ${pages.length} ${docType} documents with hero sections`);
  
  if (pages.length === 0) {
    return 0;
  }
  
  let updatedCount = 0;
  
  // Process each page
  for (const page of pages) {
    console.log(`Processing document with ID: ${page._id}`);
    
    // For each hero section in the page
    for (const heroSection of page.heroSections) {
      console.log(`Updating hero section with key: ${heroSection._key}`);
      
      try {
        // Use set operation to forcefully overwrite any existing responsivePadding
        const patch = client
          .patch(page._id)
          .set({
            [`body[_key=="${heroSection._key}"].responsivePadding`]: targetResponsivePadding
          });
        
        // Apply the patch
        const result = await patch.commit();
        console.log(`✅ Updated hero section in document ${result._id}`);
        updatedCount++;
      } catch (patchError) {
        console.error(`❌ Failed to update hero section with key ${heroSection._key}:`, patchError);
      }
    }
  }
  
  console.log(`✨ Successfully updated ${updatedCount} hero sections across ${pages.length} ${docType} documents!`);
  return updatedCount;
}

// Run the function
updateHeroPadding(documentType);
