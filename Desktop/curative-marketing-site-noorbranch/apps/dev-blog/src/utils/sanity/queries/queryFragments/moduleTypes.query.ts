import groq from 'groq';

// For the dev-blog app, we're using a simplified version of the moduleTypesQuery
// If specific module queries are needed, they can be imported and added here

export const moduleTypesQuery = groq`
  _type == "videoReference" => @-> {
    ...,
  },
  _type == "imageGallery" => {
    ...,
  }
`;
