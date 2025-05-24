import groq from 'groq';

import { moduleTypesQuery } from './moduleTypes.query';

export const sharedModuleQuery = groq`
  _type == "sharedModule" => @-> {
    _type,
    _id,
    name,
    content[] {
      _key,
      _type,
      ${moduleTypesQuery}
    }
  }
`;
