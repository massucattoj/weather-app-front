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
      }
    )

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching cities.')
    }
    throw new Error('An unexpected error occurred')
  }
}
