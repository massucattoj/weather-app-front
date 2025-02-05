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
    const openAiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAPI_KEY}`,
        },
      },
    )

    return openAiResponse.data.choices?.[0]?.message?.content?.trim() || 'No suggestion available'

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error fetching cities.')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}
