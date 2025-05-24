# Migration Scripts

The [`/scripts/`](/scripts/) directory holds a variety of utilities that migrate data from Craft (webstacks.com's legacy CMS) to Sanity. This document lays out how those scripts work.

## General Workflow for Craft-to-Sanity Migrations

Migrations from Craft to Sanity generally follow these steps:

1. Data is exported from Craft as a `json` file. That export is not currently handled in this repo. Craft exports are kept in [`/scripts/data/craftExports/`](/scripts/craftExports/). Typically, there is a separate json file for each kind of content in Craft.

2. Migration scripts (such as [`migrateBlogPosts()`](/scripts/migrateBlogPosts.ts)) read data from the Craft `json` files, transform them, and output them as an `ndjson` file in [`/scripts/data/sanityImports/`](/scripts/data/sanityImports/).

3. The `ndjson` file is imported to Sanity with their CLI tool `sanity dataset import <dataset-name> <ndjson-file>`

## Document IDs

When importing a Craft document to Sanity, we will set the Sanity document's `_id` to a prefixed version of the Craft document's `canonicalId`. This will enable us to maintain references between imported documents.

For example, a Craft document with `canonicalId: '123456'` will be imported to Sanity with `_id: 'imported-craft-123456'`.

## Handling Rich Text: HTML vs. Portable Text

Craft stores rich text as a combination of objects and HTML strings. Sanity stores rich text as an array of objects following the [Portable Text](https://github.com/portabletext/portabletext) format. This project includes the utility function [`convertContentMatrixToPortableText()`](/scripts/helpers/convertContentMatrixToPortableText/convertContentMatrixToPortableText.ts) that handles conversion between both formats. See the comments in that file for a more detailed explanation of how the conversion is handled.

### Rich Text in Craft

In Craft, content such as blog posts is stored in `contentMatrix` fields, that follow this format:

```json
"contentMatrixSimple": {
  "780280": {
    "type": "text",
    "enabled": true,
    "collapsed": false,
    "fields": {
      "body": "<p dir='ltr'>As brands embark on the journey... </p>",
    },
  },
  "780281": {
    "type": "anchorLink",
    "enabled": true,
    "collapsed": false,
    "fields": {
      "anchorId": "simplify-migration",
    },
  }
}
```

This example shows how Craft stores vanilla rich text as an html string within blocks of `type: 'text'`. Other block types are custom defined to hold arbitrarily structured data.

### Rich Text in Sanity

In constrast, Sanity stores rich text in the [Portable Text](https://github.com/portabletext/portabletext) format. In Portable text, all content is stored as an _array_ of block objects, like so:

```json
"body": [
    {
      "_key": "556ca9f7eb07",
      "_type": "block",
      "children": [
        {
          "_key": "556ca9f7eb070",
          "_type": "span",
          "marks": [],
          "text": "As brands embark on the journey, something cool happens."
        }
      ],
      "markDefs": [],
      "style": "normal"
    },
    {
      "_key": "b9c8632d392d",
      "_type": "block",
      "children": [
        {
          "_key": "b9c8632d392d0",
          "_type": "span",
          "marks": [
            "6e40a698de86"
          ],
          "text": "Pillar 1: Simplify Migration for a Smooth Transition"
        }
      ],
      "level": 1,
      "listItem": "bullet",
      "markDefs": [
        {
          "_key": "6e40a698de86",
          "_type": "link",
          "href": "#simplify-migration"
        }
      ],
      "style": "normal"
    },
```

This example would render to something like:

```html
<>
  <p>As brands embark on the journey, something cool happens.</p>
  <p>
    <a href="#simplify-migration">
      Pillar 1: Simplify Migration for a Smooth Transition
    </a>
  </p>
</>
```
