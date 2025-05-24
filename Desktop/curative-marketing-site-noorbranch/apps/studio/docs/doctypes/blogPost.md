# Blog Post (Document Type)

The doctype `blogPost` contain the content and configuration for blog post pages available on the `/blog/` route.

[See the `blogPost` schema.](/schemas/documents/blogPost.ts)

## Sample Queries

### Basics

- `*[_type == "blogPost"]` will return an array of all blog posts, including all of their fields.
- `*[_type == "blogPost"].title` will return an array of blog post titles.

### Pagination

#### Manual pagination

- `*[_type == "blogPost"][0..5]` returns the first 6 posts (`..` specifies an inclusive range)
- `*[_type == "blogPost"][0...5]` returns the first 5 posts (`...` specifies an exclusive range)
- `*[type == "blogPost"][5...10]` return the first 5 posts, offset by 5.

#### Pagination with parameters

Groq queries support basic arithmetic. Combined with query parameters, this makes it easy to build flexible queries for paginated content. For example, with the following parameters:

```json
{
  "page": 1,
  "pageSize": 2
}
```

this query will give titles for the second page of 2 blog posts (assuming that the first page has an index `0`):

```
*[_type == "blogPost"][($page * $pageSize)...($page * $pageSize + $pageSize)] {
  title
}
```

[Run this query](https://b7pblshe.api.sanity.io/v2024-04-16/data/query/marketing-prod?query=*%5B_type+%3D%3D+%22blogPost%22%5D%5B%28%24page+*+%24pageSize%29...%28%24page+*+%24pageSize+%2B+%24pageSize%29%5D+%7B%0A++title%0A%7D&%24page=1&%24pageSize=2)
