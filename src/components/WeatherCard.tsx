import { Droplets, Wind } from 'lucide-react'
import { useState } from 'react'

import { WeatherData } from '../interfaces/weatherData'
import { WeatherStatCard } from './WeatherStatCard'

interface WeatherCardProps {
  weather: WeatherData
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const weatherIconUrl = `${import.meta.env.VITE_OPEN_WEATHER_URL}/img/wn/${weather.weather[0].icon}@2x.png`
  const weatherCondition = weather.weather?.[0] ?? {}
  const [isCelsius, setIsCelsius] = useState(true)

  const temperature = isCelsius
    ? weather.main.temp
    : (weather.main.temp * 9) / 5 + 32

  const toggleUnit = () => {
    setIsCelsius(!isCelsius)
  }

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-8 text-white">
      <div className="relative">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <p className="text-2xl text-white">
            {weather.name} - {weather.sys.country}
          </p>

          <div className="mt-4 text-8xl font-bold">
            {temperature.toFixed(1)}
            <span className="ml-4 inline-flex items-center text-4xl">
              <span
                onClick={toggleUnit}
                className={`cursor-pointer ${
                  isCelsius
                    ? 'font-semibold text-white'
                    : 'font-normal text-gray-400'
                } transition-colors duration-200`}
              >
                °C
              </span>
              <div className="glass mx-2 h-8 w-[2px]"></div>
              <span
                onClick={toggleUnit}
                className={`cursor-pointer ${
                  !isCelsius
                    ? 'font-semibold text-white'
                    : 'font-normal text-gray-400'
                } transition-colors duration-200`}
              >
                °F
              </span>
            </span>
          </div>

          <div className="mt-4 flex items-center justify-center space-x-2 text-center font-semibold sm:mt-0 sm:text-xl">
            <p className="text-white/80">Condition:</p>
            <p className="text-white/80">{weatherCondition.main}</p>

            <img
              className="h-12 w-12"
              src={weatherIconUrl}
              alt={weather.weather[0].description}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <WeatherStatCard
            icon={<Droplets className="h-6 w-6 text-blue-300" />}
            label="Humidity"
            value={`${weather.main.humidity}%`}
          />
          <WeatherStatCard
            icon={<Wind className="h-6 w-6 text-purple-300" />}
            label="Wind Speed"
            value={`${weather.wind.speed} m/s`}
          />
        </div>
      </div>
    </div>
  )
}
