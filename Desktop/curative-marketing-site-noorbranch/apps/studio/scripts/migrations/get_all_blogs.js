import { createClient } from 'contentful';
import fs from 'fs/promises';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

function safeStringify(obj, indent = 2) {
  const cache = new Set();
  const jsonString = JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          return;
        }
        cache.add(value);
      }
      return value;
    },
    indent
  );
  cache.clear();
  return jsonString;
}

async function getAllBlogPosts() {
  try {
    console.log('Fetching a single blog post for testing...');
    
    const entries = await client.getEntries({
      content_type: 'templateBlogPost',
      include: 10,
      limit: 3
    });

    if (entries.items.length === 0) {
      console.log('No blog posts found');
      return;
    }

    const allEntries = entries.items;
    console.log(`Fetched blog post: "${entries.items[0].fields.title}"`);

    const jsonData = safeStringify(allEntries, 2);

    await fs.writeFile('contentfulBlogPosts.json', jsonData);
    console.log('Data has been saved to contentfulBlogPosts.json');

  } catch (error) {
    console.error('Error fetching entries:', error);
  }
}

getAllBlogPosts();
