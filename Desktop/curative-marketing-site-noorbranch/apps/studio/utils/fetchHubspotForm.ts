export const getAllFormData = async () => {
  try {
    const response = await fetch(`/api/hubspot-server`)
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export const getFormData = async (formId: string) => {
  try {
    const response = await fetch(`/api/hubspot-server?formId=${formId}`)
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
