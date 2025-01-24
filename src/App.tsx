import { Cloud } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getWeatherInfo, getWeatherInfoByCoordinate } from './api/weatherApi'
import { SearchBox } from './components/SearchBox'
import { WeatherCard } from './components/WeatherCard'
import { WeatherData } from './interfaces/weatherData'

export function App() {
  const [weather, setWeather] = useState<WeatherData>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch weather based on the user's coordinates
  const getWeatherByGeolocation = async () => {
    if (navigator.geolocation) {
      setIsLoading(true)
      setError(null)

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const weatherData = await getWeatherInfoByCoordinate({
            latitude,
            longitude,
          })
          setWeather(weatherData)
        } catch (error) {
          console.error('Failed to fetch weather data:', error)
          setError('Could not fetch weather data. Please try again.')
        } finally {
          setIsLoading(false)
        }
      })
    } else {
      setError('Geolocation is not supported by your browser.')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getWeatherByGeolocation()
  }, [])

  const handleCitySelect = async (cityName: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const weatherData = await getWeatherInfo(cityName)
      setWeather(weatherData)
    } catch (error: any) {
      setError(
        error.message || 'Could not fetch weather data. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30" />

      {/* Header Section */}
      <div className="relative mb-12 flex flex-col items-center text-center">
        <div className="glass-dark mb-4 rounded-full p-4">
          <Cloud className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-3xl">
          Weather Forecast
        </h1>
        <p className="mt-2 text-white/80 sm:text-sm">
          Search for your city to check the weather
        </p>
      </div>

      <div className="z-10 w-full max-w-lg">
        <SearchBox onCitySelect={handleCitySelect} />
      </div>

      {error && (
        <div className="glass mt-4 w-full max-w-lg rounded-xl p-4 text-white">
          <p className="text-center text-red-400">{error.toUpperCase()}</p>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && <p className="mt-4 text-white">Loading...</p>}

      {/* Weather Card */}
      {weather && !isLoading && !error && (
        <div className="mt-24 w-full max-w-lg transform transition-all duration-500 ease-out">
          <WeatherCard weather={weather} />
        </div>
      )}
    </div>
  )
}
