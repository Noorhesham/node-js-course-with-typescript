const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: '2021-03-25',
  token: process.env.SANITY_STUDIO_TOKEN,
  useCdn: false
});

async function fetchDocumentByIdAndSave(documentId, fileName) {
  try {
    const document = await client.getDocument(documentId);

    if (document) {
      console.log('Document found:', document);

      const jsonContent = JSON.stringify(document, null, 2);

      const filePath = path.join(__dirname, fileName);

      fs.writeFileSync(filePath, jsonContent, 'utf8');

      console.log(`Document saved to ${filePath}`);
    } else {
      console.log('No document');
    }
  } catch (error) {
    console.error('Error fetching:', error);
  }
}

fetchDocumentByIdAndSave('7I7ZRkN9gOKX13HNdb9SAB', 'output.json');
