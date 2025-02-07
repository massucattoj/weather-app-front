// App.tsx
import { Cloud } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchBox } from './components/SearchBox/SearchBox'
import { WeatherCard } from './components/WeatherCard/WeatherCard'
import { useActivitySuggestion } from './hooks/useActivitySuggestion'
import {
  fetchWeatherByCity,
  fetchWeatherByCoordinates,
} from './slices/weatherSlice'
import type { AppDispatch, RootState } from './store/store'

export function App() {
  const dispatch: AppDispatch = useDispatch()
  const { weather, isLoading, error } = useSelector(
    (state: RootState) => state.weather
  )

  const { activitySuggestion, isActivityLoading, activityError } =
    useActivitySuggestion()

  useEffect(() => {
    dispatch(fetchWeatherByCoordinates())
  }, [dispatch])

  const handleCitySelect = (cityName: string) => {
    dispatch(fetchWeatherByCity(cityName))
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
          <svg
            className="h-6 w-6 animate-spin text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Loading...</title>
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
            />
          </svg>
        </div>
      )}

      {/* Weather Card */}
      {weather && !isLoading && !error && (
        <div className="mt-12 w-full max-w-2xl transform transition-all duration-500 ease-out">
          <WeatherCard weather={weather} />
        </div>
      )}

      {isActivityLoading && (
        <div className="mt-8 w-full h-16 flex items-center justify-center max-w-2xl transform transition-all duration-500 ease-out rounded-2xl glass p-2 animate-pulse">
          <p className="text-center text-white">Loading...</p>
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
