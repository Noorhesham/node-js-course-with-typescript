import { BiTab } from 'react-icons/bi';
import { defineField } from 'sanity';

import { PreviewSectionTab } from './PreviewSectionTab';

import {
  accordion,
  articleSpotlight,
  basicText,
  beforeAfterCompare,
  brandSwitcher,
  brandTable,
  cardCarousel,
  cardDeck,
  chatCarousel,
  clientStoriesBento,
  clientStoriesCallout,
  clientStoriesWall,
  contentGrid,
  conversionPanel,
  embed,
  flipCards,
  headingBlock,
  hero,
  heroMarquee,
  imageBlock,
  imageWall,
  industriesSelector,
  jobListing,
  parallelPanels,
  mediaCollage,
  procon,
  scroller,
  sharedComponentReference,
  statisticsDeck,
  statsPanel,
  switchback,
  switchbackShutter,
  teamBlock,
  testimonialBlock,
  testimonialPanel,
  testimonialSlider,
  trustBar,
  videoEmbed,
  windowPane,
} from '../';
import { definePageComponent } from '../definePageComponent';
import { simpleEmbeddedForm } from '@/schemas/fields/embeddedForm/simpleEmbeddedForm';
import { alphabetizeByType } from '@/utils';

export const sectionTab = definePageComponent({
  name: 'sectionTab',
  title: 'Section Tab',
  description: 'Section Tab component',
  icon: BiTab,
  fields: [
    defineField({
      name: 'theme',
      title: 'Variant',
      type: 'string',
      initialValue: 'pill',
      options: {
        list: [
          { title: 'Pill', value: 'pill' },
          { title: 'Step', value: 'step' },
        ],
      },
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [
        defineField({
          name: 'step',
          title: 'Step',
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string'
            }),
            defineField({
              name: 'components',
              title: 'Sections',
              type: 'array',
              of: alphabetizeByType([
                // Layouts
                scroller,
                switchback,
                switchbackShutter,
                accordion,
                articleSpotlight,
                cardDeck,
                flipCards,
                contentGrid,
                beforeAfterCompare,
                brandSwitcher,
                brandTable,
                windowPane,
                parallelPanels,
                procon,
                jobListing,
                cardCarousel,
                // Links + Resources
                conversionPanel,
            
                // Social Proof
                statisticsDeck,
                statsPanel,
                teamBlock,
                testimonialBlock,
                testimonialPanel,
                testimonialSlider,
                imageWall,
                mediaCollage,
                trustBar,
                clientStoriesBento,
                clientStoriesCallout,
                clientStoriesWall,
                chatCarousel,
            
                // Intros
                hero,
                heroMarquee,
                headingBlock,
            
                // Misc.
                sharedComponentReference,
                basicText,
                imageBlock,
                industriesSelector,
                embed,
                videoEmbed,
                simpleEmbeddedForm,
              ]),
              options: {
                insertMenu: {
                  filter: true,
                  views: [
                    {
                      name: 'grid',
                      previewImageUrl: (schemaTypeName) =>
                        `/static/componentPreviews/${schemaTypeName}.png`,
                    },
                    { name: 'list' },
                  ],
                }
              }
            }),
          ]
        }),
      ],
    }),
  ],
  preview: {
    select: {
      theme: 'theme',
      tabs: 'tabs'
    }
  },
  components: {
    preview: PreviewSectionTab
  },
});
