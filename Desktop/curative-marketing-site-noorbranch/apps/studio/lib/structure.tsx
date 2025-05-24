import {
  BookIcon,
  CalendarIcon,
  CodeBlockIcon,
  ComponentIcon,
  EditIcon,
  HomeIcon,
  StarIcon,
  TagIcon,
  UserIcon,
} from '@sanity/icons'
import { BsQuestionCircle } from 'react-icons/bs'
import { PAGE_TYPES } from './consts'
import { FaRegLightbulb } from 'react-icons/fa'
import { FaPhoneAlt, FaPodcast } from 'react-icons/fa'
import { FaBriefcase, FaDownload, FaLocationDot } from 'react-icons/fa6'
import { FiAward } from 'react-icons/fi'
import { IoGlobeOutline, IoPricetagOutline } from 'react-icons/io5'


import type { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      mainSitePagesMenu(S),
      S.listItem()
        .title('Landing Pages')
        .icon(FaLocationDot)
        .child(
          S.list()
            .title('Landing Pages')
            .items([
              S.documentTypeListItem('paidLandingPage'),
              S.documentTypeListItem('meetingThankYouPage'),
              S.documentTypeListItem('listingPage'),
            ])
        ),
      S.divider(),
      reviewsMenu(S),
      careersMenu(S),
      blogsMenu(S),
      clientStoryMenu(S),
      eventListingMenu(S),
      podcastListingMenu(S),
      glossaryListingMenu(S),

      downloadableAssetMenu(S),
      S.documentTypeListItem('legalPage').title('Legal'),
      S.divider(),
      categoriesMenu(S),
      contentBlocksMenu(S),
      peopleAndCompaniesMenu(S),
      S.documentTypeListItem('redirects').title('Redirects'),
    ])

const mainSitePagesMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Website Pages')
    .icon(IoGlobeOutline)
    .child(
      S.list()
        .title('Website Pages')
        .items([
          S.listItem()
            .title('Home')
            .icon(HomeIcon)
            .child(
              S.document()
                .schemaType('page')
                .documentId('9c8476d6-0511-4e19-b4bb-df1ee688b94b'),
            ),
          S.listItem()
            .title('About')
            .icon(UserIcon)
            .child(
              S.document()
                .schemaType('page')
                .documentId('6f66eef8-b9f2-4092-a818-cd1fe03a241e'),
            ),
          S.listItem()
            .title('Why Webstacks')
            .icon(BsQuestionCircle)
            .child(
              S.document()
                .schemaType('page')
                .documentId('3dde6e49-bb93-478a-b18f-3e68e2913a82'),
            ),
          S.divider(),
          S.listItem()
            .id('solutionsPage')
            .title('Solutions')
            .icon(FaRegLightbulb)
            .child(
              S.documentList()
                .title('Solutions')
                .schemaType('solutionsPage')
                .filter('_type == "solutionsPage"')
            ),
          S.documentTypeListItem('useCasePage')
            .title('Use Cases')
            .icon(FaBriefcase),
          S.documentTypeListItem('industryPage')
            .title('Industries')
            .icon(IoGlobeOutline),
          S.documentTypeListItem('stagePage')
            .title('Stage')
            .icon(StarIcon),
          S.documentTypeListItem('technologyPage')
            .title('Technology')
            .icon(ComponentIcon),
          S.documentTypeListItem('capabilitiesPage').title('Capabilities'),
          S.divider(),
          S.listItem()
            .title('Sales')
            .icon(FaPhoneAlt)
            .child(
              S.document()
                .schemaType('page')
                .documentId('450399dd-26cd-4b95-a0f9-1574a1d3a638'),
            ),
          S.listItem()
            .title('Pricing')
            .icon(IoPricetagOutline)
            .child(
              S.document()
                .schemaType('page')
                .documentId('0462778a-d0ff-4bc0-b7b3-d10470c52e0b'),
            ),
          S.divider(),
          S.listItem()
            .title('All Pages')
            .icon(BookIcon)
            .child(
              S.documentList()
                .title('All Pages')
                .filter(`_type in $types`)
                .params({ types: PAGE_TYPES })
            ),
          S.divider(),

        ]),
    )

const reviewsMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Reviews')
    .icon(FiAward)
    .child(
      S.list()
        .title('Reviews')
        .items([
          S.listItem()
            .title('Reviews Homepage')
            .icon(HomeIcon)
            .child(
              S.document()
                .schemaType('page')
                .documentId('e2a277b5-7e98-4d75-aaf9-a7b00c69f06f'),
            ),
          S.documentTypeListItem('review').title('Reviews'),
        ]),
    )

const careersMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Careers')
    .icon(FaBriefcase)
    .child(
      S.document()
        .schemaType('page')
        .documentId('e094024e-d5a8-48ed-9552-3252fdba9075'),
    )

const blogsMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Blogs')
    .icon(EditIcon)
    .child(
      S.list()
        .title('Blogs')
        .items([
          // Main Blog
          S.listItem()
            .title('Blog')
            .icon(EditIcon)
            .child(
              S.list()
                .title('Blog')
                .items([
                  S.listItem()
                    .title('Blog Homepage')
                    .icon(HomeIcon)
                    .child(
                      S.document()
                        .schemaType('blogHomepage')
                        .documentId('blogHomepage'),
                    ),
                  S.documentTypeListItem('blogPost').title('Blog Posts'),
                ])
            ),
          // Between The Brackets
          S.listItem()
            .title('Between The Brackets')
            .icon(CodeBlockIcon)
            .child(
              S.list()
                .title('Between The Brackets')
                .items([
                  S.listItem()
                    .title('Between The Brackets Homepage')
                    .icon(HomeIcon)
                    .child(
                      S.document()
                        .schemaType('betweenTheBracketsHomepage')
                        .documentId('betweenTheBracketsHomepage'),
                    ),
                  S.documentTypeListItem('betweenTheBracketPost').title('Between The Brackets Posts'),
                ])
            ),
          // Dev Blog
          S.listItem()
            .title('webstacks.dev')
            .icon(CodeBlockIcon)
            .child(
              S.list()
                .title('webstacks.dev')
                .items([
                  S.listItem()
                    .title('webstacks.dev Homepage')
                    .icon(HomeIcon)
                    .child(
                      S.document()
                        .schemaType('devBlogHomepage')
                        .documentId('devBlogHomepage'),
                    ),
                  S.documentTypeListItem('webstacksDevPost').title('Dev Blog Posts'),
                ])
            ),
        ]),
    )

// Between The Brackets menu is now part of the Blogs menu

const clientStoryMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Client Stories')
    .icon(StarIcon)
    .child(
      S.list()
        .title('Client Stories')
        .items([
          S.listItem()
            .title('Client Stories Homepage')
            .icon(HomeIcon)
            .child(
              S.document()
                .schemaType('page')
                .documentId('c7af304a-aef8-4806-8087-29eb2798df14'),
            ),
          S.documentTypeListItem('clientStory').title('Client Stories'),
        ]),
    )

const eventListingMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Events')
    .icon(CalendarIcon)
    .child(
      S.list()
        .title('Events')
        .items([
          S.listItem()
            .title('Events Homepage')
            .icon(HomeIcon)
            .child(
              S.document()
                .schemaType('page')
                .documentId('71d813af-6aea-4475-bc38-858683494687'),
            ),
          S.documentTypeListItem('event').title('Events'),
        ]),
    )

const podcastListingMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Podcast')
    .icon(FaPodcast)
    .child(
      S.list()
        .title('Podcast')
        .items([
          S.listItem()
            .title('Podcast Homepage')
            .icon(HomeIcon)
            .child(
              S.document()
                .schemaType('page')
                .documentId('45aa6c25-9675-4e04-9d4e-c75261747a47'),
            ),
          S.documentTypeListItem('podcast').title('Podcasts'),
        ]),
    )

const glossaryListingMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Glossary')
    .icon(BookIcon)
    .child(
      S.list()
        .title('Glossary')
        .items([
          S.listItem()
            .title('Glossary Homepage')
            .icon(HomeIcon)
            .child(
              S.document()
                .schemaType('page')
                .documentId('dd52290d-a4f5-4f0b-941c-a9ce1cbedc8d'),
            ),
          S.documentTypeListItem('glossaryTerm').title('Glossary Terms'),
        ]),
    )



const downloadableAssetMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Downloads')
    .icon(FaDownload)
    .child(
      S.list()
        .title('Downloads')
        .items([
          S.documentTypeListItem('guide').title('Guides'),
          S.documentTypeListItem('ebook').title('Ebooks'),
          S.documentTypeListItem('checklist').title('Checklists'),
          S.documentTypeListItem('report').title('Reports'),
        ]),
    )

const peopleAndCompaniesMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('People & Companies')
    .icon(UserIcon)
    .child(
      S.list()
        .title('People & Companies')
        .items([
          S.documentTypeListItem('person').title('People'),
          S.documentTypeListItem('company').title('Companies'),
        ]),
    )

const contentBlocksMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Content Building Blocks')
    .icon(ComponentIcon)
    .child(
      S.list()
        .title('Content Building Blocks')
        .items([
          S.documentTypeListItem('hubspotForm').title('Hubspot Forms'),
          S.documentTypeListItem('cta').title('Shared CTAs'),
          S.documentTypeListItem('testimonial').title('Testimonials'),
          S.documentTypeListItem('sharedComponent').title(
            'Shared Sections',
          ),
          S.documentTypeListItem('sharedModule').title(
            'Shared Modules',
          ),
          S.documentTypeListItem('token').title('Tokens'),
          S.documentTypeListItem('video').title('Videos'),
          S.divider(),
          S.documentTypeListItem('globalHeader').title('Global Header'),
          S.documentTypeListItem('footer').title('Global Footer'),
        ]),
    )

const categoriesMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Categories')
    .icon(TagIcon)
    .child(
      S.list()
        .title('Categories')
        .items([
          S.documentTypeListItem('blogTag').title('Blog Tags'),
          S.documentTypeListItem('blogTopic').title('Blog Topics'),
          S.documentTypeListItem('useCase').title('Use Cases'),
          S.documentTypeListItem('industry').title('Industries'),
          S.documentTypeListItem('technology').title('Technologies'),
          S.documentTypeListItem('solution').title('Solutions'),
          S.documentTypeListItem('stage').title('Stage'),
        ]),
    )
