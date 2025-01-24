import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { WeatherData } from '../interfaces/weatherData'
import { WeatherCard } from './WeatherCard'

describe('WeatherCard', () => {
  const mockWeather: WeatherData = {
    coord: { lon: -74.006, lat: 40.7128 },
    weather: [
      { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
    ],
    base: 'stations',
    main: {
      temp: 25,
      feels_like: 24.5,
      temp_min: 22,
      temp_max: 28,
      pressure: 1013,
      humidity: 65,
      sea_level: 1013,
      grnd_level: 1000,
    },
    visibility: 10000,
    wind: { speed: 5.2, deg: 180 },
    clouds: { all: 0 },
    dt: 1672531200,
    sys: {
      type: 1,
      id: 1414,
      country: 'US',
      sunrise: 1672502400,
      sunset: 1672545600,
    },
    timezone: -18000,
    id: 5128581,
    name: 'New York',
    cod: 200,
  }

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
      `${import.meta.env.VITE_OPEN_WEATHER_URL}/img/wn/01d@2x.png`,
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
})
