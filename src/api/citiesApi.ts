import axios from 'axios'

export const searchCities = async (query: string) => {
  if (!query) return []

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/cities`,
      {
        params: {
          query,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Error fetching cities:', error)
    return []
  }
}
