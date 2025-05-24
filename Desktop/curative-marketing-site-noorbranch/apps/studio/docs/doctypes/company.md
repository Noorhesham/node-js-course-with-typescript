# Company (Document Type)

The doctype `company` contains information about businesses, including logos, icons, and links. `person` docs will often reference companies as employers.

[See the `company` schema.](/schemas/documents/company.ts)

### Sample queries

- `*[_type == "company"]` will list all companies.

- This query will list all companies that reference at least 1 employee:
  ```
  *[_type == "company"]{
    name,
    "refs": *[_type == "person" && references(^._id)]
  }[length(refs) > 0]{
    name
  }
  ```
  [Run this query](https://b7pblshe.api.sanity.io/v2024-04-16/data/query/marketing-dev?query=*%5B_type+%3D%3D+%22company%22%5D%7B%0A++name%2C%0A++%22refs%22%3A+*%5B_type+%3D%3D+%22person%22+%26%26+references%28%5E._id%29%5D%0A%7D%5Blength%28refs%29+%3E+0%5D%7B%0A++name%0A%7D)
- This query will list all companies, listing the names of associated people and pull in links to logotype and icons.
  ```
  *[_type == "company"] {
    ...,
    logotype {
      "onDark": onDark.asset->url,
      "onLight": onLight.asset->url,
      "default": default.asset->url
    },
    icon {
      "onDark": onDark.asset->url,
      "onLight": onLight.asset->url,
      "default": default.asset->url
    },
    "people": *[_type == "person" && references(^._id)]{
        "name": firstName + " " + lastName
    }
  }
  ```
  [Run this query](https://b7pblshe.api.sanity.io/v2024-04-16/data/query/marketing-dev?query=*%5B_type+%3D%3D+%22company%22%5D+%7B%0A++++...%2C%0A++++logotype+%7B%0A++++++%22onDark%22%3A+onDark.asset-%3Eurl%2C%0A++++++%22onLight%22%3A+onLight.asset-%3Eurl%2C%0A++++++%22default%22%3A+default.asset-%3Eurl%0A++++%7D%2C%0A++++icon+%7B%0A++++++%22onDark%22%3A+onDark.asset-%3Eurl%2C%0A++++++%22onLight%22%3A+onLight.asset-%3Eurl%2C%0A++++++%22default%22%3A+default.asset-%3Eurl%0A++++%7D%2C%0A++++%22people%22%3A+*%5B_type+%3D%3D+%22person%22+%26%26+references%28%5E._id%29%5D%7B%0A++++++++%22name%22%3A+firstName+%2B+%22+%22+%2B+lastName%0A++++%7D%0A++%7D)
