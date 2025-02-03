import { Droplets, Sunrise, Sunset, Wind } from 'lucide-react'
import { useState } from 'react'

import { WeatherData } from '../../interfaces/weatherData'
import { WeatherStatCard } from '../WeatherStatCard/WeatherStatCard'
import { format } from 'date-fns'

interface WeatherCardProps {
  weather: WeatherData
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const weatherIconUrl = `${import.meta.env.VITE_OPEN_WEATHER_URL}/img/wn/${weather.weather[0].icon}@2x.png`
  const weatherCondition = weather.weather?.[0] ?? {}
  const [isCelsius, setIsCelsius] = useState(true)

  const convertTemp = (temp: number) =>
    isCelsius ? temp : Math.round((temp * 9) / 5 + 32)

  const temperature = isCelsius
    ? weather.main.temp
    : convertTemp(weather.main.temp)

  const toggleUnit = () => {
    setIsCelsius(!isCelsius)
  }

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-8 text-white">
      <div className="relative">
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">          
          <div className="mt-4 text-6xl sm:text-8xl font-bold flex flex-col items-center sm:items-start">
            <span className="text-xl sm:text-2xl text-white">
              {weather.name} - {weather.sys.country}
            </span>
            
            <div className="flex flex-row items-baseline space-x-2 sm:space-x-4 mt-2">
              <span className="text-4xl sm:text-6xl">{temperature.toFixed(1)}</span>
              
              <span
                onClick={toggleUnit}
                className={`cursor-pointer text-2xl sm:text-4xl ${
                  isCelsius ? 'font-semibold text-white' : 'font-normal text-gray-400'
                } transition-colors duration-200`}
              >
                °C
              </span>

              <div className="glass mx-1 sm:mx-2 h-6 sm:h-8 w-[2px]"></div>
              
              <span
                onClick={toggleUnit}
                className={`cursor-pointer text-2xl sm:text-4xl ${
                  !isCelsius ? 'font-semibold text-white' : 'font-normal text-gray-400'
                } transition-colors duration-200`}
              >
                °F
              </span>
            </div>
          </div>

          <div className="mt-6 sm:mt-4 flex flex-col items-center sm:items-end text-center sm:text-right font-semibold sm:text-xl space-y-2 sm:space-y-3 self-stretch w-full">
          
            <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end space-x-4">
              <img className="h-10 sm:h-12 w-10 sm:w-12 mr-1" src={weatherIconUrl} alt={weather.weather[0].description} />
              
              <p className="w-16 sm:w-auto min-w-[156px] text-lg text-white">
                {weatherCondition.main}
              </p>
            </div>

            {/* Sunrise */}
            <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end space-x-4">
              <Sunrise className="h-5 sm:h-6 w-5 sm:w-6 text-yellow-400" />
              
              <p className="w-16 sm:w-auto min-w-[156px] text-lg text-white">
                {format(new Date(weather.sys.sunrise * 1000), 'h:mm a')}
              </p>
            </div>

            {/* Sunset */}
            <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end space-x-4">
              <Sunset className="h-5 sm:h-6 w-5 sm:w-6 text-orange-400" />
              
              <p className="w-16 sm:w-auto min-w-[156px] text-lg text-white">
                {format(new Date(weather.sys.sunset * 1000), 'h:mm a')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <WeatherStatCard
            icon={<Droplets className="h-6 w-6 text-blue-300" />}
            title="Humidity"
            value={`${weather.main.humidity}%`}
            subtitle={`Dew point: ${convertTemp(weather.main.temp - 5).toFixed(2)}°${isCelsius ? 'C' : 'F'}`}
          />
          <WeatherStatCard
            icon={<Wind className="h-6 w-6 text-purple-300" />}
            title="Wind Speed"
            value={`${weather.wind.speed} m/s`}
          />
        </div>
      </div>
    </div>
  )
}
