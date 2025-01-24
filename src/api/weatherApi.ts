import axios from 'axios'

import { Coordinates } from '../interfaces/cityData'

export const getWeatherInfo = async (city: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/weather`,
      {
        params: { city },
      },
    )

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch weather data',
      )
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}

export const getWeatherInfoByCoordinate = async ({
  latitude,
  longitude,
}: Coordinates) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/weather`,
      {
        params: {
          lat: latitude,
          lon: longitude,
        },
      },
    )

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch weather data',
      )
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
