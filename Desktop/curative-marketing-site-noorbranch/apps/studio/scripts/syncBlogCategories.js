import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.development') });

// Initialize Sanity client
const sanityClient = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'dev',
  token: process.env.SANITY_READ_TOKEN,
  useCdn: false,
  apiVersion: '2024-02-25'
});

async function getSheetData(spreadsheetId, range) {
  try {
    const credentials = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../credentials.json'))
    );

    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log('No data found in Google Sheet.');
      return [];
    }

    const headers = rows[0];
    if (!headers || !headers.includes('Blog Title') || !headers.includes('URL') || !headers.includes('Topic')) {
      throw new Error('Required columns missing in Google Sheet: Need "Blog Title", "URL", and "Topic"');
    }
    
    const data = rows.slice(1)
      .filter(row => row.length > 0 && row.some(cell => cell)) // Skip empty rows
      .map(row => {
        const item = {};
        headers.forEach((header, index) => {
          item[header] = (row[index] || '').trim(); // Handle missing values and trim whitespace
        });
        return item;
      });

    return data;
  } catch (error) {
    console.error('Error accessing the spreadsheet:', error);
    throw error;
  }
}

function extractSlugFromUrl(url) {
  if (!url || typeof url !== 'string') return '';
  
  try {
    // Remove query parameters and hash fragments
    url = url.split('?')[0].split('#')[0];
    // Remove trailing slash if present
    url = url.replace(/\/$/, '');
    // Get the last part of the URL and add blog/ prefix
    const slug = 'blog/' + url.split('/').pop();
    return slug;
  } catch (error) {
    console.error(`Error processing URL: ${url}`, error);
    return '';
  }
}

async function getSanityBlogPosts() {
  const query = '*[_type == "blogPost"] { _id, title, "slug": seo.slug.current, blogCategories }';
  return await sanityClient.fetch(query);
}

async function getSanityBlogTopics() {
  const query = '*[_type == "blogTopic"] { _id, name, "slug": slug.current }';
  return await sanityClient.fetch(query);
}

async function getSanityBlogTags() {
  const query = '*[_type == "blogTag"] { _id, name, "slug": slug.current }';
  return await sanityClient.fetch(query);
}

async function getSanityIndustries() {
  const query = '*[_type == "industry"] { _id, name, "slug": slug.current }';
  return await sanityClient.fetch(query);
}

async function getSanityStages() {
  const query = '*[_type == "stage"] { _id, name, "slug": slug.current }';
  return await sanityClient.fetch(query);
}

async function getSanityTechnologies() {
  const query = '*[_type == "technology"] { _id, name, "slug": slug.current }';
  return await sanityClient.fetch(query);
}

async function createTechnology(name) {
  try {
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid technology name');
    }
    
    // Normalize the name: trim whitespace and normalize case
    name = name.trim();
    
    // Create a slug from the name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    // Check if technology already exists (case-insensitive)
    const existingTechnology = await sanityClient.fetch(
      `*[_type == "technology" && lower(name) == lower($name)][0]`,
      { name }
    );

    if (existingTechnology) {
      console.log(`Technology already exists: ${name} (${existingTechnology._id})`);
      return existingTechnology;
    }

    const technology = {
      _type: 'technology',
      name: name,
      slug: {
        _type: 'slug',
        current: slug
      }
    };

    const result = await sanityClient.create(technology);
    console.log(`Created new technology: ${name} (${result._id})`);
    return result;
  } catch (error) {
    console.error(`Error creating technology ${name}:`, error);
    throw error;
  }
}

async function createStage(name) {
  try {
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid stage name');
    }
    
    // Normalize the name: trim whitespace and normalize case
    name = name.trim();
    
    // Create a slug from the name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    // Check if stage already exists (case-insensitive)
    const existingStage = await sanityClient.fetch(
      `*[_type == "stage" && lower(name) == lower($name)][0]`,
      { name }
    );

    if (existingStage) {
      console.log(`Stage already exists: ${name} (${existingStage._id})`);
      return existingStage;
    }

    const stage = {
      _type: 'stage',
      name: name,
      slug: {
        _type: 'slug',
        current: slug
      }
    };

    const result = await sanityClient.create(stage);
    console.log(`Created new stage: ${name} (${result._id})`);
    return result;
  } catch (error) {
    console.error(`Error creating stage ${name}:`, error);
    throw error;
  }
}

async function createIndustry(name) {
  try {
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid industry name');
    }
    
    // Normalize the name: trim whitespace and normalize case
    name = name.trim();
    
    // Create a slug from the name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    // Check if industry already exists (case-insensitive)
    const existingIndustry = await sanityClient.fetch(
      `*[_type == "industry" && lower(name) == lower($name)][0]`,
      { name }
    );

    if (existingIndustry) {
      console.log(`Industry already exists: ${name} (${existingIndustry._id})`);
      return existingIndustry;
    }

    const industry = {
      _type: 'industry',
      name: name,
      slug: {
        _type: 'slug',
        current: slug
      }
    };

    const result = await sanityClient.create(industry);
    console.log(`Created new industry: ${name} (${result._id})`);
    return result;
  } catch (error) {
    console.error(`Error creating industry ${name}:`, error);
    throw error;
  }
}

async function createBlogTag(name) {
  try {
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid tag name');
    }
    
    // Normalize the name: trim whitespace and normalize case
    name = name.trim();
    
    // Create a slug from the name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    // Check if tag already exists (case-insensitive)
    const existingTag = await sanityClient.fetch(
      `*[_type == "blogTag" && lower(name) == lower($name)][0]`,
      { name }
    );

    if (existingTag) {
      console.log(`Blog tag already exists: ${name} (${existingTag._id})`);
      return existingTag;
    }

    const tag = {
      _type: 'blogTag',
      name: name,
      slug: {
        _type: 'slug',
        current: slug
      }
    };

    const result = await sanityClient.create(tag);
    console.log(`Created new blog tag: ${name} (${result._id})`);
    return result;
  } catch (error) {
    console.error(`Error creating blog tag ${name}:`, error);
    throw error;
  }
}

async function createBlogTopic(name) {
  try {
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid topic name');
    }
    
    // Normalize the name: trim whitespace and normalize case
    name = name.trim();
    
    // Create a slug from the name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    // Check if topic already exists (case-insensitive)
    const existingTopic = await sanityClient.fetch(
      `*[_type == "blogTopic" && lower(name) == lower($name)][0]`,
      { name }
    );

    if (existingTopic) {
      console.log(`Blog topic already exists: ${name} (${existingTopic._id})`);
      return existingTopic;
    }

    const topic = {
      _type: 'blogTopic',
      name: name,
      slug: {
        _type: 'slug',
        current: slug
      }
    };

    const result = await sanityClient.create(topic);
    console.log(`Created new blog topic: ${name} (${result._id})`);
    return result;
  } catch (error) {
    console.error(`Error creating blog topic ${name}:`, error);
    throw error;
  }
}

async function updateBlogPostTopic(postId, topicId) {
  try {
    const patch = {
      'blogCategories.blogTopic': {
        _type: 'reference',
        _ref: topicId
      }
    };

    await sanityClient.patch(postId).set(patch).commit();
    console.log(`Updated blog post ${postId} with topic ${topicId}`);
  } catch (error) {
    console.error(`Error updating blog post ${postId}:`, error);
    throw error;
  }
}

async function updateBlogPostTag(postId, tagId) {
  try {
    // First, get the current post to access blogCategories
    const post = await sanityClient.getDocument(postId);
    const blogCategories = post.blogCategories || {};
    const currentTags = blogCategories.blogTags || [];

    // Check if tag is already present
    if (currentTags.some(t => t._ref === tagId)) {
      console.log(`Tag ${tagId} already exists on post ${postId}`);
      return;
    }

    // Add the new tag with a unique _key
    const newTag = {
      _type: 'reference',
      _key: Math.random().toString(36).substr(2, 9),
      _ref: tagId
    };

    // Prepare the patch
    const patch = {
      'blogCategories.blogTags': [...currentTags, newTag]
    };

    await sanityClient.patch(postId).set(patch).commit();
    console.log(`Updated blog post ${postId} with tag ${tagId}`);
  } catch (error) {
    console.error(`Error updating blog post ${postId} with tag:`, error);
    throw error;
  }
}

async function updateBlogPostTechnology(postId, technologyId) {
  try {
    // First, get the current post to access blogCategories
    const post = await sanityClient.getDocument(postId);
    const blogCategories = post.blogCategories || {};
    const currentTechnologies = blogCategories.technology || [];

    // Check if technology is already present
    if (currentTechnologies.some(t => t._ref === technologyId)) {
      console.log(`Technology ${technologyId} already exists on post ${postId}`);
      return;
    }

    // Add the new technology with a unique _key
    const newTechnology = {
      _type: 'reference',
      _key: Math.random().toString(36).substr(2, 9),
      _ref: technologyId
    };

    // Prepare the patch
    const patch = {
      'blogCategories.technology': [...currentTechnologies, newTechnology]
    };

    await sanityClient.patch(postId).set(patch).commit();
    console.log(`Updated blog post ${postId} with technology ${technologyId}`);
  } catch (error) {
    console.error(`Error updating blog post ${postId} with technology:`, error);
    throw error;
  }
}

async function updateBlogPostStage(postId, stageId) {
  try {
    // First, get the current post to access blogCategories
    const post = await sanityClient.getDocument(postId);
    const blogCategories = post.blogCategories || {};
    const currentStages = blogCategories.stage || [];

    // Check if stage is already present
    if (currentStages.some(s => s._ref === stageId)) {
      console.log(`Stage ${stageId} already exists on post ${postId}`);
      return;
    }

    // Add the new stage with a unique _key
    const newStage = {
      _type: 'reference',
      _key: Math.random().toString(36).substr(2, 9),
      _ref: stageId
    };

    // Prepare the patch
    const patch = {
      'blogCategories.stage': [...currentStages, newStage]
    };

    await sanityClient.patch(postId).set(patch).commit();
    console.log(`Updated blog post ${postId} with stage ${stageId}`);
  } catch (error) {
    console.error(`Error updating blog post ${postId} with stage:`, error);
    throw error;
  }
}

async function updateBlogPostIndustry(postId, industryId) {
  try {
    // First, get the current post to access blogCategories
    const post = await sanityClient.getDocument(postId);
    const blogCategories = post.blogCategories || {};
    const currentIndustries = blogCategories.industry || [];

    // Check if industry is already present
    if (currentIndustries.some(i => i._ref === industryId)) {
      console.log(`Industry ${industryId} already exists on post ${postId}`);
      return;
    }

    // Add the new industry with a unique _key
    const newIndustry = {
      _type: 'reference',
      _key: Math.random().toString(36).substr(2, 9),
      _ref: industryId
    };

    // Prepare the patch
    const patch = {
      'blogCategories.industry': [...currentIndustries, newIndustry]
    };

    await sanityClient.patch(postId).set(patch).commit();
    console.log(`Updated blog post ${postId} with industry ${industryId}`);
  } catch (error) {
    console.error(`Error updating blog post ${postId} with industry:`, error);
    throw error;
  }
}

async function writeResults(results) {
  const timestamp = new Date().toISOString();
  const fileName = `sync-results-${timestamp.replace(/[:.]/g, '-')}.json`;
  const filePath = path.join(__dirname, '../logs', fileName);

  // Ensure logs directory exists
  const logsDir = path.join(__dirname, '../logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  // Write results to file
  fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
  console.log(`\nResults written to: ${fileName}`);
}

async function main() {
  try {
    // Initialize results object with tag tracking
    const results = {
      timestamp: new Date().toISOString(),
      summary: {
        totalProcessed: 0,
        matchesFound: 0,
        topicsCreated: 0,
        topicsUpdated: 0,
        tagsCreated: 0,
        tagsUpdated: 0,
        industriesCreated: 0,
        industriesUpdated: 0,
        stagesCreated: 0,
        stagesUpdated: 0,
        technologiesCreated: 0,
        technologiesUpdated: 0,
        errors: 0
      },
      details: {
        topicsCreated: [],
        topicsUpdated: [],
        tagsCreated: [],
        tagsUpdated: [],
        industriesCreated: [],
        industriesUpdated: [],
        stagesCreated: [],
        stagesUpdated: [],
        technologiesCreated: [],
        technologiesUpdated: [],
        errors: [],
        noChangesNeeded: []
      }
    };


    console.log('Fetching data from Google Sheets...');
    const SPREADSHEET_ID = '1WSJF8SKPucCbXAZr3zJOZiMOHJE-a4TJ1-XVfwBYLNE';
    const RANGE = "'Blog Categories'!A1:Z";
    const sheetData = await getSheetData(SPREADSHEET_ID, RANGE);
    
    console.log('Fetching blog posts from Sanity...');
    const sanityBlogPosts = await getSanityBlogPosts();

    console.log('Fetching blog topics, tags, industries, stages, and technologies from Sanity...');
    const [sanityBlogTopics, sanityBlogTags, sanityIndustries, sanityStages, sanityTechnologies] = await Promise.all([
      getSanityBlogTopics(),
      getSanityBlogTags(),
      getSanityIndustries(),
      getSanityStages(),
      getSanityTechnologies()
    ]);

    // Create maps for topics, tags, industries, stages, and technologies
    const topicMap = new Map(sanityBlogTopics.map(topic => [topic.name, topic._id]));
    const tagMap = new Map(sanityBlogTags.map(tag => [tag.name, tag._id]));
    const industryMap = new Map(sanityIndustries.map(industry => [industry.name, industry._id]));
    const stageMap = new Map(sanityStages.map(stage => [stage.name, stage._id]));
    const technologyMap = new Map(sanityTechnologies.map(tech => [tech.name, tech._id]));

    // Match posts and update topics/tags
    const matches = [];
    const nonMatches = [];
    
    results.summary.totalProcessed = sheetData.length;

    for (const sheetRow of sheetData) {
      const sheetSlug = extractSlugFromUrl(sheetRow.URL);
      const matchingPost = sanityBlogPosts.find(post => post.slug === sheetSlug);

      if (matchingPost) {
        results.summary.matchesFound++;
        const currentTopic = sanityBlogTopics.find(topic => 
          matchingPost.blogCategories?.blogTopic?._ref === topic._id
        );
        
        const currentTags = matchingPost.blogTags?.tags || [];
        const currentTagNames = await Promise.all(
          currentTags.map(async tag => {
            const tagDoc = await sanityClient.getDocument(tag._ref);
            return tagDoc?.name;
          })
        );
        
        matches.push({
          sheetTitle: sheetRow['Blog Title'],
          sanityTitle: matchingPost.title,
          slug: sheetSlug,
          url: sheetRow.URL,
          currentTopic: currentTopic?.name,
          newTopic: sheetRow.Topic,
          currentTags: currentTagNames,
          newTags: sheetRow.Tags ? sheetRow.Tags.split(',').map(t => t.trim()) : []
        });

        // Handle topic mapping
        if (sheetRow.Topic) {
          let topicId = topicMap.get(sheetRow.Topic);
          
          // Check if topic needs to be updated
          const needsUpdate = currentTopic?.name !== sheetRow.Topic;
          
          if (needsUpdate) {
            console.log(`Topic change needed for '${matchingPost.title}':`)
            console.log(`  Current topic: ${currentTopic?.name || 'None'}`)
            console.log(`  New topic: ${sheetRow.Topic}`)
          }

          // If topic doesn't exist, create it
          if (!topicId) {
            console.log(`Creating new topic: ${sheetRow.Topic}`);
            const newTopic = await createBlogTopic(sheetRow.Topic);
            topicId = newTopic._id;
            topicMap.set(sheetRow.Topic, topicId);
            results.summary.topicsCreated++;
            results.details.topicsCreated.push({
              name: sheetRow.Topic,
              id: newTopic._id
            });
          }

          // Check if we need to update the post's topic
          const currentTopicRef = matchingPost.blogCategories?.blogTopic?._ref;
          if (currentTopicRef !== topicId) {
            await updateBlogPostTopic(matchingPost._id, topicId);
            console.log(`Updated topic for: ${matchingPost.title}`);
            results.summary.topicsUpdated++;
            results.details.topicsUpdated.push({
              postTitle: matchingPost.title,
              postId: matchingPost._id,
              oldTopic: currentTopic?.name || 'None',
              newTopic: sheetRow.Topic
            });
          } else {
            results.details.noChangesNeeded.push({
              postTitle: matchingPost.title,
              topic: currentTopic?.name || 'None'
            });
          }
        }

        // Handle tags
        if (sheetRow['Tag(s)']) {
          const newTags = sheetRow['Tag(s)'].split(',').map(t => t.trim());
          
          for (const tagName of newTags) {
            if (!tagName) continue;
            
            let tagId = tagMap.get(tagName);
            
            // If tag doesn't exist, create it
            if (!tagId) {
              console.log(`Creating new tag: ${tagName}`);
              const newTag = await createBlogTag(tagName);
              tagId = newTag._id;
              tagMap.set(tagName, tagId);
              results.summary.tagsCreated++;
              results.details.tagsCreated.push({
                name: tagName,
                id: newTag._id
              });
            }

            // Check if we need to add the tag
            const hasTag = currentTags.some(tag => tag._ref === tagId);
            if (!hasTag) {
              await updateBlogPostTag(matchingPost._id, tagId);
              results.summary.tagsUpdated++;
              results.details.tagsUpdated.push({
                postTitle: matchingPost.title,
                postId: matchingPost._id,
                tagName: tagName
              });
            }
          }
        }

        // Handle industries
        if (sheetRow.Industry) {
          const newIndustries = sheetRow.Industry.split(',').map(i => i.trim());
          const blogCategories = matchingPost.blogCategories || {};
          const currentIndustries = blogCategories.industry || [];
          
          for (const industryName of newIndustries) {
            if (!industryName) continue;
            
            let industryId = industryMap.get(industryName);
            
            // If industry doesn't exist, create it
            if (!industryId) {
              console.log(`Creating new industry: ${industryName}`);
              const newIndustry = await createIndustry(industryName);
              industryId = newIndustry._id;
              industryMap.set(industryName, industryId);
              results.summary.industriesCreated++;
              results.details.industriesCreated.push({
                name: industryName,
                id: newIndustry._id
              });
            }

            // Check if we need to add the industry
            const hasIndustry = currentIndustries.some(ind => ind._ref === industryId);
            if (!hasIndustry) {
              await updateBlogPostIndustry(matchingPost._id, industryId);
              results.summary.industriesUpdated++;
              results.details.industriesUpdated.push({
                postTitle: matchingPost.title,
                postId: matchingPost._id,
                industryName: industryName
              });
            }
          }
        }

        // Handle stages
        if (sheetRow.Stage) {
          const newStages = sheetRow.Stage.split(',').map(s => s.trim());
          const currentStages = matchingPost.stages || [];
          
          for (const stageName of newStages) {
            if (!stageName) continue;
            
            let stageId = stageMap.get(stageName);
            
            // If stage doesn't exist, create it
            if (!stageId) {
              console.log(`Creating new stage: ${stageName}`);
              const newStage = await createStage(stageName);
              stageId = newStage._id;
              stageMap.set(stageName, stageId);
              results.summary.stagesCreated++;
              results.details.stagesCreated.push({
                name: stageName,
                id: newStage._id
              });
            }

            // Check if we need to add the stage
            const hasStage = currentStages.some(s => s._ref === stageId);
            if (!hasStage) {
              await updateBlogPostStage(matchingPost._id, stageId);
              results.summary.stagesUpdated++;
              results.details.stagesUpdated.push({
                postTitle: matchingPost.title,
                postId: matchingPost._id,
                stageName: stageName
              });
            }
          }
        }

        // Handle technologies
        if (sheetRow.Technologies) {
          const newTechnologies = sheetRow.Technologies.split(',').map(t => t.trim());
          const currentTechnologies = matchingPost.technologies || [];
          
          for (const techName of newTechnologies) {
            if (!techName) continue;
            
            let techId = technologyMap.get(techName);
            
            // If technology doesn't exist, create it
            if (!techId) {
              console.log(`Creating new technology: ${techName}`);
              const newTech = await createTechnology(techName);
              techId = newTech._id;
              technologyMap.set(techName, techId);
              results.summary.technologiesCreated++;
              results.details.technologiesCreated.push({
                name: techName,
                id: newTech._id
              });
            }

            // Check if we need to add the technology
            const hasTechnology = currentTechnologies.some(t => t._ref === techId);
            if (!hasTechnology) {
              await updateBlogPostTechnology(matchingPost._id, techId);
              results.summary.technologiesUpdated++;
              results.details.technologiesUpdated.push({
                postTitle: matchingPost.title,
                postId: matchingPost._id,
                technologyName: techName
              });
            }
          }
        }
      } else {
        results.details.errors.push({
          type: 'Post Not Found',
          details: {
            sheetTitle: sheetRow['Blog Title'],
            url: sheetRow.URL,
            slug: sheetSlug
          }
        });
        results.summary.errors++;
      }
    }

    // Write results to file
    await writeResults(results);

    // Log summary to console
    console.log('\nSummary:');
    console.log(`Total posts processed: ${results.summary.totalProcessed}`);
    console.log(`Matches found: ${results.summary.matchesFound}`);
    console.log(`New topics created: ${results.summary.topicsCreated}`);
    console.log(`Posts updated with new topics: ${results.summary.topicsUpdated}`);
    console.log(`New tags created: ${results.summary.tagsCreated}`);
    console.log(`Posts updated with new tags: ${results.summary.tagsUpdated}`);
    console.log(`New industries created: ${results.summary.industriesCreated}`);
    console.log(`Posts updated with new industries: ${results.summary.industriesUpdated}`);
    console.log(`New stages created: ${results.summary.stagesCreated}`);
    console.log(`Posts updated with new stages: ${results.summary.stagesUpdated}`);
    console.log(`New technologies created: ${results.summary.technologiesCreated}`);
    console.log(`Posts updated with new technologies: ${results.summary.technologiesUpdated}`);
    console.log(`Errors encountered: ${results.summary.errors}`);
    console.log(`Non-matched posts: ${nonMatches.length}`);
    console.log(`Posts needing topic updates: ${topicUpdates.length}`);

    // Perform topic updates
    if (topicUpdates.length > 0) {
      console.log('\nUpdating blog post topics...');
      for (const update of topicUpdates) {
        await updateBlogPostTopic(update.postId, update.topicId);
        console.log(`Updated post topic: ${update.newTopic}`);
      }
    }

    console.log('\nMatched posts with topics:');
    matches.forEach(post => {
      console.log(`- ${post.sheetTitle}`);
      console.log(`  URL: ${post.url}`);
      console.log(`  Topic: ${post.topic || 'No topic specified'}\n`);
    });

    console.log('\nNon-matched posts:');
    nonMatches.forEach(post => {
      console.log(`- ${post.title}`);
      console.log(`  URL: ${post.url}`);
      console.log(`  Topic: ${post.topic || 'No topic specified'}\n`);
    });

  } catch (error) {
    console.error('Error in main:', error);
  }
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { getSheetData, getSanityBlogPosts };
