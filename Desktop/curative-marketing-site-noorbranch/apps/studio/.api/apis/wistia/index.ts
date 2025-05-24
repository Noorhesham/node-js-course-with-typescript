import type * as types from './types'
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas'
import APICore from 'api/dist/core'
import definition from './openapi.json'

class SDK {
  spec: Oas
  core: APICore

  constructor() {
    this.spec = Oas.init(definition)
    this.core = new APICore(this.spec, 'wistia/1.0.0 (api/6.1.1)')
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config)
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values)
    return this
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables)
  }

  /**
   * Use this endpoint to request a list of Projects in your Wistia account. This request
   * supports paging and sorting.
   *
   * @summary Project List
   * @throws FetchError<401, types.GetProjectsResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.GetProjectsResponse500> Internal server error
   */
  getProjects(
    metadata?: types.GetProjectsMetadataParam,
  ): Promise<FetchResponse<200, types.GetProjectsResponse200>> {
    return this.core.fetch('/projects', 'get', metadata)
  }

  /**
   * Create a new project. If the project is created successfully the Location HTTP header
   * will point to the new project.
   *
   * @summary Project Create
   * @throws FetchError<401, types.PostProjectsResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.PostProjectsResponse500> Internal server error
   */
  postProjects(
    body?: types.PostProjectsBodyParam,
  ): Promise<FetchResponse<201, types.PostProjectsResponse201>> {
    return this.core.fetch('/projects', 'post', body)
  }

  /**
   * Retrieve a single project. Projects#show uses pagination by default - we’ll return up to
   * the first 500 medias in a Project. If you have more than 500 medias in a Project, you’ll
   * need to add a query param, page=2 to get the second page of medias (and the third,
   * etc.). You can check how many pages you will need by looking at the media_count in your
   * first request.
   *
   *
   * @summary Project Show
   * @throws FetchError<401, types.GetProjectsIdResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.GetProjectsIdResponse404> Resource not found
   * @throws FetchError<500, types.GetProjectsIdResponse500> Internal server error
   */
  getProjectsId(
    metadata: types.GetProjectsIdMetadataParam,
  ): Promise<FetchResponse<200, types.GetProjectsIdResponse200>> {
    return this.core.fetch('/projects/{id}', 'get', metadata)
  }

  /**
   * Update a project
   *
   * @summary Project Update
   * @throws FetchError<401, types.PutProjectsIdResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.PutProjectsIdResponse404> Resource not found
   * @throws FetchError<500, types.PutProjectsIdResponse500> Internal server error
   */
  putProjectsId(
    body: types.PutProjectsIdBodyParam,
    metadata: types.PutProjectsIdMetadataParam,
  ): Promise<FetchResponse<200, types.PutProjectsIdResponse200>>
  putProjectsId(
    metadata: types.PutProjectsIdMetadataParam,
  ): Promise<FetchResponse<200, types.PutProjectsIdResponse200>>
  putProjectsId(
    body?: types.PutProjectsIdBodyParam | types.PutProjectsIdMetadataParam,
    metadata?: types.PutProjectsIdMetadataParam,
  ): Promise<FetchResponse<200, types.PutProjectsIdResponse200>> {
    return this.core.fetch('/projects/{id}', 'put', body, metadata)
  }

  /**
   * Delete a project
   *
   * @summary Project Delete
   * @throws FetchError<401, types.DeleteProjectsIdResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.DeleteProjectsIdResponse404> Resource not found
   * @throws FetchError<500, types.DeleteProjectsIdResponse500> Internal server error
   */
  deleteProjectsId(
    metadata: types.DeleteProjectsIdMetadataParam,
  ): Promise<FetchResponse<200, types.DeleteProjectsIdResponse200>> {
    return this.core.fetch('/projects/{id}', 'delete', metadata)
  }

  /**
   * This method does not copy the project’s sharing information (i.e. users that could see
   * the old project will not automatically be able to see the new one).
   * For the request you can specify the owner of a new project by passing an optional
   * parameter. The person you specify must be a Manager in the account.
   * For the response, the HTTP Location header will be set to the URL where the new project
   * resource resides. The body of the response will contain an object representing the new
   * copy of the project that was just created.
   *
   *
   * @summary Project Copy
   * @throws FetchError<401, types.PostProjectsIdCopyJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.PostProjectsIdCopyJsonResponse404> Resource not found
   * @throws FetchError<500, types.PostProjectsIdCopyJsonResponse500> Internal server error
   */
  postProjectsIdCopyJson(
    body: types.PostProjectsIdCopyJsonBodyParam,
    metadata: types.PostProjectsIdCopyJsonMetadataParam,
  ): Promise<FetchResponse<201, types.PostProjectsIdCopyJsonResponse201>>
  postProjectsIdCopyJson(
    metadata: types.PostProjectsIdCopyJsonMetadataParam,
  ): Promise<FetchResponse<201, types.PostProjectsIdCopyJsonResponse201>>
  postProjectsIdCopyJson(
    body?:
      | types.PostProjectsIdCopyJsonBodyParam
      | types.PostProjectsIdCopyJsonMetadataParam,
    metadata?: types.PostProjectsIdCopyJsonMetadataParam,
  ): Promise<FetchResponse<201, types.PostProjectsIdCopyJsonResponse201>> {
    return this.core.fetch('/projects/{id}/copy.json', 'post', body, metadata)
  }

  /**
   * A sharing is an object that links either a contact or a contact group to a project,
   * including information about the contacts' permissions to that project.
   * Retrieve a list of all sharings for a given project. Supports paging and sorting.
   *
   *
   * @summary Project Sharing List
   * @throws FetchError<401, types.GetProjectsProjectIdSharingsJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.GetProjectsProjectIdSharingsJsonResponse500> Internal server error
   */
  getProjectsProjectIdSharingsJson(
    metadata: types.GetProjectsProjectIdSharingsJsonMetadataParam,
  ): Promise<
    FetchResponse<200, types.GetProjectsProjectIdSharingsJsonResponse200>
  > {
    return this.core.fetch(
      '/projects/{project-id}/sharings.json',
      'get',
      metadata,
    )
  }

  /**
   * Create a new sharing object for a project by specifying the email of the person to share
   * with and other optional parameters.
   *
   * @summary Project Sharing Create
   * @throws FetchError<400, types.PostProjectsProjectIdSharingsJsonResponse400> Bad request
   * @throws FetchError<401, types.PostProjectsProjectIdSharingsJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.PostProjectsProjectIdSharingsJsonResponse500> Internal server error
   */
  postProjectsProjectIdSharingsJson(
    body: types.PostProjectsProjectIdSharingsJsonBodyParam,
    metadata: types.PostProjectsProjectIdSharingsJsonMetadataParam,
  ): Promise<
    FetchResponse<201, types.PostProjectsProjectIdSharingsJsonResponse201>
  > {
    return this.core.fetch(
      '/projects/{project-id}/sharings.json',
      'post',
      body,
      metadata,
    )
  }

  /**
   * Retrieve the details of a specific sharing object for a given project.
   *
   * @summary Project Sharing Show
   * @throws FetchError<401, types.GetProjectsProjectIdSharingsSharingIdJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.GetProjectsProjectIdSharingsSharingIdJsonResponse404> Resource not found
   * @throws FetchError<500, types.GetProjectsProjectIdSharingsSharingIdJsonResponse500> Internal server error
   */
  getProjectsProjectIdSharingsSharingIdJson(
    metadata: types.GetProjectsProjectIdSharingsSharingIdJsonMetadataParam,
  ): Promise<
    FetchResponse<
      200,
      types.GetProjectsProjectIdSharingsSharingIdJsonResponse200
    >
  > {
    return this.core.fetch(
      '/projects/{project-id}/sharings/{sharing-id}.json',
      'get',
      metadata,
    )
  }

  /**
   * Update a sharing on a project
   *
   * @summary Project Sharing Update
   * @throws FetchError<401, types.PutProjectsProjectIdSharingsSharingIdJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.PutProjectsProjectIdSharingsSharingIdJsonResponse404> Resource not found
   * @throws FetchError<500, types.PutProjectsProjectIdSharingsSharingIdJsonResponse500> Internal server error
   */
  putProjectsProjectIdSharingsSharingIdJson(
    body: types.PutProjectsProjectIdSharingsSharingIdJsonBodyParam,
    metadata: types.PutProjectsProjectIdSharingsSharingIdJsonMetadataParam,
  ): Promise<
    FetchResponse<
      200,
      types.PutProjectsProjectIdSharingsSharingIdJsonResponse200
    >
  > {
    return this.core.fetch(
      '/projects/{project-id}/sharings/{sharing-id}.json',
      'put',
      body,
      metadata,
    )
  }

  /**
   * Delete a sharing on a project
   *
   * @summary Project Sharing Delete
   * @throws FetchError<401, types.DeleteProjectsProjectIdSharingsSharingIdJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.DeleteProjectsProjectIdSharingsSharingIdJsonResponse404> Resource not found
   * @throws FetchError<500, types.DeleteProjectsProjectIdSharingsSharingIdJsonResponse500> Internal server error
   */
  deleteProjectsProjectIdSharingsSharingIdJson(
    metadata: types.DeleteProjectsProjectIdSharingsSharingIdJsonMetadataParam,
  ): Promise<
    FetchResponse<
      200,
      types.DeleteProjectsProjectIdSharingsSharingIdJsonResponse200
    >
  > {
    return this.core.fetch(
      '/projects/{project-id}/sharings/{sharing-id}.json',
      'delete',
      metadata,
    )
  }

  /**
   * Obtain a list of all the media in your account. For accounts with more than 100 media,
   * you’ll want to page and sort the returned list.
   *
   *
   * @summary Media List
   * @throws FetchError<401, types.GetMediasResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.GetMediasResponse500> Internal server error
   */
  getMedias(
    metadata?: types.GetMediasMetadataParam,
  ): Promise<FetchResponse<200, types.GetMediasResponse200>> {
    return this.core.fetch('/medias', 'get', metadata)
  }

  /**
   * Get information about a specific piece of media. Fetch detailed information about a
   * specific piece of media you’ve uploaded to your account using its hashed_id.
   *
   * CDN-backed medias are accessible using this url structure:
   * https://fast.wistia.com/embed/medias/{hashed_id}.m3u8.
   * For more information, see https://docs.wistia.com/docs/asset-urls#getting-hls-assets.
   *
   *
   * @summary Media Show
   * @throws FetchError<401, types.GetMediasMediaHashedIdJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.GetMediasMediaHashedIdJsonResponse404> Resource not found
   * @throws FetchError<500, types.GetMediasMediaHashedIdJsonResponse500> Internal server error
   */
  getMediasMediaHashedIdJson(
    metadata: types.GetMediasMediaHashedIdJsonMetadataParam,
  ): Promise<FetchResponse<200, types.GetMediasMediaHashedIdJsonResponse200>> {
    return this.core.fetch('/medias/{media-hashed-id}.json', 'get', metadata)
  }

  /**
   * Update attributes on a media.
   *
   * @summary Media Update
   * @throws FetchError<401, types.PutMediasMediaHashedIdJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.PutMediasMediaHashedIdJsonResponse404> Resource not found
   * @throws FetchError<500, types.PutMediasMediaHashedIdJsonResponse500> Internal server error
   */
  putMediasMediaHashedIdJson(
    body: types.PutMediasMediaHashedIdJsonBodyParam,
    metadata: types.PutMediasMediaHashedIdJsonMetadataParam,
  ): Promise<FetchResponse<200, types.PutMediasMediaHashedIdJsonResponse200>> {
    return this.core.fetch(
      '/medias/{media-hashed-id}.json',
      'put',
      body,
      metadata,
    )
  }

  /**
   * Delete a media.
   *
   * @summary Media Delete
   * @throws FetchError<401, types.DeleteMediasMediaHashedIdJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.DeleteMediasMediaHashedIdJsonResponse404> Resource not found
   * @throws FetchError<500, types.DeleteMediasMediaHashedIdJsonResponse500> Internal server error
   */
  deleteMediasMediaHashedIdJson(
    metadata: types.DeleteMediasMediaHashedIdJsonMetadataParam,
  ): Promise<
    FetchResponse<200, types.DeleteMediasMediaHashedIdJsonResponse200>
  > {
    return this.core.fetch('/medias/{media-hashed-id}.json', 'delete', metadata)
  }

  /**
   * Copy a media.
   *
   * @summary Media Copy
   */
  postMediasMediaHashedIdCopyJson(
    body: types.PostMediasMediaHashedIdCopyJsonBodyParam,
    metadata: types.PostMediasMediaHashedIdCopyJsonMetadataParam,
  ): Promise<
    FetchResponse<201, types.PostMediasMediaHashedIdCopyJsonResponse201>
  >
  postMediasMediaHashedIdCopyJson(
    metadata: types.PostMediasMediaHashedIdCopyJsonMetadataParam,
  ): Promise<
    FetchResponse<201, types.PostMediasMediaHashedIdCopyJsonResponse201>
  >
  postMediasMediaHashedIdCopyJson(
    body?:
      | types.PostMediasMediaHashedIdCopyJsonBodyParam
      | types.PostMediasMediaHashedIdCopyJsonMetadataParam,
    metadata?: types.PostMediasMediaHashedIdCopyJsonMetadataParam,
  ): Promise<
    FetchResponse<201, types.PostMediasMediaHashedIdCopyJsonResponse201>
  > {
    return this.core.fetch(
      '/medias/{media-hashed-id}/copy.json',
      'post',
      body,
      metadata,
    )
  }

  /**
   * Aggregated tracking statistics for a video embedded on your site.
   *
   * @summary Media Stats
   * @throws FetchError<400, types.GetMediasMediaHashedIdStatsJsonResponse400> Bad request
   * @throws FetchError<401, types.GetMediasMediaHashedIdStatsJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.GetMediasMediaHashedIdStatsJsonResponse404> Resource not found
   * @throws FetchError<500, types.GetMediasMediaHashedIdStatsJsonResponse500> Internal server error
   */
  getMediasMediaHashedIdStatsJson(
    metadata: types.GetMediasMediaHashedIdStatsJsonMetadataParam,
  ): Promise<
    FetchResponse<200, types.GetMediasMediaHashedIdStatsJsonResponse200>
  > {
    return this.core.fetch(
      '/medias/{media-hashed-id}/stats.json',
      'get',
      metadata,
    )
  }

  /**
   * This method accepts a list of up to 100 medias to archive per request. It processes
   * requests asynchronously and will return a background_job_status object rather than the
   * typical Media response object. Note that Livestream medias and Soapbox videos imported
   * to Wistia before September 1, 2023 cannot be archived.
   *
   *
   * @summary Medias Archive
   * @throws FetchError<401, types.PutMediasArchiveJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.PutMediasArchiveJsonResponse404> Resource not found
   * @throws FetchError<500, types.PutMediasArchiveJsonResponse500> Internal server error
   */
  putMediasArchiveJson(
    metadata: types.PutMediasArchiveJsonMetadataParam,
  ): Promise<FetchResponse<200, types.PutMediasArchiveJsonResponse200>> {
    return this.core.fetch('/medias/archive.json', 'put', metadata)
  }

  /**
   * Restore archived medias to your account. This method accepts a list of up to 100 medias
   * to restore per request. It processes requests asynchronously and will return a
   * background_job_status object rather than the typical Media response object. Your account
   * must have access to the Archiving feature to use this method.
   *
   *
   * @summary Media Restore
   * @throws FetchError<401, types.PutMediasRestoreJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.PutMediasRestoreJsonResponse404> Resource not found
   * @throws FetchError<422, types.PutMediasRestoreJsonResponse422> Missing arguments for restoration of media.
   * @throws FetchError<500, types.PutMediasRestoreJsonResponse500> Internal server error
   */
  putMediasRestoreJson(
    metadata: types.PutMediasRestoreJsonMetadataParam,
  ): Promise<FetchResponse<200, types.PutMediasRestoreJsonResponse200>> {
    return this.core.fetch('/medias/restore.json', 'put', metadata)
  }

  /**
   * Retrieve account details.
   *
   * @summary Account Show
   * @throws FetchError<401, types.GetAccountDetailsResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.GetAccountDetailsResponse500> Internal server error
   */
  getAccountDetails(): Promise<
    FetchResponse<200, types.GetAccountDetailsResponse200>
  > {
    return this.core.fetch('/account.json', 'get')
  }

  /**
   * Retrieve the status of a background job.
   *
   * @summary Background Job Status Show
   * @throws FetchError<401, types.GetBackgroundJobStatusBackgroundJobStatusIdJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<403, types.GetBackgroundJobStatusBackgroundJobStatusIdJsonResponse403> Background Job Status Not Associated with An Authorized Object
   * @throws FetchError<404, types.GetBackgroundJobStatusBackgroundJobStatusIdJsonResponse404> Resource not found
   * @throws FetchError<500, types.GetBackgroundJobStatusBackgroundJobStatusIdJsonResponse500> Internal server error
   */
  getBackground_job_statusBackgroundJobStatusIdJson(
    metadata: types.GetBackgroundJobStatusBackgroundJobStatusIdJsonMetadataParam,
  ): Promise<
    FetchResponse<
      200,
      types.GetBackgroundJobStatusBackgroundJobStatusIdJsonResponse200
    >
  > {
    return this.core.fetch(
      '/background_job_status/{background-job-status-id}.json',
      'get',
      metadata,
    )
  }

  /**
   * Fetches explicitly defined customizations for the video.
   *
   * @summary Customizations Show
   * @throws FetchError<401, types.GetMediasMediaIdCustomizationsJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.GetMediasMediaIdCustomizationsJsonResponse404> Resource not found
   * @throws FetchError<500, types.GetMediasMediaIdCustomizationsJsonResponse500> Internal server error
   */
  getMediasMediaIdCustomizationsJson(
    metadata: types.GetMediasMediaIdCustomizationsJsonMetadataParam,
  ): Promise<
    FetchResponse<200, types.GetMediasMediaIdCustomizationsJsonResponse200>
  > {
    return this.core.fetch(
      '/medias/{media-id}/customizations.json',
      'get',
      metadata,
    )
  }

  /**
   * Set customizations for a video. Replaces the customizations explicitly set for this
   * video.
   *
   * @summary Customizations Create
   * @throws FetchError<400, types.PostMediasMediaIdCustomizationsJsonResponse400> Bad request
   * @throws FetchError<401, types.PostMediasMediaIdCustomizationsJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.PostMediasMediaIdCustomizationsJsonResponse500> Internal server error
   */
  postMediasMediaIdCustomizationsJson(
    body: types.PostMediasMediaIdCustomizationsJsonBodyParam,
    metadata: types.PostMediasMediaIdCustomizationsJsonMetadataParam,
  ): Promise<
    FetchResponse<201, types.PostMediasMediaIdCustomizationsJsonResponse201>
  > {
    return this.core.fetch(
      '/medias/{media-id}/customizations.json',
      'post',
      body,
      metadata,
    )
  }

  /**
   * Allows for partial updates on a video’s customizations. If a value is null, then that
   * key will be deleted from the saved customizations. If it is not null, that value will be
   * set.
   *
   * @summary Customizations Update
   * @throws FetchError<401, types.PutMediasMediaIdCustomizationsJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.PutMediasMediaIdCustomizationsJsonResponse404> Resource not found
   * @throws FetchError<500, types.PutMediasMediaIdCustomizationsJsonResponse500> Internal server error
   */
  putMediasMediaIdCustomizationsJson(
    body: types.PutMediasMediaIdCustomizationsJsonBodyParam,
    metadata: types.PutMediasMediaIdCustomizationsJsonMetadataParam,
  ): Promise<
    FetchResponse<200, types.PutMediasMediaIdCustomizationsJsonResponse200>
  > {
    return this.core.fetch(
      '/medias/{media-id}/customizations.json',
      'put',
      body,
      metadata,
    )
  }

  /**
   * Deletes all explicit customizations for a video, making it act as if it has never been
   * customized.
   *
   * @summary Customizations Delete
   * @throws FetchError<401, types.DeleteMediasMediaIdCustomizationsJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.DeleteMediasMediaIdCustomizationsJsonResponse404> Resource not found
   * @throws FetchError<500, types.DeleteMediasMediaIdCustomizationsJsonResponse500> Internal server error
   */
  deleteMediasMediaIdCustomizationsJson(
    metadata: types.DeleteMediasMediaIdCustomizationsJsonMetadataParam,
  ): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch(
      '/medias/{media-id}/customizations.json',
      'delete',
      metadata,
    )
  }

  /**
   * Returns all the captions associated with a specified video.
   * If captions do not exist for this video, the response will be an empty JSON array.
   * If this video does not exist, the response will be an empty HTTP 404 Not Found.
   *
   *
   * @summary Captions List
   * @throws FetchError<401, types.GetMediasMediaHashedIdCaptionsJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.GetMediasMediaHashedIdCaptionsJsonResponse500> Internal server error
   */
  getMediasMediaHashedIdCaptionsJson(
    metadata: types.GetMediasMediaHashedIdCaptionsJsonMetadataParam,
  ): Promise<
    FetchResponse<200, types.GetMediasMediaHashedIdCaptionsJsonResponse200>
  > {
    return this.core.fetch(
      '/medias/{media-hashed-id}/captions.json',
      'get',
      metadata,
    )
  }

  /**
   * Adds captions to a specified video by providing an SRT file or its contents directly.
   *
   * @summary Captions Create
   */
  postMediasMediaHashedIdCaptionsJson(
    body: types.PostMediasMediaHashedIdCaptionsJsonBodyParam,
    metadata: types.PostMediasMediaHashedIdCaptionsJsonMetadataParam,
  ): Promise<FetchResponse<number, unknown>>
  postMediasMediaHashedIdCaptionsJson(
    metadata: types.PostMediasMediaHashedIdCaptionsJsonMetadataParam,
  ): Promise<FetchResponse<number, unknown>>
  postMediasMediaHashedIdCaptionsJson(
    body?:
      | types.PostMediasMediaHashedIdCaptionsJsonBodyParam
      | types.PostMediasMediaHashedIdCaptionsJsonMetadataParam,
    metadata?: types.PostMediasMediaHashedIdCaptionsJsonMetadataParam,
  ): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch(
      '/medias/{media-hashed-id}/captions.json',
      'post',
      body,
      metadata,
    )
  }

  /**
   * Returns a video's captions in the specified language and in SRT format.
   *
   * @summary Captions Show SRT
   * @throws FetchError<401, types.GetMediasMediaHashedIdCaptionsLanguageCodeJsonResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.GetMediasMediaHashedIdCaptionsLanguageCodeJsonResponse500> Internal server error
   */
  getMediasMediaHashedIdCaptionsLanguageCodeJson(
    metadata: types.GetMediasMediaHashedIdCaptionsLanguageCodeJsonMetadataParam,
  ): Promise<
    FetchResponse<
      200,
      types.GetMediasMediaHashedIdCaptionsLanguageCodeJsonResponse200
    >
  > {
    return this.core.fetch(
      '/medias/{media-hashed-id}/captions/{language-code}.json',
      'get',
      metadata,
    )
  }

  /**
   * This method is for replacing the captions on a video for the specified language.
   *
   * @summary Captions Update
   */
  putMediasMediaHashedIdCaptionsLanguageCodeJson(
    body: types.PutMediasMediaHashedIdCaptionsLanguageCodeJsonBodyParam,
    metadata: types.PutMediasMediaHashedIdCaptionsLanguageCodeJsonMetadataParam,
  ): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch(
      '/medias/{media-hashed-id}/captions/{language-code}.json',
      'put',
      body,
      metadata,
    )
  }

  /**
   * This method is for removing the captions file from a video for the specified language.
   *
   * @summary Captions Delete
   */
  deleteMediasMediaHashedIdCaptionsLanguageCodeJson(
    metadata: types.DeleteMediasMediaHashedIdCaptionsLanguageCodeJsonMetadataParam,
  ): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch(
      '/medias/{media-hashed-id}/captions/{language-code}.json',
      'delete',
      metadata,
    )
  }

  /**
   * Returns a video's captions in the specified language and in VTT format.
   *
   * @summary Captions Show VTT
   * @throws FetchError<401, types.GetMediasMediaHashedIdCaptionsLanguageCodeVttResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.GetMediasMediaHashedIdCaptionsLanguageCodeVttResponse500> Internal server error
   */
  getMediasMediaHashedIdCaptionsLanguageCodeVtt(
    metadata: types.GetMediasMediaHashedIdCaptionsLanguageCodeVttMetadataParam,
  ): Promise<
    FetchResponse<
      200,
      types.GetMediasMediaHashedIdCaptionsLanguageCodeVttResponse200
    >
  > {
    return this.core.fetch(
      '/medias/{media-hashed-id}/captions/{language-code}.vtt',
      'get',
      metadata,
    )
  }

  /**
   * Returns a video's captions in the specified language and in TXT format.
   *
   * @summary Captions Show TXT
   * @throws FetchError<401, types.GetMediasMediaHashedIdCaptionsLanguageCodeTxtResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.GetMediasMediaHashedIdCaptionsLanguageCodeTxtResponse500> Internal server error
   */
  getMediasMediaHashedIdCaptionsLanguageCodeTxt(
    metadata: types.GetMediasMediaHashedIdCaptionsLanguageCodeTxtMetadataParam,
  ): Promise<
    FetchResponse<
      200,
      types.GetMediasMediaHashedIdCaptionsLanguageCodeTxtResponse200
    >
  > {
    return this.core.fetch(
      '/medias/{media-hashed-id}/captions/{language-code}.txt',
      'get',
      metadata,
    )
  }

  /**
   * This method is for purchasing English captions for a video. The request will charge the
   * credit card on the account if successful. A saved credit card is required to use this
   * endpoint.
   *
   * @summary Captions Purchase
   */
  postMediasMediaHashedIdCaptionsPurchaseJson(
    body: types.PostMediasMediaHashedIdCaptionsPurchaseJsonBodyParam,
    metadata: types.PostMediasMediaHashedIdCaptionsPurchaseJsonMetadataParam,
  ): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch(
      '/medias/{media-hashed-id}/captions/purchase.json',
      'post',
      body,
      metadata,
    )
  }

  /**
   * Creates a new media that trims off parts of an existing media
   *
   * @summary Trims Create
   * @throws FetchError<401, types.PostMediasMediaHashedIdTrimsResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<422, types.PostMediasMediaHashedIdTrimsResponse422> Unprocessible entity, parameters provided were invalid.
   * @throws FetchError<500, types.PostMediasMediaHashedIdTrimsResponse500> Internal server error
   */
  postMediasMediaHashedIdTrims(
    body: types.PostMediasMediaHashedIdTrimsBodyParam,
    metadata: types.PostMediasMediaHashedIdTrimsMetadataParam,
  ): Promise<
    FetchResponse<200, types.PostMediasMediaHashedIdTrimsResponse200>
  > {
    return this.core.fetch(
      '/medias/{media-hashed-id}/trims',
      'post',
      body,
      metadata,
    )
  }

  /**
   * Use this endpoint to request a list of Tags in your Wistia account. This request
   * supports paging and sorting.
   *
   * @summary Tags List
   * @throws FetchError<401, types.GetTagsResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.GetTagsResponse500> Internal server error
   */
  getTags(
    metadata?: types.GetTagsMetadataParam,
  ): Promise<FetchResponse<200, types.GetTagsResponse200>> {
    return this.core.fetch('/tags', 'get', metadata)
  }

  /**
   * Create a new tag.
   *
   * @summary Tags Create
   * @throws FetchError<401, types.PostTagsResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.PostTagsResponse500> Internal server error
   */
  postTags(
    body: types.PostTagsBodyParam,
  ): Promise<FetchResponse<201, types.PostTagsResponse201>> {
    return this.core.fetch('/tags', 'post', body)
  }

  /**
   * Delete a tag
   *
   * @summary Tags Delete
   * @throws FetchError<401, types.DeleteTagsNameResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<404, types.DeleteTagsNameResponse404> Resource not found
   * @throws FetchError<500, types.DeleteTagsNameResponse500> Internal server error
   */
  deleteTagsName(
    metadata: types.DeleteTagsNameMetadataParam,
  ): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/tags/{name}', 'delete', metadata)
  }

  /**
   * Returns all the Channels associated with the account.
   *
   *
   * @summary Channels List
   * @throws FetchError<401, types.GetChannelsResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.GetChannelsResponse500> Internal server error
   */
  getChannels(
    metadata?: types.GetChannelsMetadataParam,
  ): Promise<FetchResponse<200, types.GetChannelsResponse200>> {
    return this.core.fetch('/channels', 'get', metadata)
  }

  /**
   * Returns the Channel associated with the hashedId.
   *
   *
   * @summary Channels Show
   * @throws FetchError<401, types.GetChannelsIdResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.GetChannelsIdResponse500> Internal server error
   */
  getChannelsId(
    metadata: types.GetChannelsIdMetadataParam,
  ): Promise<FetchResponse<200, types.GetChannelsIdResponse200>> {
    return this.core.fetch('/channels/{id}', 'get', metadata)
  }

  /**
   * Returns all the Channel Episodes associated with the account, and allows for filtering
   * by a particular channel.
   *
   *
   * @summary Channel Episodes List
   * @throws FetchError<401, types.GetChannelEpisodesResponse401> Unauthorized, invalid or missing token
   * @throws FetchError<500, types.GetChannelEpisodesResponse500> Internal server error
   */
  getChannel_episodes(
    metadata?: types.GetChannelEpisodesMetadataParam,
  ): Promise<FetchResponse<200, types.GetChannelEpisodesResponse200>> {
    return this.core.fetch('/channel_episodes', 'get', metadata)
  }
}

const createSDK = (() => {
  return new SDK()
})()
export default createSDK

export type {
  DeleteMediasMediaHashedIdCaptionsLanguageCodeJsonMetadataParam,
  DeleteMediasMediaHashedIdJsonMetadataParam,
  DeleteMediasMediaHashedIdJsonResponse200,
  DeleteMediasMediaHashedIdJsonResponse401,
  DeleteMediasMediaHashedIdJsonResponse404,
  DeleteMediasMediaHashedIdJsonResponse500,
  DeleteMediasMediaIdCustomizationsJsonMetadataParam,
  DeleteMediasMediaIdCustomizationsJsonResponse401,
  DeleteMediasMediaIdCustomizationsJsonResponse404,
  DeleteMediasMediaIdCustomizationsJsonResponse500,
  DeleteProjectsIdMetadataParam,
  DeleteProjectsIdResponse200,
  DeleteProjectsIdResponse401,
  DeleteProjectsIdResponse404,
  DeleteProjectsIdResponse500,
  DeleteProjectsProjectIdSharingsSharingIdJsonMetadataParam,
  DeleteProjectsProjectIdSharingsSharingIdJsonResponse200,
  DeleteProjectsProjectIdSharingsSharingIdJsonResponse401,
  DeleteProjectsProjectIdSharingsSharingIdJsonResponse404,
  DeleteProjectsProjectIdSharingsSharingIdJsonResponse500,
  DeleteTagsNameMetadataParam,
  DeleteTagsNameResponse401,
  DeleteTagsNameResponse404,
  DeleteTagsNameResponse500,
  GetAccountDetailsResponse200,
  GetAccountDetailsResponse401,
  GetAccountDetailsResponse500,
  GetBackgroundJobStatusBackgroundJobStatusIdJsonMetadataParam,
  GetBackgroundJobStatusBackgroundJobStatusIdJsonResponse200,
  GetBackgroundJobStatusBackgroundJobStatusIdJsonResponse401,
  GetBackgroundJobStatusBackgroundJobStatusIdJsonResponse403,
  GetBackgroundJobStatusBackgroundJobStatusIdJsonResponse404,
  GetBackgroundJobStatusBackgroundJobStatusIdJsonResponse500,
  GetChannelEpisodesMetadataParam,
  GetChannelEpisodesResponse200,
  GetChannelEpisodesResponse401,
  GetChannelEpisodesResponse500,
  GetChannelsIdMetadataParam,
  GetChannelsIdResponse200,
  GetChannelsIdResponse401,
  GetChannelsIdResponse500,
  GetChannelsMetadataParam,
  GetChannelsResponse200,
  GetChannelsResponse401,
  GetChannelsResponse500,
  GetMediasMediaHashedIdCaptionsJsonMetadataParam,
  GetMediasMediaHashedIdCaptionsJsonResponse200,
  GetMediasMediaHashedIdCaptionsJsonResponse401,
  GetMediasMediaHashedIdCaptionsJsonResponse500,
  GetMediasMediaHashedIdCaptionsLanguageCodeJsonMetadataParam,
  GetMediasMediaHashedIdCaptionsLanguageCodeJsonResponse200,
  GetMediasMediaHashedIdCaptionsLanguageCodeJsonResponse401,
  GetMediasMediaHashedIdCaptionsLanguageCodeJsonResponse500,
  GetMediasMediaHashedIdCaptionsLanguageCodeTxtMetadataParam,
  GetMediasMediaHashedIdCaptionsLanguageCodeTxtResponse200,
  GetMediasMediaHashedIdCaptionsLanguageCodeTxtResponse401,
  GetMediasMediaHashedIdCaptionsLanguageCodeTxtResponse500,
  GetMediasMediaHashedIdCaptionsLanguageCodeVttMetadataParam,
  GetMediasMediaHashedIdCaptionsLanguageCodeVttResponse200,
  GetMediasMediaHashedIdCaptionsLanguageCodeVttResponse401,
  GetMediasMediaHashedIdCaptionsLanguageCodeVttResponse500,
  GetMediasMediaHashedIdJsonMetadataParam,
  GetMediasMediaHashedIdJsonResponse200,
  GetMediasMediaHashedIdJsonResponse401,
  GetMediasMediaHashedIdJsonResponse404,
  GetMediasMediaHashedIdJsonResponse500,
  GetMediasMediaHashedIdStatsJsonMetadataParam,
  GetMediasMediaHashedIdStatsJsonResponse200,
  GetMediasMediaHashedIdStatsJsonResponse400,
  GetMediasMediaHashedIdStatsJsonResponse401,
  GetMediasMediaHashedIdStatsJsonResponse404,
  GetMediasMediaHashedIdStatsJsonResponse500,
  GetMediasMediaIdCustomizationsJsonMetadataParam,
  GetMediasMediaIdCustomizationsJsonResponse200,
  GetMediasMediaIdCustomizationsJsonResponse401,
  GetMediasMediaIdCustomizationsJsonResponse404,
  GetMediasMediaIdCustomizationsJsonResponse500,
  GetMediasMetadataParam,
  GetMediasResponse200,
  GetMediasResponse401,
  GetMediasResponse500,
  GetProjectsIdMetadataParam,
  GetProjectsIdResponse200,
  GetProjectsIdResponse401,
  GetProjectsIdResponse404,
  GetProjectsIdResponse500,
  GetProjectsMetadataParam,
  GetProjectsProjectIdSharingsJsonMetadataParam,
  GetProjectsProjectIdSharingsJsonResponse200,
  GetProjectsProjectIdSharingsJsonResponse401,
  GetProjectsProjectIdSharingsJsonResponse500,
  GetProjectsProjectIdSharingsSharingIdJsonMetadataParam,
  GetProjectsProjectIdSharingsSharingIdJsonResponse200,
  GetProjectsProjectIdSharingsSharingIdJsonResponse401,
  GetProjectsProjectIdSharingsSharingIdJsonResponse404,
  GetProjectsProjectIdSharingsSharingIdJsonResponse500,
  GetProjectsResponse200,
  GetProjectsResponse401,
  GetProjectsResponse500,
  GetTagsMetadataParam,
  GetTagsResponse200,
  GetTagsResponse401,
  GetTagsResponse500,
  PostMediasMediaHashedIdCaptionsJsonBodyParam,
  PostMediasMediaHashedIdCaptionsJsonMetadataParam,
  PostMediasMediaHashedIdCaptionsPurchaseJsonBodyParam,
  PostMediasMediaHashedIdCaptionsPurchaseJsonMetadataParam,
  PostMediasMediaHashedIdCopyJsonBodyParam,
  PostMediasMediaHashedIdCopyJsonMetadataParam,
  PostMediasMediaHashedIdCopyJsonResponse201,
  PostMediasMediaHashedIdTrimsBodyParam,
  PostMediasMediaHashedIdTrimsMetadataParam,
  PostMediasMediaHashedIdTrimsResponse200,
  PostMediasMediaHashedIdTrimsResponse401,
  PostMediasMediaHashedIdTrimsResponse422,
  PostMediasMediaHashedIdTrimsResponse500,
  PostMediasMediaIdCustomizationsJsonBodyParam,
  PostMediasMediaIdCustomizationsJsonMetadataParam,
  PostMediasMediaIdCustomizationsJsonResponse201,
  PostMediasMediaIdCustomizationsJsonResponse400,
  PostMediasMediaIdCustomizationsJsonResponse401,
  PostMediasMediaIdCustomizationsJsonResponse500,
  PostProjectsBodyParam,
  PostProjectsIdCopyJsonBodyParam,
  PostProjectsIdCopyJsonMetadataParam,
  PostProjectsIdCopyJsonResponse201,
  PostProjectsIdCopyJsonResponse401,
  PostProjectsIdCopyJsonResponse404,
  PostProjectsIdCopyJsonResponse500,
  PostProjectsProjectIdSharingsJsonBodyParam,
  PostProjectsProjectIdSharingsJsonMetadataParam,
  PostProjectsProjectIdSharingsJsonResponse201,
  PostProjectsProjectIdSharingsJsonResponse400,
  PostProjectsProjectIdSharingsJsonResponse401,
  PostProjectsProjectIdSharingsJsonResponse500,
  PostProjectsResponse201,
  PostProjectsResponse401,
  PostProjectsResponse500,
  PostTagsBodyParam,
  PostTagsResponse201,
  PostTagsResponse401,
  PostTagsResponse500,
  PutMediasArchiveJsonMetadataParam,
  PutMediasArchiveJsonResponse200,
  PutMediasArchiveJsonResponse401,
  PutMediasArchiveJsonResponse404,
  PutMediasArchiveJsonResponse500,
  PutMediasMediaHashedIdCaptionsLanguageCodeJsonBodyParam,
  PutMediasMediaHashedIdCaptionsLanguageCodeJsonMetadataParam,
  PutMediasMediaHashedIdJsonBodyParam,
  PutMediasMediaHashedIdJsonMetadataParam,
  PutMediasMediaHashedIdJsonResponse200,
  PutMediasMediaHashedIdJsonResponse401,
  PutMediasMediaHashedIdJsonResponse404,
  PutMediasMediaHashedIdJsonResponse500,
  PutMediasMediaIdCustomizationsJsonBodyParam,
  PutMediasMediaIdCustomizationsJsonMetadataParam,
  PutMediasMediaIdCustomizationsJsonResponse200,
  PutMediasMediaIdCustomizationsJsonResponse401,
  PutMediasMediaIdCustomizationsJsonResponse404,
  PutMediasMediaIdCustomizationsJsonResponse500,
  PutMediasRestoreJsonMetadataParam,
  PutMediasRestoreJsonResponse200,
  PutMediasRestoreJsonResponse401,
  PutMediasRestoreJsonResponse404,
  PutMediasRestoreJsonResponse422,
  PutMediasRestoreJsonResponse500,
  PutProjectsIdBodyParam,
  PutProjectsIdMetadataParam,
  PutProjectsIdResponse200,
  PutProjectsIdResponse401,
  PutProjectsIdResponse404,
  PutProjectsIdResponse500,
  PutProjectsProjectIdSharingsSharingIdJsonBodyParam,
  PutProjectsProjectIdSharingsSharingIdJsonMetadataParam,
  PutProjectsProjectIdSharingsSharingIdJsonResponse200,
  PutProjectsProjectIdSharingsSharingIdJsonResponse401,
  PutProjectsProjectIdSharingsSharingIdJsonResponse404,
  PutProjectsProjectIdSharingsSharingIdJsonResponse500,
} from './types'
