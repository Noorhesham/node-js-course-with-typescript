import groq from 'groq';
import { moduleTypesQuery } from './moduleTypes.query';
import { sharedModuleQuery } from './sharedModule.query';

export const complexRichTextQuery = groq`
  ${moduleTypesQuery},
  ${sharedModuleQuery}
`;
