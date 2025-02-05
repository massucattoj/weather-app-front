import { Cloud } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getWeatherInfo, getWeatherInfoByCoordinate } from './api/weatherApi'
import { SearchBox } from './components/SearchBox/SearchBox'
import { WeatherCard } from './components/WeatherCard/WeatherCard'
import { WeatherData } from './interfaces/weatherData'
import { activitySuggestionApi } from './api/activitySuggestionApi'

export function App() {
  const [weather, setWeather] = useState<WeatherData>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activitySuggestion, setActivitySuggestion] = useState<string | null>(null)
  const [isActivityLoading, setIsActivityLoading] = useState(false)
  const [activityError, setActivityError] = useState<string | null>(null)

  // Fetch weather based on the user's coordinates
  const getWeatherByGeolocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      setIsLoading(false)
      return
    }
  
    setIsLoading(true)
    setError(null)
  
    const handleSuccess = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords
      try {
        const weatherData = await getWeatherInfoByCoordinate({ latitude, longitude })
        setWeather(weatherData)
      } catch (error) {
        console.error('Failed to fetch weather data:', error)
        setError('Could not fetch weather data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  
    const handleError = (error: GeolocationPositionError) => {
      console.error('Geolocation error:', error)
      setError('Failed to retrieve location. Please check your settings and try again.')
      setIsLoading(false)
    }
  
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, { timeout: 10000 })
  }

  useEffect(() => {
    const fetchActivitySuggestion = async () => {
      if (weather) {
        setIsActivityLoading(true)
        setActivityError(null)
        
        try {
          const response = await activitySuggestionApi(weather)
        
          setActivitySuggestion(response)
        
        } catch (error) {
          console.error('Failed to fetch activity suggestion:', error)
          setActivityError('Could not fetch activity suggestion. Please try again.')
        } finally {
          setIsActivityLoading(false)
        }
      }
    }

    fetchActivitySuggestion()
  }, [weather])

  useEffect(() => {
    getWeatherByGeolocation()
  }, [])

  const handleCitySelect = async (cityName: string) => {
    setIsLoading(true)
    setError(null)
    setActivitySuggestion(null) // Clear previous activity suggestion

    try {
      const weatherData = await getWeatherInfo(cityName)
      setWeather(weatherData)
    } catch (error: any) {
      setError(
        error.message || 'Could not fetch weather data. Please try again.',
      )
    }

    setIsLoading(false)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-800/30 to-gray-800/30" />

      {/* Header Section */}
      <div className="relative mb-12 flex flex-col items-center text-center">
        <div className="glass-dark mb-4 rounded-full p-4">
          <Cloud className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-3xl">
          Weather Forecast
        </h1>
        <p className="mt-2 text-white/80 sm:text-lg">
          Enter a city to check the latest weather updates!
        </p>
      </div>

      <div className="z-10 w-full max-w-2xl">
        <SearchBox onCitySelect={handleCitySelect} />
      </div>

      {error && (
        <div className="glass-error mt-4 w-full max-w-2xl transform transition-all duration-500 ease-out rounded-2xl bg-red-500 p-2">
          <p className="text-center text-black-300">{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="mt-4 flex justify-center">
          <svg className="h-6 w-6 animate-spin text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"></path>
          </svg>
        </div>
      )}

      {/* Weather Card */}
      {weather && !isLoading && !error && (
        <div className="mt-12 w-full max-w-2xl transform transition-all duration-500 ease-out">
          <WeatherCard
            weather={weather}
          />
        </div>
      )}

      {isActivityLoading && (
        <div className="mt-4 flex justify-center">
          <svg className="h-6 w-6 animate-spin text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"></path>
          </svg>
        </div>
      )}

      {activitySuggestion && !isActivityLoading && !activityError && (
        <div className="glass-success mt-8 w-full max-w-2xl transform transition-all duration-500 ease-out rounded-2xl bg-green-500 p-2">
          <p className="text-center text-black-300">{activitySuggestion}</p>
        </div>
      )}
    </div>
  )
}