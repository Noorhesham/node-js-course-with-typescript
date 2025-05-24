const DeleteMediasMediaHashedIdCaptionsLanguageCodeJson = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-hashed-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Unique identifier for the video.',
          },
          'language-code': {
            type: 'string',
            pattern: '^[a-z]{3}$',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Language code conforming to ISO-639-2 for which the captions should be removed.',
          },
        },
        required: ['media-hashed-id', 'language-code'],
      },
    ],
  },
} as const
const DeleteMediasMediaHashedIdJson = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-hashed-id': {
            type: 'string',
            description: 'The hashed ID of the media.',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['media-hashed-id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description:
            'A unique numeric identifier for the media within the system.',
        },
        name: { type: 'string', description: 'The display name of the media.' },
        type: {
          type: 'string',
          enum: [
            'Video',
            'Audio',
            'Image',
            'PdfDocument',
            'MicrosoftOfficeDocument',
            'Swf',
            'UnknownType',
          ],
          description:
            'A string representing what type of media this is.\n\n`Video` `Audio` `Image` `PdfDocument` `MicrosoftOfficeDocument` `Swf` `UnknownType`',
        },
        archived: {
          type: 'boolean',
          description:
            'Whether or not the media is archived, either true or false.',
        },
        created: {
          type: 'string',
          format: 'date-time',
          description: 'The date when the media was originally uploaded.',
        },
        updated: {
          type: 'string',
          format: 'date-time',
          description: 'The date when the media was last changed.',
        },
        duration: {
          type: 'number',
          description:
            'Specifies the length (in seconds) for audio and video files. Specifies number of pages in the document. Omitted for other types of media.',
        },
        embedCode: {
          type: 'string',
          deprecated: true,
          description:
            'DEPRECATED: If you want to programmatically embed videos, follow the construct an embed code guide.\n',
        },
        hashed_id: {
          type: 'string',
          description: 'A unique alphanumeric identifier for this media.',
        },
        description: {
          type: 'string',
          description:
            'A description for the media which usually appears near the top of the sidebar on the media’s page.',
        },
        progress: {
          type: 'number',
          minimum: 0,
          maximum: 1,
          description:
            'A floating point value between 0 and 1 that indicates the progress of the processing for this file.',
        },
        status: {
          type: 'string',
          enum: ['queued', 'processing', 'ready', 'failed'],
          description:
            'Post upload processing status. - `queued`: the file is waiting in the queue to be processed. - `processing`: the file is actively being processed. - `ready`: the file has been fully processed and is ready for embedding and viewing. - `failed`: the file was unable to be processed (usually a format or size error).\n\n\n`queued` `processing` `ready` `failed`',
        },
        section: {
          type: 'string',
          description:
            'The title of the section in which the media appears. This attribute is omitted if the media is not in a section (default).',
        },
        thumbnail: {
          type: 'object',
          properties: {
            url: { type: 'string' },
            width: { type: 'integer' },
            height: { type: 'integer' },
          },
        },
        project: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description:
                'A unique numeric identifier for the project within the system.',
              examples: [22570],
            },
            name: {
              type: 'string',
              description: 'The project’s display name.',
              examples: ['My Project Title'],
            },
            hashedId: {
              type: 'string',
              description:
                'A private hashed id, uniquely identifying the project within the system.',
              examples: ['4d23503f70'],
            },
          },
        },
        assets: {
          type: 'array',
          description: 'An array of the assets available for this media.',
          items: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
                description: 'A direct-access URL to the content of the asset.',
              },
              width: {
                type: 'integer',
                description: 'The width of this specific asset, if applicable.',
              },
              height: {
                type: 'integer',
                description:
                  'The height of this specific asset, if applicable.',
              },
              fileSize: {
                type: 'integer',
                description:
                  'The size of the asset file that’s referenced by url, measured in bytes.',
              },
              contentType: {
                type: 'string',
                description: 'The asset’s content type.',
              },
              type: {
                type: 'string',
                description:
                  'The internal type of the asset, describing how the asset should be used. Values can include OriginalFile, FlashVideoFile, MdFlashVideoFile, HdFlashVideoFile, Mp4VideoFile, MdMp4VideoFile, HdMp4VideoFile, IPhoneVideoFile, StillImageFile, SwfFile, Mp3AudioFile, and LargeImageFile.\n',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const DeleteMediasMediaIdCustomizationsJson = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'The hashed ID of the media whose customizations are to be deleted.',
          },
        },
        required: ['media-id'],
      },
    ],
  },
  response: {
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const DeleteProjectsId = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Project Hashed ID',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description:
            'A unique numeric identifier for the project within the system.',
          examples: [22570],
        },
        name: {
          type: 'string',
          description: 'The project’s display name.',
          examples: ['My Project Title'],
        },
        description: {
          type: 'string',
          description: 'The project’s description.',
          examples: ['About My Project'],
        },
        mediaCount: {
          type: 'integer',
          description:
            'The number of different medias that have been uploaded to the project.',
          examples: [2],
        },
        created: {
          type: 'string',
          description: 'The date that the project was originally created.',
          format: 'date-time',
          examples: ['2010-08-13T18:47:39+00:00'],
        },
        updated: {
          type: 'string',
          description: 'The date that the project was last updated.',
          format: 'date-time',
          examples: ['2010-08-19T21:47:00+00:00'],
        },
        hashedId: {
          type: 'string',
          description:
            'A private hashed id, uniquely identifying the project within the system.',
          examples: ['4d23503f70'],
        },
        public: {
          type: 'boolean',
          description:
            'A boolean indicating whether the project is available for public (anonymous) viewing.',
          examples: [false],
        },
        publicId: {
          type: 'string',
          description:
            'If the project is public, this field contains a string representing the ID used for referencing the project in public URLs.',
          examples: ['4bD'],
        },
        anonymousCanUpload: { type: 'boolean', examples: [false] },
        anonymousCanDownload: { type: 'boolean', examples: [false] },
      },
      required: [
        'id',
        'name',
        'mediaCount',
        'created',
        'updated',
        'hashedId',
        'public',
        'publicId',
      ],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const DeleteProjectsProjectIdSharingsSharingIdJson = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'project-id': {
            type: 'string',
            description: 'Hashed ID of the project',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
          'sharing-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'ID of the sharing to be deleted',
          },
        },
        required: ['project-id', 'sharing-id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        id: { type: 'integer', examples: [14] },
        isAdmin: { type: 'boolean', examples: [true] },
        canShare: { type: 'boolean', examples: [true] },
        canDownload: { type: 'boolean', examples: [true] },
        canUpload: { type: 'boolean', examples: [true] },
        share: {
          type: 'object',
          properties: {
            id: { type: 'integer', examples: [3] },
            name: { type: 'string', examples: ['Jim'] },
            type: { type: 'string', examples: ['Contact'] },
            email: {
              type: 'string',
              format: 'email',
              examples: ['jim@wistia.com'],
            },
          },
        },
        project: {
          type: 'object',
          properties: {
            id: { type: 'integer', examples: [13] },
            name: { type: 'string', examples: ['My Project'] },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const DeleteTagsName = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Tag ID',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['name'],
      },
    ],
  },
  response: {
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetAccountDetails = {
  response: {
    '200': {
      type: 'object',
      properties: {
        id: { type: 'integer', description: 'Numeric id of the account' },
        name: { type: 'string', description: 'Account name' },
        url: {
          type: 'string',
          description:
            'Account’s main Wistia URL (e.g. http://brendan.wistia.com)',
        },
        mediaCount: {
          type: 'integer',
          description: 'The total number of medias in this account',
        },
        videoLimit: {
          type: 'integer',
          description: "The account's video limit",
        },
        projectCount: {
          type: 'integer',
          description: 'The total number of projects in this account',
        },
        channelCount: {
          type: 'integer',
          description: 'The total number of channels in this account',
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetBackgroundJobStatusBackgroundJobStatusIdJson = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'background-job-status-id': {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The numeric ID of the background job',
          },
        },
        required: ['background-job-status-id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      description: 'Status of the background job.',
      properties: {
        id: {
          type: 'integer',
          description:
            'The ID of the background job that’s been queued for the request.',
        },
        status: {
          type: 'string',
          description:
            'The status of the background job that’s been queued for the request.\n\n`queued` `started` `finished` `failed`',
          enum: ['queued', 'started', 'finished', 'failed'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: [
            'The requested background job status is not associated with an authorized object.',
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetChannelEpisodes = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          channel_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Find episodes for a particular channel by providing the channel hashed ID',
          },
          sort_by: {
            type: 'string',
            enum: ['position', 'title', 'created', 'updated'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Ordering. Default is ID ASC.',
          },
          sort_direction: {
            type: 'integer',
            enum: [0, 1],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Ordering Sort Direction (0 = desc, 1 = asc; default is 1)',
          },
          page: {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Page number to retrieve',
          },
          per_page: {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Number of channels per page',
          },
          media_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Filter by media id',
          },
          hashed_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Filter by hashed id',
          },
          published: {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Filter by published status.',
          },
          title: {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Filter by channel episode name/title.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          channels: {
            type: 'object',
            properties: {
              channelHashedId: {
                type: 'string',
                description:
                  "A unique alphanumeric identifier for the channel episode's channel.",
              },
              created: {
                type: 'string',
                format: 'date-time',
                description:
                  'The date when the channel episode was originally created.',
              },
              description: {
                type: 'string',
                description: "The channel episode's description.",
              },
              hashedId: {
                type: 'string',
                description:
                  'A unique alphanumeric identifier for the channel episode.',
              },
              mediaHashedId: {
                type: 'string',
                description:
                  "A unique alphanumeric identifier for the channel episode's media.",
              },
              published: {
                type: 'boolean',
                description:
                  'Whether the channel episode has been published or is still in draft form.',
              },
              title: {
                type: 'string',
                description: 'The title of the channel episode',
              },
              updated: {
                type: 'string',
                format: 'date-time',
                description: 'The date when the channel was last updated.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetChannels = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Page number to retrieve',
          },
          per_page: {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Number of channels per page',
          },
          sort_by: {
            type: 'string',
            enum: ['created', 'id', 'updated'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Ordering. Default is ID ASC.',
          },
          sort_direction: {
            type: 'integer',
            enum: [0, 1],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Ordering Sort Direction (0 = desc, 1 = asc; default is 1)',
          },
          'hashed_ids[]': {
            type: 'array',
            items: { type: 'string' },
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Find all of the channels limited to these hashed_ids.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          channels: {
            type: 'object',
            properties: {
              created: {
                type: 'string',
                format: 'date-time',
                description:
                  'The date when the channel was originally created.',
              },
              description: {
                type: 'string',
                description: 'The channel’s description.',
              },
              hashedId: {
                type: 'string',
                description:
                  'A unique alphanumeric identifier for this channel.',
              },
              mediaCount: {
                type: 'integer',
                description: 'The number of medias in the channel.',
              },
              name: {
                type: 'string',
                description: 'The display name for the channel',
              },
              updated: {
                type: 'string',
                format: 'date-time',
                description: 'The date when the channel was last updated.',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetChannelsId = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The hashed ID of the channel.',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        channels: {
          type: 'object',
          properties: {
            created: {
              type: 'string',
              format: 'date-time',
              description: 'The date when the channel was originally created.',
            },
            description: {
              type: 'string',
              description: 'The channel’s description.',
            },
            hashedId: {
              type: 'string',
              description: 'A unique alphanumeric identifier for this channel.',
            },
            mediaCount: {
              type: 'integer',
              description: 'The number of medias in the channel.',
            },
            name: {
              type: 'string',
              description: 'The display name for the channel',
            },
            updated: {
              type: 'string',
              format: 'date-time',
              description: 'The date when the channel was last updated.',
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetMedias = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Page number to retrieve',
          },
          per_page: {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Number of medias per page',
          },
          sort_by: {
            type: 'string',
            enum: ['name', 'created', 'updated', 'position'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Ordering',
          },
          sort_direction: {
            type: 'integer',
            enum: [0, 1],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Ordering Sort Direction (0 = desc, 1 = asc; default is 1)',
          },
          project_id: {
            type: 'string',
            description:
              'A hashed ID specifying the project from which you would like to get results.',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
          name: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Find a media or medias whose name exactly matches this parameter.',
          },
          type: {
            type: 'string',
            enum: [
              'Video',
              'Audio',
              'Image',
              'PdfDocument',
              'MicrosoftOfficeDocument',
              'Swf',
              'UnknownType',
            ],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'A string specifying which type of media you would like to get.',
          },
          hashed_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Find the media by hashed_id.',
          },
          'hashed_ids[]': {
            type: 'array',
            items: { type: 'string' },
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Find all of the medias by these hashed_ids.',
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Find all of the medias that match all of these tag names.',
          },
          archived: {
            type: 'boolean',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Filter by archived status. True will return only archived medias, while false will return only active medias.',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description:
              'A unique numeric identifier for the media within the system.',
          },
          name: {
            type: 'string',
            description: 'The display name of the media.',
          },
          type: {
            type: 'string',
            enum: [
              'Video',
              'Audio',
              'Image',
              'PdfDocument',
              'MicrosoftOfficeDocument',
              'Swf',
              'UnknownType',
            ],
            description:
              'A string representing what type of media this is.\n\n`Video` `Audio` `Image` `PdfDocument` `MicrosoftOfficeDocument` `Swf` `UnknownType`',
          },
          archived: {
            type: 'boolean',
            description:
              'Whether or not the media is archived, either true or false.',
          },
          created: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the media was originally uploaded.',
          },
          updated: {
            type: 'string',
            format: 'date-time',
            description: 'The date when the media was last changed.',
          },
          duration: {
            type: 'number',
            description:
              'Specifies the length (in seconds) for audio and video files. Specifies number of pages in the document. Omitted for other types of media.',
          },
          embedCode: {
            type: 'string',
            deprecated: true,
            description:
              'DEPRECATED: If you want to programmatically embed videos, follow the construct an embed code guide.\n',
          },
          hashed_id: {
            type: 'string',
            description: 'A unique alphanumeric identifier for this media.',
          },
          description: {
            type: 'string',
            description:
              'A description for the media which usually appears near the top of the sidebar on the media’s page.',
          },
          progress: {
            type: 'number',
            minimum: 0,
            maximum: 1,
            description:
              'A floating point value between 0 and 1 that indicates the progress of the processing for this file.',
          },
          status: {
            type: 'string',
            enum: ['queued', 'processing', 'ready', 'failed'],
            description:
              'Post upload processing status. - `queued`: the file is waiting in the queue to be processed. - `processing`: the file is actively being processed. - `ready`: the file has been fully processed and is ready for embedding and viewing. - `failed`: the file was unable to be processed (usually a format or size error).\n\n\n`queued` `processing` `ready` `failed`',
          },
          section: {
            type: 'string',
            description:
              'The title of the section in which the media appears. This attribute is omitted if the media is not in a section (default).',
          },
          thumbnail: {
            type: 'object',
            properties: {
              url: { type: 'string' },
              width: { type: 'integer' },
              height: { type: 'integer' },
            },
          },
          project: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description:
                  'A unique numeric identifier for the project within the system.',
                examples: [22570],
              },
              name: {
                type: 'string',
                description: 'The project’s display name.',
                examples: ['My Project Title'],
              },
              hashedId: {
                type: 'string',
                description:
                  'A private hashed id, uniquely identifying the project within the system.',
                examples: ['4d23503f70'],
              },
            },
          },
          assets: {
            type: 'array',
            description: 'An array of the assets available for this media.',
            items: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  description:
                    'A direct-access URL to the content of the asset.',
                },
                width: {
                  type: 'integer',
                  description:
                    'The width of this specific asset, if applicable.',
                },
                height: {
                  type: 'integer',
                  description:
                    'The height of this specific asset, if applicable.',
                },
                fileSize: {
                  type: 'integer',
                  description:
                    'The size of the asset file that’s referenced by url, measured in bytes.',
                },
                contentType: {
                  type: 'string',
                  description: 'The asset’s content type.',
                },
                type: {
                  type: 'string',
                  description:
                    'The internal type of the asset, describing how the asset should be used. Values can include OriginalFile, FlashVideoFile, MdFlashVideoFile, HdFlashVideoFile, Mp4VideoFile, MdMp4VideoFile, HdMp4VideoFile, IPhoneVideoFile, StillImageFile, SwfFile, Mp3AudioFile, and LargeImageFile.\n',
                },
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetMediasMediaHashedIdCaptionsJson = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-hashed-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'The hashed ID of the media for which captions are to be retrieved.',
          },
        },
        required: ['media-hashed-id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          captions: {
            type: 'object',
            properties: {
              english_name: {
                type: 'string',
                description: 'English name of the language.',
              },
              native_name: {
                type: 'string',
                description: 'Native name of the language.',
              },
              language: {
                type: 'string',
                description:
                  'A 3 character language code as specified by ISO-639–2.',
              },
              text: {
                type: 'string',
                description:
                  'The text of the captions for the specified language in SRT format.',
              },
              is_draft: { type: 'boolean' },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetMediasMediaHashedIdCaptionsLanguageCodeJson = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-hashed-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'The hashed ID of the media from which captions are to be retrieved.',
          },
          'language-code': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The language code of the captions to be retrieved.',
          },
        },
        required: ['media-hashed-id', 'language-code'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        captions: {
          type: 'object',
          properties: {
            english_name: {
              type: 'string',
              description: 'English name of the language.',
            },
            native_name: {
              type: 'string',
              description: 'Native name of the language.',
            },
            language: {
              type: 'string',
              description:
                'A 3 character language code as specified by ISO-639–2.',
            },
            text: {
              type: 'string',
              description:
                'The text of the captions for the specified language in SRT format.',
            },
            is_draft: { type: 'boolean' },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetMediasMediaHashedIdCaptionsLanguageCodeTxt = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-hashed-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'The hashed ID of the media from which captions are to be retrieved.',
          },
          'language-code': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The language code of the captions to be retrieved.',
          },
        },
        required: ['media-hashed-id', 'language-code'],
      },
    ],
  },
  response: {
    '200': {
      type: 'string',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetMediasMediaHashedIdCaptionsLanguageCodeVtt = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-hashed-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'The hashed ID of the media from which captions are to be retrieved.',
          },
          'language-code': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The language code of the captions to be retrieved.',
          },
        },
        required: ['media-hashed-id', 'language-code'],
      },
    ],
  },
  response: {
    '200': {
      type: 'string',
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetMediasMediaHashedIdJson = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-hashed-id': {
            type: 'string',
            description: 'The hashed ID of the media.',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['media-hashed-id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description:
            'A unique numeric identifier for the media within the system.',
        },
        name: { type: 'string', description: 'The display name of the media.' },
        type: {
          type: 'string',
          enum: [
            'Video',
            'Audio',
            'Image',
            'PdfDocument',
            'MicrosoftOfficeDocument',
            'Swf',
            'UnknownType',
          ],
          description:
            'A string representing what type of media this is.\n\n`Video` `Audio` `Image` `PdfDocument` `MicrosoftOfficeDocument` `Swf` `UnknownType`',
        },
        archived: {
          type: 'boolean',
          description:
            'Whether or not the media is archived, either true or false.',
        },
        created: {
          type: 'string',
          format: 'date-time',
          description: 'The date when the media was originally uploaded.',
        },
        updated: {
          type: 'string',
          format: 'date-time',
          description: 'The date when the media was last changed.',
        },
        duration: {
          type: 'number',
          description:
            'Specifies the length (in seconds) for audio and video files. Specifies number of pages in the document. Omitted for other types of media.',
        },
        embedCode: {
          type: 'string',
          deprecated: true,
          description:
            'DEPRECATED: If you want to programmatically embed videos, follow the construct an embed code guide.\n',
        },
        hashed_id: {
          type: 'string',
          description: 'A unique alphanumeric identifier for this media.',
        },
        description: {
          type: 'string',
          description:
            'A description for the media which usually appears near the top of the sidebar on the media’s page.',
        },
        progress: {
          type: 'number',
          minimum: 0,
          maximum: 1,
          description:
            'A floating point value between 0 and 1 that indicates the progress of the processing for this file.',
        },
        status: {
          type: 'string',
          enum: ['queued', 'processing', 'ready', 'failed'],
          description:
            'Post upload processing status. - `queued`: the file is waiting in the queue to be processed. - `processing`: the file is actively being processed. - `ready`: the file has been fully processed and is ready for embedding and viewing. - `failed`: the file was unable to be processed (usually a format or size error).\n\n\n`queued` `processing` `ready` `failed`',
        },
        section: {
          type: 'string',
          description:
            'The title of the section in which the media appears. This attribute is omitted if the media is not in a section (default).',
        },
        tags: {
          type: 'array',
          description: 'Tags associated with this media.',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'The display name of the tag.',
              },
            },
          },
        },
        thumbnail: {
          type: 'object',
          properties: {
            url: { type: 'string' },
            width: { type: 'integer' },
            height: { type: 'integer' },
          },
        },
        project: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description:
                'A unique numeric identifier for the project within the system.',
              examples: [22570],
            },
            name: {
              type: 'string',
              description: 'The project’s display name.',
              examples: ['My Project Title'],
            },
            hashedId: {
              type: 'string',
              description:
                'A private hashed id, uniquely identifying the project within the system.',
              examples: ['4d23503f70'],
            },
          },
        },
        assets: {
          type: 'array',
          description: 'An array of the assets available for this media.',
          items: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
                description: 'A direct-access URL to the content of the asset.',
              },
              width: {
                type: 'integer',
                description: 'The width of this specific asset, if applicable.',
              },
              height: {
                type: 'integer',
                description:
                  'The height of this specific asset, if applicable.',
              },
              fileSize: {
                type: 'integer',
                description:
                  'The size of the asset file that’s referenced by url, measured in bytes.',
              },
              contentType: {
                type: 'string',
                description: 'The asset’s content type.',
              },
              type: {
                type: 'string',
                description:
                  'The internal type of the asset, describing how the asset should be used. Values can include OriginalFile, FlashVideoFile, MdFlashVideoFile, HdFlashVideoFile, Mp4VideoFile, MdMp4VideoFile, HdMp4VideoFile, IPhoneVideoFile, StillImageFile, SwfFile, Mp3AudioFile, and LargeImageFile.\n',
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetMediasMediaHashedIdStatsJson = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-hashed-id': {
            type: 'string',
            description: 'The hashed ID of the video.',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['media-hashed-id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description:
            'A unique numeric identifier for the video within the system.',
        },
        hashed_id: {
          type: 'string',
          description:
            'A unique alphanumeric identifier for the video within the system.',
        },
        name: { type: 'string', description: 'The display name of the video.' },
        stats: {
          type: 'object',
          description:
            'An object representing the aggregated embed statistics for this video.',
          properties: {
            pageLoads: {
              type: 'integer',
              description:
                'The total number of times that the page containing the embedded video has been loaded.',
            },
            visitors: {
              type: 'integer',
              description:
                'The number of unique visitors to the page containing the embedded video.',
            },
            percentOfVisitorsClickingPlay: {
              type: 'integer',
              description:
                'An integer between 0 and 100 that shows what percentage of the time someone who saw the page containing the embedded video played the video.',
            },
            plays: {
              type: 'integer',
              description:
                'The total number of times that the video has been played.',
            },
            averagePercentWatched: {
              type: 'integer',
              description:
                'An integer between 0 and 100. It shows the average percentage of the video that was watched over every time the video was played.',
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description:
            'Error message detailing the reason for the bad request.',
          examples: ['Bad request'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetMediasMediaIdCustomizationsJson = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The hashed ID of the video.',
          },
        },
        required: ['media-id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        playerColor: {
          type: 'string',
          description: 'The color of the video player.',
        },
        stillUrl: { type: 'string' },
        autoPlay: {
          type: 'string',
          description: 'Whether the video should auto play or not.',
        },
        bpbTime: { type: 'string' },
        controlsVisibleOnLoad: { type: 'string' },
        endVideoBehavior: {
          type: 'string',
          description: 'Behavior of the video at the end.',
        },
        fullscreenButton: { type: 'string' },
        branding: { type: 'string' },
        playbar: { type: 'string' },
        playButton: {
          type: 'string',
          description: 'Indicates if the play button is visible.',
        },
        settingsControl: { type: 'string' },
        showCustomerLogo: { type: 'string' },
        qualityControl: { type: 'string' },
        playbackRateControl: { type: 'string' },
        smallPlayButton: { type: 'string' },
        spherical: { type: 'string' },
        volumeControl: { type: 'string' },
        copyLinkAndThumbnailEnabled: { type: 'string' },
        doNotTrack: { type: 'string' },
        email: { type: 'string' },
        fitStrategy: { type: 'string' },
        fullscreenOnRotateToLandscape: { type: 'string' },
        muted: { type: 'string' },
        playlistLinks: { type: 'string' },
        playlistLoop: { type: 'string' },
        playsinline: { type: 'string' },
        playPauseNotifier: { type: 'string' },
        playSuspendedOffScreen: { type: 'string' },
        preload: { type: 'string' },
        qualityMax: { type: 'string' },
        qualityMin: { type: 'string' },
        resumable: { type: 'string' },
        seo: { type: 'string' },
        silentAutoPlay: { type: 'string' },
        time: { type: 'string' },
        thumbnailAltText: { type: 'string' },
        videoFoam: { type: 'string' },
        volume: { type: 'string' },
        wmode: { type: 'string' },
        plugin: {
          type: 'object',
          properties: {
            passwordProtectedVideo: {
              type: 'object',
              properties: {
                on: { type: 'string' },
                src: { type: 'string' },
                challenge: { type: 'string' },
                async: { type: 'string' },
              },
            },
            videoThumbnail: {
              type: 'object',
              properties: { clickToPlayButton: { type: 'string' } },
            },
          },
        },
        private: {
          type: 'object',
          properties: {
            password_protect_on: { type: 'string' },
            show_comments: { type: 'string' },
          },
        },
        encrypted: {
          type: 'object',
          properties: { password_protect_password: { type: 'string' } },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetProjects = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Page number to retrieve',
          },
          per_page: {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Number of projects per page',
          },
          sort_by: {
            type: 'string',
            enum: ['name', 'created', 'updated', 'mediaCount'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Ordering',
          },
          sort_direction: {
            type: 'integer',
            enum: [0, 1],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Ordering Sort Direction (0 = desc, 1 = asc; default is 1)',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description:
              'A unique numeric identifier for the project within the system.',
            examples: [22570],
          },
          name: {
            type: 'string',
            description: 'The project’s display name.',
            examples: ['My Project Title'],
          },
          description: {
            type: 'string',
            description: 'The project’s description.',
            examples: ['About My Project'],
          },
          mediaCount: {
            type: 'integer',
            description:
              'The number of different medias that have been uploaded to the project.',
            examples: [2],
          },
          created: {
            type: 'string',
            description: 'The date that the project was originally created.',
            format: 'date-time',
            examples: ['2010-08-13T18:47:39+00:00'],
          },
          updated: {
            type: 'string',
            description: 'The date that the project was last updated.',
            format: 'date-time',
            examples: ['2010-08-19T21:47:00+00:00'],
          },
          hashedId: {
            type: 'string',
            description:
              'A private hashed id, uniquely identifying the project within the system.',
            examples: ['4d23503f70'],
          },
          public: {
            type: 'boolean',
            description:
              'A boolean indicating whether the project is available for public (anonymous) viewing.',
            examples: [false],
          },
          publicId: {
            type: 'string',
            description:
              'If the project is public, this field contains a string representing the ID used for referencing the project in public URLs.',
            examples: ['4bD'],
          },
          anonymousCanUpload: { type: 'boolean', examples: [false] },
          anonymousCanDownload: { type: 'boolean', examples: [false] },
        },
        required: [
          'id',
          'name',
          'mediaCount',
          'created',
          'updated',
          'hashedId',
          'public',
          'publicId',
        ],
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetProjectsId = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Project Hashed ID',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description:
            'A unique numeric identifier for the project within the system.',
          examples: [22570],
        },
        name: {
          type: 'string',
          description: 'The project’s display name.',
          examples: ['My Project Title'],
        },
        description: {
          type: 'string',
          description: 'The project’s description.',
          examples: ['About My Project'],
        },
        medias: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description:
                  'A unique numeric identifier for the media within the system.',
              },
              name: {
                type: 'string',
                description: 'The display name of the media.',
              },
              type: {
                type: 'string',
                description:
                  'A string representing what type of media this is.',
              },
              archived: {
                type: 'boolean',
                description:
                  'Whether or not the media is archived, either true or false.',
              },
              created: {
                type: 'string',
                format: 'date-time',
                description: 'The date when the media was originally uploaded.',
              },
              updated: {
                type: 'string',
                format: 'date-time',
                description: 'The date when the media was last changed.',
              },
              duration: {
                type: 'number',
                description:
                  'Specifies the length (in seconds) for audio and video files. Specifies number of pages in the document. Omitted for other types of media.',
              },
              hashed_id: {
                type: 'string',
                description: 'A unique alphanumeric identifier for this media.',
              },
              description: {
                type: 'string',
                description:
                  'A description for the media which usually appears near the top of the sidebar on the media’s page.',
              },
              progress: {
                type: 'number',
                description:
                  'A floating point value between 0 and 1 that indicates the progress of the processing for this file.',
              },
              status: {
                type: 'string',
                description:
                  'Post upload processing status. - `queued`: the file is waiting in the queue to be processed. - `processing`: the file is actively being processed. - `ready`: the file has been fully processed and is ready for embedding and viewing. - `failed`: the file was unable to be processed (usually a format or size error).\n',
              },
              thumbnail: {
                type: 'object',
                properties: {
                  url: { type: 'string' },
                  width: { type: 'integer' },
                  height: { type: 'integer' },
                },
              },
            },
          },
        },
        mediaCount: {
          type: 'integer',
          description:
            'The number of different medias that have been uploaded to the project.',
          examples: [2],
        },
        created: {
          type: 'string',
          description: 'The date that the project was originally created.',
          format: 'date-time',
          examples: ['2010-08-13T18:47:39+00:00'],
        },
        updated: {
          type: 'string',
          description: 'The date that the project was last updated.',
          format: 'date-time',
          examples: ['2010-08-19T21:47:00+00:00'],
        },
        hashedId: {
          type: 'string',
          description:
            'A private hashed id, uniquely identifying the project within the system.',
          examples: ['4d23503f70'],
        },
        public: {
          type: 'boolean',
          description:
            'A boolean indicating whether the project is available for public (anonymous) viewing.',
          examples: [false],
        },
        publicId: {
          type: 'string',
          description:
            'If the project is public, this field contains a string representing the ID used for referencing the project in public URLs.',
          examples: ['4bD'],
        },
        anonymousCanUpload: { type: 'boolean', examples: [false] },
        anonymousCanDownload: { type: 'boolean', examples: [false] },
      },
      required: [
        'id',
        'name',
        'mediaCount',
        'created',
        'updated',
        'hashedId',
        'public',
        'publicId',
      ],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetProjectsProjectIdSharingsJson = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'project-id': {
            type: 'string',
            description: 'Project Hashed ID',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['project-id'],
      },
      {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Page number to retrieve',
          },
          per_page: {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Number of projects per page',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', examples: [14] },
          isAdmin: { type: 'boolean', examples: [true] },
          canShare: { type: 'boolean', examples: [true] },
          canDownload: { type: 'boolean', examples: [true] },
          canUpload: { type: 'boolean', examples: [true] },
          share: {
            type: 'object',
            properties: {
              id: { type: 'integer', examples: [3] },
              name: { type: 'string', examples: ['Jim'] },
              type: { type: 'string', examples: ['Contact'] },
              email: {
                type: 'string',
                format: 'email',
                examples: ['jim@wistia.com'],
              },
            },
          },
          project: {
            type: 'object',
            properties: {
              id: { type: 'integer', examples: [13] },
              name: { type: 'string', examples: ['My Project'] },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetProjectsProjectIdSharingsSharingIdJson = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'project-id': {
            type: 'string',
            description:
              "Hashed ID for the project for which you'd like to see sharings.",
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
          'sharing-id': {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'The ID of the specific sharing object that you want to see.',
          },
        },
        required: ['project-id', 'sharing-id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        id: { type: 'integer', examples: [14] },
        isAdmin: { type: 'boolean', examples: [true] },
        canShare: { type: 'boolean', examples: [true] },
        canDownload: { type: 'boolean', examples: [true] },
        canUpload: { type: 'boolean', examples: [true] },
        share: {
          type: 'object',
          properties: {
            id: { type: 'integer', examples: [3] },
            name: { type: 'string', examples: ['Jim'] },
            type: { type: 'string', examples: ['Contact'] },
            email: {
              type: 'string',
              format: 'email',
              examples: ['jim@wistia.com'],
            },
          },
        },
        project: {
          type: 'object',
          properties: {
            id: { type: 'integer', examples: [13] },
            name: { type: 'string', examples: ['My Project'] },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const GetTags = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Page number to retrieve',
          },
          per_page: {
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Number of tags per page',
          },
          sort_by: {
            type: 'string',
            enum: ['name', 'created', 'updated', 'taggings_count'],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Ordering',
          },
          sort_direction: {
            type: 'integer',
            enum: [0, 1],
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Ordering Sort Direction (0 = desc, 1 = asc)',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The tag’s display name.',
            examples: ['My tag Title'],
          },
          taggingsCount: {
            type: 'integer',
            description:
              'The number of different medias that have been associated with this tag.',
            examples: [2],
          },
          created: {
            type: 'string',
            description: 'The date that the tag was originally created.',
            format: 'date-time',
            examples: ['2010-08-13T18:47:39+00:00'],
          },
          updated: {
            type: 'string',
            description: 'The date that the tag was last updated.',
            format: 'date-time',
            examples: ['2010-08-19T21:47:00+00:00'],
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const PostMediasMediaHashedIdCaptionsJson = {
  body: {
    type: 'object',
    properties: {
      caption_file: {
        type: 'string',
        description:
          'Either an attached SRT file or a string parameter with the contents of an SRT file.',
        format: 'binary',
      },
      language: {
        type: 'string',
        description:
          'An optional parameter that denotes which language this file represents. Should conform to ISO-639–2. If left unspecified, the language code will be detected automatically.',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-hashed-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'The hashed ID of the media for which captions are to be added.',
          },
        },
        required: ['media-hashed-id'],
      },
    ],
  },
} as const
const PostMediasMediaHashedIdCaptionsPurchaseJson = {
  body: {
    type: 'object',
    properties: {
      automated: {
        type: 'boolean',
        description:
          'Order computer-generated captions (free) or human-generated captions ($2.50/minute).',
        default: false,
      },
      rush: {
        type: 'boolean',
        description:
          'Enable rush order for one business day turnaround ($4.00/minute) or standard four business day turnaround for human-generated captions ($2.50/minute). Rush can only be used for human-generated captions.',
        default: true,
      },
      automatically_enable: {
        type: 'boolean',
        description:
          'Automatically enable captions for the video once the order is ready or hold the captions for review before manually enabling.',
        default: true,
      },
    },
    required: ['automated', 'rush', 'automatically_enable'],
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-hashed-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Unique identifier for the video.',
          },
        },
        required: ['media-hashed-id'],
      },
    ],
  },
} as const
const PostMediasMediaHashedIdCopyJson = {
  body: {
    type: 'object',
    properties: {
      project_id: {
        type: 'integer',
        description:
          'The ID of the project where you want the new copy placed. Defaults to the source media’s current project if omitted or invalid.',
      },
      owner: {
        type: 'string',
        format: 'email',
        description:
          'An email address specifying the owner of the new media. Defaults to the source media’s current owner if omitted or invalid.',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-hashed-id': {
            type: 'string',
            description: 'The hashed ID of the media.',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['media-hashed-id'],
      },
    ],
  },
  response: {
    '201': {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description:
            'A unique numeric identifier for the media within the system.',
        },
        name: { type: 'string', description: 'The display name of the media.' },
        type: {
          type: 'string',
          enum: [
            'Video',
            'Audio',
            'Image',
            'PdfDocument',
            'MicrosoftOfficeDocument',
            'Swf',
            'UnknownType',
          ],
          description:
            'A string representing what type of media this is.\n\n`Video` `Audio` `Image` `PdfDocument` `MicrosoftOfficeDocument` `Swf` `UnknownType`',
        },
        archived: {
          type: 'boolean',
          description:
            'Whether or not the media is archived, either true or false.',
        },
        created: {
          type: 'string',
          format: 'date-time',
          description: 'The date when the media was originally uploaded.',
        },
        updated: {
          type: 'string',
          format: 'date-time',
          description: 'The date when the media was last changed.',
        },
        duration: {
          type: 'number',
          description:
            'Specifies the length (in seconds) for audio and video files. Specifies number of pages in the document. Omitted for other types of media.',
        },
        embedCode: {
          type: 'string',
          deprecated: true,
          description:
            'DEPRECATED: If you want to programmatically embed videos, follow the construct an embed code guide.\n',
        },
        hashed_id: {
          type: 'string',
          description: 'A unique alphanumeric identifier for this media.',
        },
        description: {
          type: 'string',
          description:
            'A description for the media which usually appears near the top of the sidebar on the media’s page.',
        },
        progress: {
          type: 'number',
          minimum: 0,
          maximum: 1,
          description:
            'A floating point value between 0 and 1 that indicates the progress of the processing for this file.',
        },
        status: {
          type: 'string',
          enum: ['queued', 'processing', 'ready', 'failed'],
          description:
            'Post upload processing status. - `queued`: the file is waiting in the queue to be processed. - `processing`: the file is actively being processed. - `ready`: the file has been fully processed and is ready for embedding and viewing. - `failed`: the file was unable to be processed (usually a format or size error).\n\n\n`queued` `processing` `ready` `failed`',
        },
        section: {
          type: 'string',
          description:
            'The title of the section in which the media appears. This attribute is omitted if the media is not in a section (default).',
        },
        thumbnail: {
          type: 'object',
          properties: {
            url: { type: 'string' },
            width: { type: 'integer' },
            height: { type: 'integer' },
          },
        },
        project: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description:
                'A unique numeric identifier for the project within the system.',
              examples: [22570],
            },
            name: {
              type: 'string',
              description: 'The project’s display name.',
              examples: ['My Project Title'],
            },
            hashedId: {
              type: 'string',
              description:
                'A private hashed id, uniquely identifying the project within the system.',
              examples: ['4d23503f70'],
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const PostMediasMediaHashedIdTrims = {
  body: {
    type: 'object',
    properties: {
      trims: {
        type: 'array',
        description:
          'An array of strings matching the format of HH:MM:SS.mmm-HH:MM:SS.mmm where HH is hours, MM is minutes, SS is seconds and mmm is milliseconds. The ranges should contain the earliest point of the trim first and the later point of the trim second.',
        items: { type: 'string' },
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-hashed-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The hashed ID of the media.',
          },
        },
        required: ['media-hashed-id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        background_job_status: {
          type: 'object',
          description: 'Status of the background job.',
          properties: {
            id: {
              type: 'integer',
              description:
                'The ID of the background job that’s been queued for the request.',
            },
            status: {
              type: 'string',
              description:
                'The status of the background job that’s been queued for the request.\n\n`queued` `started` `finished` `failed`',
              enum: ['queued', 'started', 'finished', 'failed'],
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '422': {
      type: 'object',
      properties: {
        errors: {
          type: 'object',
          description:
            'Contains a summary of what fields had errors and the errors they had.',
          additionalProperties: true,
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const PostMediasMediaIdCustomizationsJson = {
  body: {
    type: 'object',
    properties: {
      autoPlay: {
        type: 'boolean',
        description:
          'If set to true, the video will play as soon as it’s ready. Note that autoplay might not work on some devices and browsers.',
      },
      controlsVisibleOnLoad: {
        type: 'boolean',
        description:
          'If set to true, controls like the big play button, playbar, volume, etc. will be visible as soon as the video is embedded.',
      },
      copyLinkAndThumbnailEnabled: {
        type: 'boolean',
        description:
          'If set to false, the option to “Copy Link and Thumbnail” will be removed when right-clicking on the video.',
      },
      doNotTrack: {
        type: 'boolean',
        description:
          'If set to true, data for each viewing session will not be tracked.',
      },
      email: {
        type: 'string',
        description:
          'Associate a specific email address with this video’s viewing sessions.',
      },
      endVideoBehavior: {
        type: 'string',
        description:
          'Determines what happens when the video ends. Options are default (stays on the last frame), reset (shows thumbnail and controls), and loop (plays again from the start).',
      },
      fakeFullscreen: {
        type: 'boolean',
        description:
          'If set to true, the video will try to play in a pseudo-fullscreen mode on certain mobile devices.',
      },
      fitStrategy: {
        type: 'string',
        description:
          "Resizes the video when there's a discrepancy between its aspect ratio and that of its parent container. Options are contain, cover, fill, and none.",
      },
      fullscreenButton: {
        type: 'boolean',
        description:
          'If set to true, the fullscreen button will be available as a video control.',
      },
      fullscreenOnRotateToLandscape: {
        type: 'boolean',
        description:
          'If set to false, the video will not automatically go to fullscreen mode on mobile when rotated to landscape.',
      },
      keyMoments: {
        type: 'boolean',
        description:
          'If set to false, the key moments feature will be disabled.',
      },
      muted: {
        type: 'boolean',
        description: 'If set to true, the video will start in a muted state.',
      },
      playbackRateControl: {
        type: 'boolean',
        description:
          'If set to false, the playback speed controls in the settings menu will be hidden.',
      },
      playbar: {
        type: 'boolean',
        description:
          'If set to true, the playbar will be available. If set to false, it will be hidden.',
      },
      playButton: {
        type: 'boolean',
        description: 'Indicates if the play button is visible.',
      },
      playerColor: {
        type: 'string',
        description:
          'Changes the base color of the player. Expects a hexadecimal rgb string.',
      },
      playlistLinks: {
        type: 'boolean',
        description:
          'Enables the use of specially crafted links on the page to associate with a video, turning them into a playlist.',
      },
      playlistLoop: {
        type: 'boolean',
        description:
          'If set to true and this video has a playlist, it will loop back to the first video after the last one has finished.',
      },
      playsinline: {
        type: 'boolean',
        description:
          'If set to false, videos will play within the native mobile player.',
      },
      playPauseNotifier: {
        type: 'boolean',
        description:
          'If set to false, animations for the Pause and Play symbols will be removed.',
      },
      playSuspendedOffScreen: {
        type: 'boolean',
        description:
          "If set to false for a muted autoplay video, the video won't pause when out of view.",
      },
      plugin: {
        type: 'object',
        properties: {
          videoThumbnail: {
            type: 'object',
            properties: {
              clickToPlayButton: {
                type: 'boolean',
                description:
                  'If set to false, removes the “Click to Play” button on video thumbnails.',
              },
            },
          },
          'socialbar-v1': {
            type: 'object',
            properties: {
              buttons: { type: 'string' },
              showTweetCount: { type: 'boolean' },
              tweetText: { type: 'string' },
              height: { type: 'integer' },
            },
          },
          chapters: {
            type: 'object',
            properties: {
              visibleOnLoad: { type: 'boolean' },
              chapterList: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    title: { type: 'string' },
                    time: { type: 'number' },
                    deleted: { type: 'boolean' },
                  },
                },
              },
              on: { type: 'boolean' },
            },
          },
        },
      },
      preload: {
        type: 'string',
        description:
          'Sets the video’s preload property. Possible values are metadata, auto, none, true, and false.',
      },
      qualityControl: {
        type: 'boolean',
        description:
          'If set to false, the video quality selector in the settings menu will be hidden.',
      },
      qualityMax: {
        type: 'integer',
        description: 'Specifies the maximum quality the video will play at.',
      },
      qualityMin: {
        type: 'integer',
        description: 'Specifies the minimum quality the video will play at.',
      },
      resumable: {
        type: 'string',
        description:
          'Determines if the video should resume from where the viewer left off. Options are true, false, and auto.',
      },
      seo: {
        type: 'boolean',
        description:
          'If set to true, the video’s metadata will be injected into the page’s markup for SEO.',
      },
      settingsControl: {
        type: 'boolean',
        description: 'If set to true, the settings control will be available.',
      },
      silentAutoPlay: {
        type: 'string',
        description:
          'Determines how videos handle autoplay in contexts where normal autoplay might be blocked. Options are true, allow, and false.',
      },
      smallPlayButton: { type: 'boolean' },
      stillUrl: {
        type: 'string',
        description:
          'Overrides the thumbnail image that appears before the video plays.',
      },
      time: {
        type: 'string',
        description: 'Sets the starting time of the video.',
      },
      thumbnailAltText: {
        type: 'string',
        description: 'Sets the Thumbnail Alt Text for the media.',
      },
      videoFoam: {
        description:
          'When set to true, the video will adjust its size according to its parent element. It can also be an object specifying min/max width or height.',
        anyOf: [
          { type: 'boolean', examples: [true] },
          {
            type: 'object',
            properties: {
              minWidth: {
                type: 'integer',
                description: 'Minimum width the video can be resized to.',
              },
              maxWidth: {
                type: 'integer',
                description: 'Maximum width the video can be resized to.',
              },
              minHeight: {
                type: 'integer',
                description: 'Minimum height the video can be resized to.',
              },
              maxHeight: {
                type: 'integer',
                description: 'Maximum height the video can be resized to.',
              },
            },
            description:
              'Examples:\n```json\n{\n  "minWidth": 400,\n  "maxWidth": 960\n}\n```\n```json\n{\n  "minHeight": 300,\n  "maxHeight": 450\n}\n```\n',
          },
        ],
      },
      volume: { type: 'number', description: 'Sets the volume of the video.' },
      volumeControl: {
        type: 'boolean',
        description:
          'When set to true, a volume control is available over the video.',
      },
      wmode: {
        type: 'string',
        description:
          'If set to transparent, the background behind the player will be transparent instead of black.',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The hashed ID of the video.',
          },
        },
        required: ['media-id'],
      },
    ],
  },
  response: {
    '201': {
      type: 'object',
      properties: {
        playerColor: {
          type: 'string',
          description: 'The color of the video player.',
        },
        stillUrl: { type: 'string' },
        autoPlay: {
          type: 'string',
          description: 'Whether the video should auto play or not.',
        },
        bpbTime: { type: 'string' },
        controlsVisibleOnLoad: { type: 'string' },
        endVideoBehavior: {
          type: 'string',
          description: 'Behavior of the video at the end.',
        },
        fullscreenButton: { type: 'string' },
        branding: { type: 'string' },
        playbar: { type: 'string' },
        playButton: {
          type: 'string',
          description: 'Indicates if the play button is visible.',
        },
        settingsControl: { type: 'string' },
        showCustomerLogo: { type: 'string' },
        qualityControl: { type: 'string' },
        playbackRateControl: { type: 'string' },
        smallPlayButton: { type: 'string' },
        spherical: { type: 'string' },
        volumeControl: { type: 'string' },
        copyLinkAndThumbnailEnabled: { type: 'string' },
        doNotTrack: { type: 'string' },
        email: { type: 'string' },
        fitStrategy: { type: 'string' },
        fullscreenOnRotateToLandscape: { type: 'string' },
        muted: { type: 'string' },
        playlistLinks: { type: 'string' },
        playlistLoop: { type: 'string' },
        playsinline: { type: 'string' },
        playPauseNotifier: { type: 'string' },
        playSuspendedOffScreen: { type: 'string' },
        preload: { type: 'string' },
        qualityMax: { type: 'string' },
        qualityMin: { type: 'string' },
        resumable: { type: 'string' },
        seo: { type: 'string' },
        silentAutoPlay: { type: 'string' },
        time: { type: 'string' },
        thumbnailAltText: { type: 'string' },
        videoFoam: { type: 'string' },
        volume: { type: 'string' },
        wmode: { type: 'string' },
        plugin: {
          type: 'object',
          properties: {
            passwordProtectedVideo: {
              type: 'object',
              properties: {
                on: { type: 'string' },
                src: { type: 'string' },
                challenge: { type: 'string' },
                async: { type: 'string' },
              },
            },
            videoThumbnail: {
              type: 'object',
              properties: { clickToPlayButton: { type: 'string' } },
            },
          },
        },
        private: {
          type: 'object',
          properties: {
            password_protect_on: { type: 'string' },
            show_comments: { type: 'string' },
          },
        },
        encrypted: {
          type: 'object',
          properties: { password_protect_password: { type: 'string' } },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description:
            'Error message detailing the reason for the bad request.',
          examples: ['Bad request'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const PostProjects = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the project you want to create.',
        examples: ['My New Project'],
      },
      adminEmail: {
        type: 'string',
        description:
          'The email address of the person you want to set as the owner of this project. Defaults to the Wistia Account Owner.',
        examples: ['admin@example.com'],
      },
      public: {
        oneOf: [
          {
            type: 'string',
            description:
              'A flag indicating whether or not the project is enabled for public access. Set to “1” to enable and “0” to disable.',
            enum: ['0', '1'],
          },
          {
            type: 'boolean',
            description:
              'A flag indicating whether or not the project is enabled for public access. Set to `true` to enable and `false` to disable.',
            examples: [false],
          },
        ],
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '201': {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description:
            'A unique numeric identifier for the project within the system.',
          examples: [22570],
        },
        name: {
          type: 'string',
          description: 'The project’s display name.',
          examples: ['My Project Title'],
        },
        description: {
          type: 'string',
          description: 'The project’s description.',
          examples: ['About My Project'],
        },
        mediaCount: {
          type: 'integer',
          description:
            'The number of different medias that have been uploaded to the project.',
          examples: [2],
        },
        created: {
          type: 'string',
          description: 'The date that the project was originally created.',
          format: 'date-time',
          examples: ['2010-08-13T18:47:39+00:00'],
        },
        updated: {
          type: 'string',
          description: 'The date that the project was last updated.',
          format: 'date-time',
          examples: ['2010-08-19T21:47:00+00:00'],
        },
        hashedId: {
          type: 'string',
          description:
            'A private hashed id, uniquely identifying the project within the system.',
          examples: ['4d23503f70'],
        },
        public: {
          type: 'boolean',
          description:
            'A boolean indicating whether the project is available for public (anonymous) viewing.',
          examples: [false],
        },
        publicId: {
          type: 'string',
          description:
            'If the project is public, this field contains a string representing the ID used for referencing the project in public URLs.',
          examples: ['4bD'],
        },
        anonymousCanUpload: { type: 'boolean', examples: [false] },
        anonymousCanDownload: { type: 'boolean', examples: [false] },
      },
      required: [
        'id',
        'name',
        'mediaCount',
        'created',
        'updated',
        'hashedId',
        'public',
        'publicId',
      ],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const PostProjectsIdCopyJson = {
  body: {
    type: 'object',
    properties: {
      adminEmail: {
        type: 'string',
        description:
          'The email address of the account Manager that will be the owner of the new project. Defaults to the Account Owner if invalid or omitted.',
        examples: ['admin@example.com'],
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Project Hashed ID',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '201': {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description:
            'A unique numeric identifier for the project within the system.',
          examples: [22570],
        },
        name: {
          type: 'string',
          description: 'The project’s display name.',
          examples: ['My Project Title'],
        },
        description: {
          type: 'string',
          description: 'The project’s description.',
          examples: ['About My Project'],
        },
        mediaCount: {
          type: 'integer',
          description:
            'The number of different medias that have been uploaded to the project.',
          examples: [2],
        },
        created: {
          type: 'string',
          description: 'The date that the project was originally created.',
          format: 'date-time',
          examples: ['2010-08-13T18:47:39+00:00'],
        },
        updated: {
          type: 'string',
          description: 'The date that the project was last updated.',
          format: 'date-time',
          examples: ['2010-08-19T21:47:00+00:00'],
        },
        hashedId: {
          type: 'string',
          description:
            'A private hashed id, uniquely identifying the project within the system.',
          examples: ['4d23503f70'],
        },
        public: {
          type: 'boolean',
          description:
            'A boolean indicating whether the project is available for public (anonymous) viewing.',
          examples: [false],
        },
        publicId: {
          type: 'string',
          description:
            'If the project is public, this field contains a string representing the ID used for referencing the project in public URLs.',
          examples: ['4bD'],
        },
        anonymousCanUpload: { type: 'boolean', examples: [false] },
        anonymousCanDownload: { type: 'boolean', examples: [false] },
      },
      required: [
        'id',
        'name',
        'mediaCount',
        'created',
        'updated',
        'hashedId',
        'public',
        'publicId',
      ],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const PostProjectsProjectIdSharingsJson = {
  body: {
    type: 'object',
    properties: {
      sharing: {
        type: 'object',
        properties: {
          with: {
            type: 'string',
            description:
              'The email address of the person with whom you want to share the project.',
            format: 'email',
          },
          requirePassword: {
            oneOf: [
              {
                type: 'string',
                description:
                  'Default is "1". Set to "0" to allow access without a password.',
                enum: ['0', '1'],
              },
              {
                type: 'boolean',
                description:
                  'A flag indicating whether or not a password is required.',
                examples: [false],
              },
            ],
          },
          canShare: {
            oneOf: [
              {
                type: 'string',
                description:
                  'Default is "0". Set to "1" to allow the user to share the project with others.',
                enum: ['0', '1'],
              },
              {
                type: 'boolean',
                description:
                  'Whether the user is allowed to share the project with others.',
                examples: [false],
              },
            ],
          },
          canDownload: {
            oneOf: [
              {
                type: 'string',
                description:
                  'Default is "0". Set to "1" to allow the user to download files from the project.',
                enum: ['0', '1'],
              },
              {
                type: 'boolean',
                description:
                  'Whether the user is allowed to download files from the project.',
                examples: [false],
              },
            ],
          },
          canUpload: {
            oneOf: [
              {
                type: 'string',
                description:
                  'Default is "0". Set to "1" to allow the user to upload files to the project.',
                enum: ['0', '1'],
              },
              {
                type: 'boolean',
                description:
                  'Whether the user is allowed to upload files to the project.',
                examples: [false],
              },
            ],
          },
          sendEmailNotification: {
            type: 'string',
            deprecated: true,
            description: 'Deprecated! Email notifications are always sent now.',
            enum: ['0', '1'],
          },
        },
        required: ['with'],
      },
    },
    required: ['sharing'],
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'project-id': {
            type: 'string',
            description: 'Hashed ID of the project to be shared',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['project-id'],
      },
    ],
  },
  response: {
    '201': {
      type: 'object',
      description:
        'The response includes a link for the user to access the project.',
      properties: {
        project: {
          type: 'string',
          format: 'uri',
          examples: ['http://myaccount.wistia.com/folders/13'],
        },
        sharing: {
          type: 'object',
          properties: {
            id: { type: 'integer', examples: [14] },
            isAdmin: { type: 'boolean', examples: [true] },
            canShare: { type: 'boolean', examples: [true] },
            canDownload: { type: 'boolean', examples: [true] },
            canUpload: { type: 'boolean', examples: [true] },
            share: {
              type: 'object',
              properties: {
                id: { type: 'integer', examples: [3] },
                name: { type: 'string', examples: ['Jim'] },
                type: { type: 'string', examples: ['Contact'] },
                email: {
                  type: 'string',
                  format: 'email',
                  examples: ['jim@wistia.com'],
                },
              },
            },
            project: {
              type: 'object',
              properties: {
                id: { type: 'integer', examples: [13] },
                name: { type: 'string', examples: ['My Project'] },
              },
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'array',
      items: {
        type: 'string',
        description: 'Error message detailing the reason for the bad request.',
      },
      examples: ['email@example.com is already shared on this project.'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const PostTags = {
  body: {
    type: 'object',
    properties: { name: { type: 'string' } },
    required: ['name'],
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '201': {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The tag’s display name.',
          examples: ['My tag Title'],
        },
        taggingsCount: {
          type: 'integer',
          description:
            'The number of different medias that have been associated with this tag.',
          examples: [2],
        },
        created: {
          type: 'string',
          description: 'The date that the tag was originally created.',
          format: 'date-time',
          examples: ['2010-08-13T18:47:39+00:00'],
        },
        updated: {
          type: 'string',
          description: 'The date that the tag was last updated.',
          format: 'date-time',
          examples: ['2010-08-19T21:47:00+00:00'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const PutMediasArchiveJson = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'hashed_ids[]': {
            type: 'array',
            items: { type: 'string' },
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'An array of the media hashed IDs to be archived. Each hashed ID must be passed as a separate parameter.',
          },
        },
        required: ['hashed_ids[]'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description:
            'A confirmation message that the background job has been queued.',
        },
        background_job_status: {
          type: 'object',
          description: 'Status of the background job.',
          properties: {
            id: {
              type: 'integer',
              description:
                'The ID of the background job that’s been queued for the request.',
            },
            status: {
              type: 'string',
              description:
                'The status of the background job that’s been queued for the request.\n\n`queued` `started` `finished` `failed`',
              enum: ['queued', 'started', 'finished', 'failed'],
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const PutMediasMediaHashedIdCaptionsLanguageCodeJson = {
  body: {
    type: 'object',
    properties: {
      caption_file: {
        description:
          'Either an attached SRT file or a string parameter with the contents of an SRT file.',
        type: 'string',
        format: 'binary',
      },
    },
    required: ['caption_file'],
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-hashed-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'Unique identifier for the video.',
          },
          'language-code': {
            type: 'string',
            pattern: '^[a-z]{3}$',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'Language code conforming to ISO-639-2 for which the captions should be updated.',
          },
        },
        required: ['media-hashed-id', 'language-code'],
      },
    ],
  },
} as const
const PutMediasMediaHashedIdJson = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'The media’s new name.' },
      new_still_media_id: {
        type: 'string',
        description:
          'The Wistia hashed ID of an image that will replace the still that’s displayed before the player starts playing.\n',
      },
      description: {
        type: 'string',
        description:
          'A new description for this media. Accepts plain text or markdown.',
      },
      tags: {
        type: 'array',
        description:
          'An array of tag names to apply to the media. Note that this will replace any existing tags!',
        items: { type: 'string' },
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-hashed-id': {
            type: 'string',
            description: 'The hashed ID of the media.',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['media-hashed-id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description:
            'A unique numeric identifier for the media within the system.',
        },
        name: { type: 'string', description: 'The display name of the media.' },
        type: {
          type: 'string',
          description: 'A string representing what type of media this is.',
        },
        archived: {
          type: 'boolean',
          description:
            'Whether or not the media is archived, either true or false.',
        },
        created: {
          type: 'string',
          format: 'date-time',
          description: 'The date when the media was originally uploaded.',
        },
        updated: {
          type: 'string',
          format: 'date-time',
          description: 'The date when the media was last changed.',
        },
        duration: {
          type: 'number',
          description:
            'Specifies the length (in seconds) for audio and video files. Specifies number of pages in the document. Omitted for other types of media.',
        },
        hashed_id: {
          type: 'string',
          description: 'A unique alphanumeric identifier for this media.',
        },
        description: {
          type: 'string',
          description:
            'A description for the media which usually appears near the top of the sidebar on the media’s page.',
        },
        progress: {
          type: 'number',
          description:
            'A floating point value between 0 and 1 that indicates the progress of the processing for this file.',
        },
        status: {
          type: 'string',
          description:
            'Post upload processing status. - `queued`: the file is waiting in the queue to be processed. - `processing`: the file is actively being processed. - `ready`: the file has been fully processed and is ready for embedding and viewing. - `failed`: the file was unable to be processed (usually a format or size error).\n',
        },
        thumbnail: {
          type: 'object',
          properties: {
            url: { type: 'string' },
            width: { type: 'integer' },
            height: { type: 'integer' },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const PutMediasMediaIdCustomizationsJson = {
  body: {
    type: 'object',
    properties: {
      autoPlay: {
        type: 'boolean',
        description:
          'If set to true, the video will play as soon as it’s ready. Note that autoplay might not work on some devices and browsers.',
      },
      controlsVisibleOnLoad: {
        type: 'boolean',
        description:
          'If set to true, controls like the big play button, playbar, volume, etc. will be visible as soon as the video is embedded.',
      },
      copyLinkAndThumbnailEnabled: {
        type: 'boolean',
        description:
          'If set to false, the option to “Copy Link and Thumbnail” will be removed when right-clicking on the video.',
      },
      doNotTrack: {
        type: 'boolean',
        description:
          'If set to true, data for each viewing session will not be tracked.',
      },
      email: {
        type: 'string',
        description:
          'Associate a specific email address with this video’s viewing sessions.',
      },
      endVideoBehavior: {
        type: 'string',
        description:
          'Determines what happens when the video ends. Options are default (stays on the last frame), reset (shows thumbnail and controls), and loop (plays again from the start).',
      },
      fakeFullscreen: {
        type: 'boolean',
        description:
          'If set to true, the video will try to play in a pseudo-fullscreen mode on certain mobile devices.',
      },
      fitStrategy: {
        type: 'string',
        description:
          "Resizes the video when there's a discrepancy between its aspect ratio and that of its parent container. Options are contain, cover, fill, and none.",
      },
      fullscreenButton: {
        type: 'boolean',
        description:
          'If set to true, the fullscreen button will be available as a video control.',
      },
      fullscreenOnRotateToLandscape: {
        type: 'boolean',
        description:
          'If set to false, the video will not automatically go to fullscreen mode on mobile when rotated to landscape.',
      },
      keyMoments: {
        type: 'boolean',
        description:
          'If set to false, the key moments feature will be disabled.',
      },
      muted: {
        type: 'boolean',
        description: 'If set to true, the video will start in a muted state.',
      },
      playbackRateControl: {
        type: 'boolean',
        description:
          'If set to false, the playback speed controls in the settings menu will be hidden.',
      },
      playbar: {
        type: 'boolean',
        description:
          'If set to true, the playbar will be available. If set to false, it will be hidden.',
      },
      playButton: {
        type: 'boolean',
        description: 'Indicates if the play button is visible.',
      },
      playerColor: {
        type: 'string',
        description:
          'Changes the base color of the player. Expects a hexadecimal rgb string.',
      },
      playlistLinks: {
        type: 'boolean',
        description:
          'Enables the use of specially crafted links on the page to associate with a video, turning them into a playlist.',
      },
      playlistLoop: {
        type: 'boolean',
        description:
          'If set to true and this video has a playlist, it will loop back to the first video after the last one has finished.',
      },
      playsinline: {
        type: 'boolean',
        description:
          'If set to false, videos will play within the native mobile player.',
      },
      playPauseNotifier: {
        type: 'boolean',
        description:
          'If set to false, animations for the Pause and Play symbols will be removed.',
      },
      playSuspendedOffScreen: {
        type: 'boolean',
        description:
          "If set to false for a muted autoplay video, the video won't pause when out of view.",
      },
      plugin: {
        type: 'object',
        properties: {
          videoThumbnail: {
            type: 'object',
            properties: {
              clickToPlayButton: {
                type: 'boolean',
                description:
                  'If set to false, removes the “Click to Play” button on video thumbnails.',
              },
            },
          },
          'socialbar-v1': {
            type: 'object',
            properties: {
              buttons: { type: 'string' },
              showTweetCount: { type: 'boolean' },
              tweetText: { type: 'string' },
              height: { type: 'integer' },
            },
          },
          chapters: {
            type: 'object',
            properties: {
              visibleOnLoad: { type: 'boolean' },
              chapterList: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    title: { type: 'string' },
                    time: { type: 'number' },
                    deleted: { type: 'boolean' },
                  },
                },
              },
              on: { type: 'boolean' },
            },
          },
        },
      },
      preload: {
        type: 'string',
        description:
          'Sets the video’s preload property. Possible values are metadata, auto, none, true, and false.',
      },
      qualityControl: {
        type: 'boolean',
        description:
          'If set to false, the video quality selector in the settings menu will be hidden.',
      },
      qualityMax: {
        type: 'integer',
        description: 'Specifies the maximum quality the video will play at.',
      },
      qualityMin: {
        type: 'integer',
        description: 'Specifies the minimum quality the video will play at.',
      },
      resumable: {
        type: 'string',
        description:
          'Determines if the video should resume from where the viewer left off. Options are true, false, and auto.',
      },
      seo: {
        type: 'boolean',
        description:
          'If set to true, the video’s metadata will be injected into the page’s markup for SEO.',
      },
      settingsControl: {
        type: 'boolean',
        description: 'If set to true, the settings control will be available.',
      },
      silentAutoPlay: {
        type: 'string',
        description:
          'Determines how videos handle autoplay in contexts where normal autoplay might be blocked. Options are true, allow, and false.',
      },
      smallPlayButton: { type: 'boolean' },
      stillUrl: {
        type: 'string',
        description:
          'Overrides the thumbnail image that appears before the video plays.',
      },
      time: {
        type: 'string',
        description: 'Sets the starting time of the video.',
      },
      thumbnailAltText: {
        type: 'string',
        description: 'Sets the Thumbnail Alt Text for the media.',
      },
      videoFoam: {
        description:
          'When set to true, the video will adjust its size according to its parent element. It can also be an object specifying min/max width or height.',
        anyOf: [
          { type: 'boolean', examples: [true] },
          {
            type: 'object',
            properties: {
              minWidth: {
                type: 'integer',
                description: 'Minimum width the video can be resized to.',
              },
              maxWidth: {
                type: 'integer',
                description: 'Maximum width the video can be resized to.',
              },
              minHeight: {
                type: 'integer',
                description: 'Minimum height the video can be resized to.',
              },
              maxHeight: {
                type: 'integer',
                description: 'Maximum height the video can be resized to.',
              },
            },
            description:
              'Examples:\n```json\n{\n  "minWidth": 400,\n  "maxWidth": 960\n}\n```\n```json\n{\n  "minHeight": 300,\n  "maxHeight": 450\n}\n```\n',
          },
        ],
      },
      volume: { type: 'number', description: 'Sets the volume of the video.' },
      volumeControl: {
        type: 'boolean',
        description:
          'When set to true, a volume control is available over the video.',
      },
      wmode: {
        type: 'string',
        description:
          'If set to transparent, the background behind the player will be transparent instead of black.',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'media-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The hashed ID of the video to be customized.',
          },
        },
        required: ['media-id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        playerColor: {
          type: 'string',
          description: 'The color of the video player.',
        },
        stillUrl: { type: 'string' },
        autoPlay: {
          type: 'string',
          description: 'Whether the video should auto play or not.',
        },
        bpbTime: { type: 'string' },
        controlsVisibleOnLoad: { type: 'string' },
        endVideoBehavior: {
          type: 'string',
          description: 'Behavior of the video at the end.',
        },
        fullscreenButton: { type: 'string' },
        branding: { type: 'string' },
        playbar: { type: 'string' },
        playButton: {
          type: 'string',
          description: 'Indicates if the play button is visible.',
        },
        settingsControl: { type: 'string' },
        showCustomerLogo: { type: 'string' },
        qualityControl: { type: 'string' },
        playbackRateControl: { type: 'string' },
        smallPlayButton: { type: 'string' },
        spherical: { type: 'string' },
        volumeControl: { type: 'string' },
        copyLinkAndThumbnailEnabled: { type: 'string' },
        doNotTrack: { type: 'string' },
        email: { type: 'string' },
        fitStrategy: { type: 'string' },
        fullscreenOnRotateToLandscape: { type: 'string' },
        muted: { type: 'string' },
        playlistLinks: { type: 'string' },
        playlistLoop: { type: 'string' },
        playsinline: { type: 'string' },
        playPauseNotifier: { type: 'string' },
        playSuspendedOffScreen: { type: 'string' },
        preload: { type: 'string' },
        qualityMax: { type: 'string' },
        qualityMin: { type: 'string' },
        resumable: { type: 'string' },
        seo: { type: 'string' },
        silentAutoPlay: { type: 'string' },
        time: { type: 'string' },
        thumbnailAltText: { type: 'string' },
        videoFoam: { type: 'string' },
        volume: { type: 'string' },
        wmode: { type: 'string' },
        plugin: {
          type: 'object',
          properties: {
            passwordProtectedVideo: {
              type: 'object',
              properties: {
                on: { type: 'string' },
                src: { type: 'string' },
                challenge: { type: 'string' },
                async: { type: 'string' },
              },
            },
            videoThumbnail: {
              type: 'object',
              properties: { clickToPlayButton: { type: 'string' } },
            },
          },
        },
        private: {
          type: 'object',
          properties: {
            password_protect_on: { type: 'string' },
            show_comments: { type: 'string' },
          },
        },
        encrypted: {
          type: 'object',
          properties: { password_protect_password: { type: 'string' } },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const PutMediasRestoreJson = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'hashed_ids[]': {
            type: 'array',
            items: { type: 'string' },
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'An array of the media hashed IDs to be restored. Each hashed ID must be passed as a separate parameter. The brackets [] in the hashed_ids param must be URL encoded if the param is being passed as part of the query string or if it’s being passed in the request body and the Content-Type request header is NOT application/x-www-form-urlencoded.',
          },
          project_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'The hashed ID of the project to restore the medias to. Required unless channel_id is specified.',
          },
          channel_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description:
              'The hashed ID of the channel to restore the medias to. Required unless project_id is specified.',
          },
        },
        required: ['hashed_ids[]'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description:
            'A confirmation message that the background job has been queued.',
        },
        container: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              description:
                'The type of container the medias will be restored to, either Project or Channel.',
            },
            name: {
              type: 'string',
              description:
                'The display name of the container the medias will be restored to.',
            },
            hashedId: {
              type: 'string',
              description:
                'The hashed ID of the container the medias will be restored to.',
            },
          },
        },
        background_job_status: {
          type: 'object',
          description: 'Status of the background job.',
          properties: {
            id: {
              type: 'integer',
              description:
                'The ID of the background job that’s been queued for the request.',
            },
            status: {
              type: 'string',
              description:
                'The status of the background job that’s been queued for the request.\n\n`queued` `started` `finished` `failed`',
              enum: ['queued', 'started', 'finished', 'failed'],
            },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '422': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description:
            'An error message that the necessary parameters were not provided.',
          examples: [
            'Incorrect number of parameters provided. Provide one project_id or one channel_id.',
          ],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const PutProjectsId = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The project’s new name.',
        examples: ['My New Project Name'],
      },
      description: {
        type: 'string',
        description: 'The project’s new description.',
        examples: ['My New Project Description'],
      },
      anonymousCanUpload: {
        type: 'boolean',
        description: 'Whether anonymous users can upload media to the project.',
      },
      anonymousCanDownload: {
        type: 'boolean',
        description:
          'Whether anonymous users can download media from the project.',
      },
      public: {
        oneOf: [
          {
            type: 'string',
            description:
              'A flag indicating whether or not the project is enabled for public access. Set to “1” to enable and “0” to disable.',
            enum: ['0', '1'],
          },
          {
            type: 'boolean',
            description:
              'A flag indicating whether or not the project is enabled for public access. Set to `true` to enable and `false` to disable.',
            examples: [false],
          },
        ],
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Project Hashed ID',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description:
            'A unique numeric identifier for the project within the system.',
          examples: [22570],
        },
        name: {
          type: 'string',
          description: 'The project’s display name.',
          examples: ['My Project Title'],
        },
        description: {
          type: 'string',
          description: 'The project’s description.',
          examples: ['About My Project'],
        },
        mediaCount: {
          type: 'integer',
          description:
            'The number of different medias that have been uploaded to the project.',
          examples: [2],
        },
        created: {
          type: 'string',
          description: 'The date that the project was originally created.',
          format: 'date-time',
          examples: ['2010-08-13T18:47:39+00:00'],
        },
        updated: {
          type: 'string',
          description: 'The date that the project was last updated.',
          format: 'date-time',
          examples: ['2010-08-19T21:47:00+00:00'],
        },
        hashedId: {
          type: 'string',
          description:
            'A private hashed id, uniquely identifying the project within the system.',
          examples: ['4d23503f70'],
        },
        public: {
          type: 'boolean',
          description:
            'A boolean indicating whether the project is available for public (anonymous) viewing.',
          examples: [false],
        },
        publicId: {
          type: 'string',
          description:
            'If the project is public, this field contains a string representing the ID used for referencing the project in public URLs.',
          examples: ['4bD'],
        },
        anonymousCanUpload: { type: 'boolean', examples: [false] },
        anonymousCanDownload: { type: 'boolean', examples: [false] },
      },
      required: [
        'id',
        'name',
        'mediaCount',
        'created',
        'updated',
        'hashedId',
        'public',
        'publicId',
      ],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
const PutProjectsProjectIdSharingsSharingIdJson = {
  body: {
    type: 'object',
    properties: {
      sharing: {
        type: 'object',
        properties: {
          canShare: {
            type: 'boolean',
            description:
              'Allow the user or group to share the project with others.',
          },
          canDownload: {
            type: 'boolean',
            description:
              'Allow the user or group to download media from the project.',
          },
          canUpload: {
            type: 'boolean',
            description:
              'Allow the user or group to upload media to the project.',
          },
          isAdmin: {
            type: 'boolean',
            description: 'Give this user admin rights to the project.',
          },
        },
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          'project-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'ID of the project',
          },
          'sharing-id': {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'ID of the sharing to be updated',
          },
        },
        required: ['project-id', 'sharing-id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        id: { type: 'integer', examples: [14] },
        isAdmin: { type: 'boolean', examples: [true] },
        canShare: { type: 'boolean', examples: [true] },
        canDownload: { type: 'boolean', examples: [true] },
        canUpload: { type: 'boolean', examples: [true] },
        share: {
          type: 'object',
          properties: {
            id: { type: 'integer', examples: [3] },
            name: { type: 'string', examples: ['Jim'] },
            type: { type: 'string', examples: ['Contact'] },
            email: {
              type: 'string',
              format: 'email',
              examples: ['jim@wistia.com'],
            },
          },
        },
        project: {
          type: 'object',
          properties: {
            id: { type: 'integer', examples: [13] },
            name: { type: 'string', examples: ['My Project'] },
          },
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Invalid credentials.'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          examples: ["Project with ID 'fakeid' not found."],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        error: { type: 'string', examples: ['Internal server error'] },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const
export {
  DeleteMediasMediaHashedIdCaptionsLanguageCodeJson,
  DeleteMediasMediaHashedIdJson,
  DeleteMediasMediaIdCustomizationsJson,
  DeleteProjectsId,
  DeleteProjectsProjectIdSharingsSharingIdJson,
  DeleteTagsName,
  GetAccountDetails,
  GetBackgroundJobStatusBackgroundJobStatusIdJson,
  GetChannelEpisodes,
  GetChannels,
  GetChannelsId,
  GetMedias,
  GetMediasMediaHashedIdCaptionsJson,
  GetMediasMediaHashedIdCaptionsLanguageCodeJson,
  GetMediasMediaHashedIdCaptionsLanguageCodeTxt,
  GetMediasMediaHashedIdCaptionsLanguageCodeVtt,
  GetMediasMediaHashedIdJson,
  GetMediasMediaHashedIdStatsJson,
  GetMediasMediaIdCustomizationsJson,
  GetProjects,
  GetProjectsId,
  GetProjectsProjectIdSharingsJson,
  GetProjectsProjectIdSharingsSharingIdJson,
  GetTags,
  PostMediasMediaHashedIdCaptionsJson,
  PostMediasMediaHashedIdCaptionsPurchaseJson,
  PostMediasMediaHashedIdCopyJson,
  PostMediasMediaHashedIdTrims,
  PostMediasMediaIdCustomizationsJson,
  PostProjects,
  PostProjectsIdCopyJson,
  PostProjectsProjectIdSharingsJson,
  PostTags,
  PutMediasArchiveJson,
  PutMediasMediaHashedIdCaptionsLanguageCodeJson,
  PutMediasMediaHashedIdJson,
  PutMediasMediaIdCustomizationsJson,
  PutMediasRestoreJson,
  PutProjectsId,
  PutProjectsProjectIdSharingsSharingIdJson,
}
