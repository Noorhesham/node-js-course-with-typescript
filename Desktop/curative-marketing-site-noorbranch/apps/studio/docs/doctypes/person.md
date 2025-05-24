# Person (Document Type)

The doctype `person` store details about people referenced as authors in `blogPost`, `testimonial`, and other places. These docs include references to an employer `company`.

[See the `person` schema.](/schemas/documents/person.ts)

### Sample Queries

- `*[_type == 'person']` will give an array of all `person` documents.
- `*[_type == 'person'][0]` will give just the first.
- `*[_type == 'person' && _id='<some-id>']` will give the `person` with the given `_id`.

The `person` doc type includes two references: `company` and an `asset` reference within `headshot`. To get all fields, including those from the referenced docs:

```groq
*[_type == "person"][0]{
   ...,
   company->,
   headshot {
      ...,
      asset->
   }
}
```

[Run this query](https://b7pblshe.api.sanity.io/v2024-04-16/data/query/marketing-dev?query=++*%5B_type+%3D%3D+%22person%22%5D%5B0%5D%7B%0A+++++...%2C%0A+++++company-%3E%2C%0A+++++headshot+%7B%0A++++++++...%2C%0A++++++++asset-%3E%0A+++++%7D%0A++%7D)
