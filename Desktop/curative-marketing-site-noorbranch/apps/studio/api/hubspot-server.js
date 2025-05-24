import { Client } from '@hubspot/api-client'

const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
})

async function handler(req, res) {
  const { formId } = req.query
  try {
    if (formId) {
      const form = await hubspotClient.marketing.forms.formsApi.getById(formId)
      res.status(200).json(form)
    } else {
      let allForms = []
      let after = undefined
      const limit = 100

      while (true) {
        const apiResponse =
          await hubspotClient.marketing.forms.formsApi.getPage(after, limit)

        const formIds = apiResponse.results.map((form) => ({
          id: form.id,
          name: form.name,
        }))
        allForms = allForms.concat(formIds)

        if (!apiResponse.paging || !apiResponse.paging.next) {
          break
        }

        after = apiResponse.paging.next.after
      }

      res.status(200).json({ formIds: allForms })
    }
  } catch (error) {
    let statusCode = 500
    let errorCode = 'INTERNAL_SERVER_ERROR'
    let errorMessage = 'An unexpected error occurred'

    if (error.statusCode === 404) {
      statusCode = 404
      errorCode = 'FORM_NOT_FOUND'
      errorMessage = 'The requested form was not found'
    } else if (error.statusCode === 401) {
      statusCode = 401
      errorCode = 'UNAUTHORIZED'
      errorMessage = 'Unauthorized access to HubSpot API'
    } else if (error.message === 'Request timeout while fetching forms') {
      statusCode = 408
      errorCode = 'REQUEST_TIMEOUT'
      errorMessage = error.message
    }

    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        error: errorMessage,
        errorCode: errorCode,
        details: error.message,
      }),
    )
  }
}

export default handler
