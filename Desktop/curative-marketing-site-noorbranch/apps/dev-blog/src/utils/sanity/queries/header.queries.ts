import groq from 'groq';

import { sanityFetch } from '@utils/sanity/client/sanity.fetch';

// This query fetches all global header docs and selects the correct one based on the locale.
// If the locale is not found, it will default to the English version.
const headerQuery = groq`
*[_type == "globalHeader"][0]
{
  ...,
  left[] {
    ...,
    left {
      ...,
      navItemLists[] {
        ...,
        navItems[] {
          ...,
          link {
            ...,
            internalLink {
              ...
              reference->{
                ...
              }
            }
          },
          testimonial-> {
            ...,
            author->{
              ...
            }
          },
        }
      }
    },
    right {
      ...,
      navItemLists[] {
        ...,
        navItems[] {
          ...,
          link {
            ...,
            internalLink {
              ...
              reference->{
                ...
              }
            },
          },
          testimonial-> {
            ...,
            author->{
              ...
            }
          },
        }
      }
    }
  },
  right[] {
    ...,
    _type == "cta" => {
      ...,
      link {
        ...,
        internalLink {
          ...,
          reference->{
            ...
          }
        }
      }
    }
  }
}`;

export const fetchHeaders = async () => {
  const data = await sanityFetch({
    query: headerQuery,
  });

  return data || null;
};
