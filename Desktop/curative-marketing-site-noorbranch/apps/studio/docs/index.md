# Docs

> [!NOTE]
> In this project, both field and document schemas are exported from [`schemas/index.ts`](/schemas/index.ts) and consumed by `/sanity.config.ts`.

## Document Types

All content in Sanity is contained within documents. You define different document types by importing schemas with `type: 'document'` in `sanity.config.ts`.

See the following pages for documentation of each type:

- [Blog Post (`blogPost`)](doctypes/blogPost.md)
- [Company (`company`)](doctypes/company.md)
- [Person (`person`)](doctypes/person.md)

## Custom Fields

TBD as needed.

## Migration Scripts

See the [scripts docs](/docs/scripts/index.md) for information about the migration scripts found in [`/scripts`](/scripts/).
