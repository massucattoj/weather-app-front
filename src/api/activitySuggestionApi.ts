import axios from 'axios'
import { WeatherData } from '../interfaces/weatherData'

const generateActivityPrompt = (weather: WeatherData): string => {
  const { name: city, sys, main, weather: weatherDetails } = weather
  const country = sys.country
  const temperature = main.temp
  const feelsLike = main.feels_like
  const weatherDescription = weatherDetails[0].description

  return `I'm in ${city}, ${country}. The weather is ${weatherDescription} and the temperature is ${temperature}°C. It feels like ${feelsLike}°C. What should I do in the city (give spot names)? Remember to give me just one nice suggestion!`
}

export const activitySuggestionApi = async (weather: WeatherData) => {
  const message = generateActivityPrompt(weather)

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/activity`, {
        message,
      }
    )

    return response.data
    
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching activity suggestions.')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
