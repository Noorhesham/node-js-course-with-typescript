import { createClient } from '@sanity/client';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: '2021-03-25',
  token: process.env.SANITY_STUDIO_TOKEN,
  useCdn: false
});

let assetList = [];

function generateUniqueKey() {
  return uuidv4();
}

async function fetchDocumentById(documentId) {
  try {
    const document = await client.getDocument(documentId);
    return document || null;
  } catch (error) {
    return null;
  }
}

async function findBlogPostIndex(title) {
  const data = await fs.readFile('contentfulBlogPosts.json', 'utf8');
  const { items: blogPosts } = JSON.parse(data);
  const index = blogPosts.findIndex(post => post.fields.title === title);
  if (index !== -1) {
    console.log(`Found "${title}" at index ${index}`);
    // Create progress file starting from this index
    await fs.writeFile('migration_progress.json', JSON.stringify({ lastProcessedIndex: index }));
    console.log('Created progress file to resume from this post');
  } else {
    console.log(`Could not find blog post with title: ${title}`);
  }
}

async function importBlogPosts() {
  try {
    // Read progress file if it exists
    let lastProcessedIndex = 0;
    try {
      const progress = await fs.readFile('migration_progress.json', 'utf8');
      lastProcessedIndex = JSON.parse(progress).lastProcessedIndex;
      console.log(`Resuming from index ${lastProcessedIndex}`);
    } catch (err) {
      console.log('Starting fresh migration');
    }

    const data = await fs.readFile('contentfulBlogPosts.json', 'utf8');
    const { items: blogPosts } = JSON.parse(data);
    console.log(`Starting migration of ${blogPosts.length} blog posts from index ${lastProcessedIndex}...`);

    for (let i = lastProcessedIndex; i < blogPosts.length; i++) {
      const post = blogPosts[i];
      const title = post.fields.title || post.fields.name;
      console.log(`Processing blog post: ${title}`);
      
      const mappedPromises = post.fields.body.content.flatMap(async (tpost) => {
        if (tpost.nodeType === 'embedded-asset-block' && tpost.data?.target?.fields?.file?.url) {
          const optimizedUrl = `${tpost.data.target.fields.file.url}?w=1600&q=80&fm=webp`;
          await createSanityDocument({...tpost, data: {...tpost.data, target: {...tpost.data.target, fields: {...tpost.data.target.fields, file: {...tpost.data.target.fields.file, url: optimizedUrl}}}}}, 'embedded-asset-block');
        }

        if (tpost.nodeType === 'embedded-entry-block') {
          if (tpost.data?.target?.sys?.contentType?.sys?.id === 'componentConversionPanel') {
            await createSanityDocument(tpost, 'internal-link');
          }

          if (tpost.data?.target?.sys?.contentType?.sys?.id === 'componentButton') {
            await createSanityDocument(tpost, 'internal-link');
          }
        }
      });

      if (post.fields.featuredImage?.fields?.image?.fields?.file?.url) {
        await createSanityDocument(post.fields.featuredImage, 'featuredImage');
      }

      const authorFields = post.fields?.author?.fields;
      if (authorFields && authorFields.headshot) {
        await createSanityDocument(authorFields.headshot, 'imageAsset');
      }

      if (post.fields.category) {
        await createSanityDocument(post.fields.category, 'category');
      }

      const seoFields = post.fields?.seo?.fields || {};
      if (seoFields?.openGraphImage?.fields?.file?.url) {
        const optimizedUrl = `${seoFields.openGraphImage.fields.file.url}?w=1600&q=80&fm=webp`;
        await createSanityDocument({...seoFields.openGraphImage, fields: {...seoFields.openGraphImage.fields, file: {...seoFields.openGraphImage.fields.file, url: optimizedUrl}}}, 'imageAsset');
      }

      const featuredImageRef = post.fields.featuredImage?.fields?.image?.fields?.file?.url
        ? await uploadImageToSanity(`${post.fields.featuredImage.fields.image.fields.file.url}?w=1600&q=80&fm=webp`)
        : undefined;

      const authorHeadshotRef = post.fields.author?.fields?.headshot?.fields?.file?.url
        ? await uploadImageToSanity(`${post.fields.author.fields.headshot.fields.file.url}?w=1600&q=80&fm=webp`)
        : null;

      // Check if company exists by name first, then by ID
      let companyRef = null;
      if (post.fields.author?.fields?.company?.fields?.name) {
        const companyName = post.fields.author.fields.company.fields.name;
        const companyId = `company-${post.fields.author.fields.company.sys.id}`;
        
        // First try to find existing company by name (case-insensitive)
        const query = `*[_type == "company" && lower(name) == "${companyName.toLowerCase()}"][0]`;
        let existingCompany = await client.fetch(query);
        
        if (existingCompany) {
          console.log(`Found existing company with name: ${companyName}`);
          companyRef = existingCompany._id;
        } else {
          // If not found by name, check by ID
          existingCompany = await fetchDocumentById(companyId);
          
          if (!existingCompany) {
            const companyData = {
              _id: companyId,
              _type: 'company',
              name: companyName,
              url: post.fields.author.fields.company.fields.website
            };
            
            try {
              console.log(`Creating new company: ${companyName}`);
              await client.createOrReplace(companyData);
              companyRef = companyId;
            } catch (error) {
              console.error('Error creating company document:', error);
            }
          } else {
            companyRef = companyId;
          }
        }
      }

      // Create person document for author if it doesn't exist
      let authorRef = null;
      if (post.fields.author) {
        // Split fullName into firstName and lastName
        const [firstName = '', lastName = ''] = (post.fields.author.fields.fullName || '').split(' ');
        
        const authorData = {
          _id: `person-${post.fields.author.sys.id}`,
          _type: 'person',
          firstName,
          lastName,
          role: post.fields.author.fields.role,
          company: companyRef ? {
            _type: 'reference',
            _ref: companyRef
          } : undefined,
          headshot: authorHeadshotRef ? {
            _type: 'richImage',
            alt: post.fields.author.fields.headshot?.fields?.description || '',
            caption: '',
            asset: {
              _type: 'reference',
              _ref: authorHeadshotRef
            }
          } : undefined
        };
        
        try {
          await client.createOrReplace(authorData);
          authorRef = authorData._id;
        } catch (error) {
          console.error('Error creating person document:', error);
        }
      }

      // Use the featured image as OpenGraph image if no specific OpenGraph image is set
      const openGraphImageRef = post.fields?.seo?.fields?.openGraphImage?.fields?.file?.url
        ? await uploadImageToSanity(post.fields.seo.fields.openGraphImage.fields.file.url)
        : (featuredImageRef || undefined);

      console.log('Featured Image Ref:', featuredImageRef);
      console.log('Author Ref:', authorRef);
      console.log('Open Graph Image Ref:', openGraphImageRef);

      await Promise.all(mappedPromises);

      // Map and prepare the body content
      const bodyContent = mapRichText(post.fields.body).map(block => ({
        ...block,
        _key: block._key || generateUniqueKey()
      }));
      
      const document = {
        _id: post.sys.id,
        _type: 'blogPost',
        title: post.fields.title || post.fields.name,
        body: bodyContent,
        seo: {
          _type: 'seo',
          pageTitle: post.fields.seo?.fields?.pageTitle || post.fields.title,
          pageDescription: post.fields.seo?.fields?.pageDescription || post.fields.excerpt,
          noIndex: post.fields.seo?.fields?.noIndex || false,
          noFollow: post.fields.seo?.fields?.noFollow || false,
          slug: {
            _type: 'slug',
            current: `blog/${post.fields.slug}`
          },
          openGraphImage: openGraphImageRef ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: openGraphImageRef
            }
          } : undefined
        },
        excerpt: post.fields.excerpt,
        publishDate: post.fields.publishDate ? post.fields.publishDate.split('T')[0] : undefined,
        author: authorRef
          ? [{
              _key: generateUniqueKey(),
              _type: 'reference',
              _ref: authorRef
            }]
          : [],
        featuredImage: featuredImageRef
          ? {
              _type: 'richImage',
              alt: post.fields.featuredImage?.fields?.image?.fields?.description || '',
              caption: post.fields.featuredImage?.fields?.image?.fields?.title || '',
              asset: {
                _type: 'reference',
                _ref: featuredImageRef
              }
            }
          : undefined,
        _createdAt: post.sys.createdAt,
        _updatedAt: post.sys.updatedAt
      };

      console.log('Creating Sanity document...');
      const result = await client.createOrReplace(document);
      console.log('Created document:', result._id);

      // Save progress
      await fs.writeFile('migration_progress.json', JSON.stringify({ lastProcessedIndex: i }));
    }

    console.log('Migration completed successfully!');
    // Clean up progress file
    await fs.unlink('migration_progress.json').catch(() => {});
  } catch (error) {
    console.error('Error importing blog posts:', error);
    // Save progress even if there was an error
    if (typeof i !== 'undefined') {
      await fs.writeFile('migration_progress.json', JSON.stringify({ lastProcessedIndex: i }));
    }
    throw error; // Re-throw to stop the migration
  }
}

function addKeysToBlocks(blocks) {
  return blocks.map((block) => ({
    ...block,
    _key: generateUniqueKey()
  }));
}

async function fetchOrCreateReference(contentfulRef, sanityType) {
  const existingRef = await getAssetRefById(contentfulRef.sys.id);
  if (existingRef) return existingRef;

  const result = await createSanityDocument(contentfulRef, sanityType);
  return result?._id;
}

let keylist = [];
let keyToHref = {};

function getAssetRefById(contentfulId) {
  return assetList.find((asset) => asset.contentfulId === contentfulId)?.sanityId;
}

function mapRichText(richText) {
  if (!richText || !richText.content) return [];

  return richText.content.map((node) => {
    // Handle embedded-entry-block types
    if (node.nodeType === 'embedded-entry-block') {
      const contentType = node.data?.target?.sys?.contentType?.sys?.id;
      const fields = node.data?.target?.fields;

      if (contentType === 'componentConversionPanel' && fields) {
        // Map componentConversionPanel to ctaCard
        return {
          _type: 'ctaCard',
          _key: generateUniqueKey(),
          heading: fields.heading,
          body: fields.body ? mapSimpleRichText(fields.body).content : undefined,
          actions: fields.link?.map(link => ({
            _key: generateUniqueKey(),
            _type: 'ctaAction',
            actionType: 'link',
            buttonText: link.fields?.label || '',
            buttonStyle: 'blue-fill',
            buttonSize: 'sm',
            link: {
              href: link.fields?.link || ''
            }
          })) || []
        };
      }

      console.warn('Unhandled block type:', contentType);
      return null;
    }

    // Handle embedded-asset-block separately as it should be a root-level node
    if (node.nodeType === 'embedded-asset-block') {
      const assetRef = getAssetRefById(node.data.target.sys.id);
      if (!assetRef) {
        console.warn('Asset reference not found for:', node.data.target.sys.id);
        return null;
      }
      return {
        _type: 'richImage',
        _key: generateUniqueKey(),
        asset: {
          _type: 'reference',
          _ref: assetRef
        },
        alt: node.data.target.fields?.description || '',
        caption: node.data.target.fields?.title || '',
        maxWidth: 'full'
      };
    }

    // For all other nodes, create a block
    const block = {
      _type: 'block',
      _key: generateUniqueKey(),
      markDefs: [],
      children: []
    };

    switch (node.nodeType) {
      case 'paragraph':
        block.style = 'normal';
        break;
      case 'heading-1':
        // Map h1 to h2 since h1 is not allowed in the schema
        block.style = 'h2';
        break;
      case 'heading-2':
        block.style = 'h2';
        break;
      case 'heading-3':
        block.style = 'h3';
        break;
      case 'heading-4':
        block.style = 'h4';
        break;
      case 'heading-5':
        block.style = 'h5';
        break;
      case 'heading-6':
        block.style = 'h6';
        break;
      case 'unordered-list':
        block.style = 'normal';
        block.listItem = 'bullet';
        break;
      case 'ordered-list':
        block.style = 'normal';
        block.listItem = 'number';
        break;
      default:
        console.warn('Unhandled block type:', node.nodeType);
        return null;
    }

    // For all blocks, map each child node
    block.children = node.content.map(child => mapText(child, block));
    
    // Add level 1 for list items
    if (node.nodeType === 'unordered-list' || node.nodeType === 'ordered-list') {
      block.level = 1;
    }

    // Filter out any null children and ensure we have at least one child
    block.children = block.children.filter(Boolean);
    if (block.children.length === 0) {
      block.children = [{
        _type: 'span',
        _key: generateUniqueKey(),
        text: '',
        marks: []
      }];
    }

    return block;
  }).filter(Boolean);
}

function mapStyle(nodeType) {
  switch (nodeType) {
    case 'paragraph':
      return 'normal';
    case 'heading-1':
      return 'h1';
    case 'heading-2':
      return 'h2';
    case 'heading-3':
      return 'h3';
    case 'heading-4':
      return 'h4';
    case 'heading-5':
      return 'h5';
    case 'heading-6':
      return 'h6';
    case 'unordered-list':
      return 'bullet';
    case 'ordered-list':
      return 'number';
    case 'blockquote':
      return 'blockquote';
    default:
      return 'normal';
  }
}

function mapMarks(marks) {
  if (!marks || marks.length === 0) return [];

  return marks.map((mark) => {
    switch (mark.type) {
      case 'bold':
        return 'strong';
      case 'italic':
        return 'em';
      case 'underline':
        return 'underline';
      case 'code':
        return 'code';
      case 'strike':
        return 'strike-through';
      case 'link':
        return {
          _type: 'link',
          href: mark.attrs?.href || ''
        };
      default:
        console.warn('Unhandled mark type:', mark.type);
        return null;
    }
  }).filter(Boolean);
}

function mapSimpleRichText(richText) {
  if (!richText || !richText.content) return [];

  return {
    _type: 'simpleRichText',
    content: richText.content.map(node => ({
      _type: 'block',
      _key: generateUniqueKey(),
      style: 'normal',
      markDefs: [],
      children: node.content.map(child => ({
        _type: 'span',
        _key: generateUniqueKey(),
        text: child.value || '',
        marks: []
      }))
    }))
  };
}

function mapText(node, parentBlock) {
  if (!node) return null;

  if (node.nodeType === 'text' || node.nodeType === 'list-item') {
    const marks = [];

    // For list items, we need to get the text from the first child
    const textValue = node.nodeType === 'list-item' 
      ? node.content?.[0]?.content?.[0]?.value || ''
      : node.value || '';

    // Handle marks for both text and list items
    const marksToProcess = node.nodeType === 'list-item'
      ? node.content?.[0]?.content?.[0]?.marks || []
      : node.marks || [];

    marksToProcess.forEach(mark => {
      if (mark.type === 'bold') marks.push('strong');
      else if (mark.type === 'italic') marks.push('em');
      else if (mark.type === 'underline') marks.push('underline');
      else if (mark.type === 'code') marks.push('code');
      else if (mark.type === 'strike') marks.push('strike-through');
    });

    return {
      _type: 'span',
      _key: generateUniqueKey(),
      text: textValue,
      marks
    };
  }

  if (node.nodeType === 'hyperlink') {
    const markKey = generateUniqueKey();
    
    // Add link definition to parent block's markDefs
    if (parentBlock) {
      if (!parentBlock.markDefs) {
        parentBlock.markDefs = [];
      }
      parentBlock.markDefs.push({
        _key: markKey,
        _type: 'link',
        href: node.data.uri
      });
    }

    return {
      _type: 'span',
      _key: generateUniqueKey(),
      text: node.content?.[0]?.value || '',
      marks: [markKey]
    };
  }

  console.warn('Unhandled text node type:', node.nodeType);
  return null;
}

async function createSanityDocument(contentfulRef, sanityType) {
  try {
    if (!contentfulRef) return null;

    // Check if we have a valid contentful ID
    const contentfulId = contentfulRef.sys?.id || contentfulRef.data?.target?.sys?.id;
    if (!contentfulId) return null;

    const existingAsset = assetList.find(
      (asset) => asset.contentfulId === contentfulId
    );
    if (existingAsset) return { _id: existingAsset.sanityId };

    let document;

    switch (sanityType) {
      case 'embedded-asset-block':
        if (!contentfulRef.data?.target?.fields?.file?.url) return null;

        const imageUrl = contentfulRef.data.target.fields.file.url;
        const imageRef = await uploadImageToSanity(imageUrl);

        if (!imageRef) return null;

        document = {
          _type: 'richImage',
          _key: generateUniqueKey(),
          asset: {
            _type: 'reference',
            _ref: imageRef
          },
          alt: contentfulRef.data.target.fields.description || '',
          caption: contentfulRef.data.target.fields.title || '',
          maxWidth: 'full'
        };

        // Add the asset to assetList for future reference
        assetList.push({
          contentfulId: contentfulId,
          sanityId: imageRef
        });
        break;

      case 'internal-link':
        if (!contentfulRef.data?.target?.fields) return null;

        document = {
          _type: 'internalLink',
          title: contentfulRef.data.target.fields.title,
          url: contentfulRef.data.target.fields.url || '',
          description: contentfulRef.data.target.fields.description || ''
        };
        break;

      case 'featuredImage':
        if (!contentfulRef.fields?.image?.fields?.file?.url) return null;

        const featuredImageUrl = contentfulRef.fields.image.fields.file.url;
        const featuredImageRef = await uploadImageToSanity(featuredImageUrl);

        if (!featuredImageRef) return null;

        document = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: featuredImageRef
          }
        };
        break;

      case 'imageAsset':
        if (!contentfulRef.fields?.file?.url) return null;

        const assetUrl = contentfulRef.fields.file.url;
        const assetRef = await uploadImageToSanity(assetUrl);

        if (!assetRef) return null;

        document = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetRef
          }
        };
        break;

      case 'category':
        document = {
          _type: 'category',
          title: contentfulRef.fields.name,
          slug: {
            _type: 'slug',
            current: contentfulRef.fields.slug
          }
        };
        break;

      default:
        console.warn('Unhandled Sanity type:', sanityType);
        return null;
    }

    if (!document) return null;

    const result = await client.create(document);
    if (contentfulRef.sys?.id) {
      assetList.push({
        contentfulId: contentfulRef.sys.id,
        sanityId: result._id
      });
    }

    return result;
  } catch (error) {
    console.error('Error creating Sanity document:', error);
    return null;
  }
}

async function uploadImageToSanity(url) {
  try {
    if (!url) return null;

    const imageUrl = url.startsWith('//') ? `https:${url}` : url;
    const filename = imageUrl.split('/').pop();
    
    // First check if we've already uploaded this image
    const query = '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]';
    const existingImage = await client.fetch(query, { filename });

    if (existingImage) {
      console.log(`Found existing image: ${filename}`);
      return existingImage._id;
    }

    console.log('Attempting to upload new image:', filename);

    // If not found, fetch and upload the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.error('Failed to fetch image:', response.statusText);
      return null;
    }

    const buffer = await response.arrayBuffer();
    const result = await client.assets.upload('image', Buffer.from(buffer), {
      filename: filename
    });
    console.log('Successfully uploaded new image:', result._id);
    return result?._id;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

// Start the migration
importBlogPosts();
