import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { format } from 'date-fns'
import type { WeatherData } from '../../interfaces/weatherData'
import { mockWeatherData } from '../../test/mocks/mockWeatherData'
import { WeatherCard } from './WeatherCard'

describe('WeatherCard', () => {
  const mockWeather: WeatherData = mockWeatherData

  it('renders the temperature correctly', () => {
    render(<WeatherCard weather={mockWeather} />)

    expect(screen.getByText(/25/i)).toBeInTheDocument()
    expect(screen.getByText('°C')).toBeInTheDocument()
  })

  it('renders the city and country correctly', () => {
    render(<WeatherCard weather={mockWeather} />)
    expect(screen.getByText(/New York - US/i)).toBeInTheDocument()
  })

  it('renders the weather condition correctly', () => {
    render(<WeatherCard weather={mockWeather} />)
    expect(screen.getByText(/Clear/i)).toBeInTheDocument()
  })

  it('renders the humidity correctly', () => {
    render(<WeatherCard weather={mockWeather} />)
    expect(screen.getByText(/65%/i)).toBeInTheDocument()
  })

  it('renders the wind speed correctly', () => {
    render(<WeatherCard weather={mockWeather} />)
    expect(screen.getByText(/5.2 m\/s/i)).toBeInTheDocument()
  })

  it('renders the correct weather icon', () => {
    render(<WeatherCard weather={mockWeather} />)

    const img = screen.getByAltText(/clear sky/i)

    expect(img).toHaveAttribute(
      'src',
      `${import.meta.env.VITE_OPEN_WEATHER_URL}/img/wn/01d@2x.png`
    )
  })

  it('toggles between Celsius and Fahrenheit', async () => {
    render(<WeatherCard weather={mockWeather} />)

    const celsiusButton = screen.getByText('°C')
    const fahrenheitButton = screen.getByText('°F')

    expect(celsiusButton).toHaveClass('font-semibold') // °C should be active
    expect(fahrenheitButton).toHaveClass('font-normal') // °F should be inactive

    await userEvent.click(fahrenheitButton)

    expect(celsiusButton).toHaveClass('font-normal') // °C should be inactive now
    expect(fahrenheitButton).toHaveClass('font-semibold') // °F should now be active

    const tempInFahrenheit = (mockWeather.main.temp * 9) / 5 + 32
    expect(screen.getByText(tempInFahrenheit.toFixed(1))).toBeInTheDocument()
  })

  it('renders the full weather description correctly', () => {
    render(<WeatherCard weather={mockWeather} />)

    expect(screen.getByText(/clear/i)).toBeInTheDocument()
  })

  it('renders the sunrise time correctly', () => {
    render(<WeatherCard weather={mockWeather} />)
    const sunriseTime = format(
      new Date(mockWeather.sys.sunrise * 1000),
      'h:mm a'
    )
    expect(screen.getByText(sunriseTime)).toBeInTheDocument()
  })

  it('renders the sunset time correctly', () => {
    render(<WeatherCard weather={mockWeather} />)
    const sunsetTime = format(new Date(mockWeather.sys.sunset * 1000), 'h:mm a')
    expect(screen.getByText(sunsetTime)).toBeInTheDocument()
  })
})
