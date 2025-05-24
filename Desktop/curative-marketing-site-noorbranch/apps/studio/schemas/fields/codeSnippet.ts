// –------------------------------------------------
// CODE SNIPPET (field)
//
// A block type for displaying code snippets with syntax highlighting
//
// –------------------------------------------------

import { defineType } from 'sanity'
import { CodeIcon } from '@sanity/icons'

export const codeSnippet = defineType({
  name: 'codeSnippet',
  title: 'Code Snippet',
  type: 'object',
  icon: CodeIcon,
  fields: [
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'JSX', value: 'jsx' },
          { title: 'TSX', value: 'tsx' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'SCSS', value: 'scss' },
          { title: 'JSON', value: 'json' },
          { title: 'Bash', value: 'bash' },
          { title: 'Shell', value: 'shell' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'PHP', value: 'php' },
          { title: 'Python', value: 'python' },
          { title: 'Ruby', value: 'ruby' },
          { title: 'Go', value: 'go' },
          { title: 'Java', value: 'java' },
          { title: 'C', value: 'c' },
          { title: 'C++', value: 'cpp' },
          { title: 'C#', value: 'csharp' },
          { title: 'Swift', value: 'swift' },
          { title: 'Kotlin', value: 'kotlin' },
          { title: 'SQL', value: 'sql' },
          { title: 'GraphQL', value: 'graphql' },
          { title: 'YAML', value: 'yaml' },
          { title: 'XML', value: 'xml' },
          { title: 'Plain text', value: 'text' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'filename',
      title: 'Filename',
      type: 'string',
      description: 'Optional filename to display above the code snippet',
    },
  ],
  preview: {
    select: {
      code: 'code',
      language: 'language',
      filename: 'filename',
    },
    prepare({ code, language, filename }) {
      const title = filename || `Code Snippet (${language || 'no language'})`;
      const subtitle = code ? `${code.substring(0, 50)}${code.length > 50 ? '...' : ''}` : '';
      
      return {
        title,
        subtitle,
        media: CodeIcon,
      };
    },
  },
})
