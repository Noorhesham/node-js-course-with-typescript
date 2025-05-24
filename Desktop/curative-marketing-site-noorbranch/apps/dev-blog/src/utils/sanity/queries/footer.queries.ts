import groq from 'groq';

import { sanityFetch } from '@utils/sanity/client/sanity.fetch';

const footerQuery = groq`
*[_type == "footer"][0]
{
  ...,
  navColumns[]{
    ...,
    items[]{
      ...,
      type == "internalLink" =>{
        ...,
        internalLink{
          ...,
          reference->{
            ...,
          }
        }
      }
    }
  }
}`;

export const fetchFooter = async () => {
  const data = await sanityFetch({
    query: footerQuery,
  });

  return data || null;
};
