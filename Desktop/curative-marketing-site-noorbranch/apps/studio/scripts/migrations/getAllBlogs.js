import { createClient } from 'contentful';
import fs from 'fs/promises';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '../../.env' });

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

async function getAllBlogs() {
  try {
    // First, get all content types to find the blog post type
    const contentTypes = await client.getContentTypes();
    console.log('Available content types:');
    contentTypes.items.forEach(type => {
      console.log(`- ${type.name} (${type.sys.id})`);
    });

    // Function to fetch all entries of a content type using pagination
    async function getAllEntriesOfType(contentType) {
      let items = [];
      let skip = 0;
      const limit = 100;
      
      while (true) {
        const response = await client.getEntries({
          content_type: contentType,
          include: 10,
          limit,
          skip
        });
        
        items = items.concat(response.items);
        
        if (skip + limit >= response.total) {
          console.log(`Total ${contentType} entries:`, response.total);
          break;
        }
        
        skip += limit;
      }
      
      return items;
    }

    // Fetch all entries for each content type
    const [blogPosts, blogArticles, templateBlogPosts] = await Promise.all([
      getAllEntriesOfType('pageBlogPost'),
      getAllEntriesOfType('blogArticle'),
      getAllEntriesOfType('templateBlogPost')
    ]);

    // Combine all types of entries
    const allPosts = [...blogPosts, ...blogArticles, ...templateBlogPosts];

    // Log details about each post
    allPosts.forEach((post, index) => {
      console.log(`\nPost ${index + 1}:`);
      console.log('Title:', post.fields?.title);
      console.log('Content Type:', post.sys?.contentType?.sys?.id);
      console.log('Fields available:', Object.keys(post.fields || {}));
    });

    const entries = {
      items: allPosts
    };

    console.log('Total entries found:', allPosts.length);

    // Save the blog posts to a JSON file
    await fs.writeFile(
      'contentfulBlogPosts.json',
      JSON.stringify(entries, null, 2)
    );

    console.log(`Successfully fetched and saved ${allPosts.length} blog posts to contentfulBlogPosts.json`);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
}

// Run the function
getAllBlogs();
