# Webstacks Sanity Studio

> [!IMPORTANT]  
> Check out the [documentation for doctypes, custom fields, and scripts](docs/index.md) to see sample groq queries and more.

## Working locally

To run the studio locally:

1. Install dependencies with `yarn install`.
2. provide an env file with the following values:
   ```
   SANITY_STUDIO_PROJECT_ID
   SANITY_STUDIO_DATASET_PROD
   SANITY_STUDIO_DATASET_DEV
   SANITY_STUDIO_API_VERSION
   ```
   (Reach out to @nshahidi for credentials if you need them.)
3. Run the sanity dev server with `yarn dev`.

> [!NOTE]  
> All environment variables are consumed by and re-exported from [`lib/api.ts`](lib/api.ts).

## Deploying

This repo is hooked up to a project on Webstacks' vercel instance. There are two main domains:

- Changes pushed to `production` are built at [`webstacks-sanity-studio.vercel.app`](https://webstacks-sanity-studio.vercel.app).
- Changes pushed to `main` are built at [`webstacks-sanity-studio-dev.vercel.app`](https://webstacks-sanity-studio-dev.vercel.app)

> [!IMPORTANT]  
> When running locally or on a vercel preview deployment, the studio will default to using the `development` dataset. You can tell which dataset you're using or switch between them by looking at the [menu](/docs/assets/dataset-menu.png) in the upper left-hand corner of the window.
