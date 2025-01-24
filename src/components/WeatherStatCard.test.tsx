import { render, screen } from '@testing-library/react'

import { WeatherStatCard } from './WeatherStatCard'

describe('WeatherStatCard', () => {
  const icon = <svg data-testid="icon" /> // Example icon element
  const label = 'Temperature'
  const value = 25

  it('renders the WeatherStatCard component correctly', () => {
    render(<WeatherStatCard icon={icon} label={label} value={value} />)

    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByText(value.toString())).toBeInTheDocument()
  })

  it('renders the value as a number correctly', () => {
    render(<WeatherStatCard icon={icon} label={label} value={value} />)

    expect(screen.getByText('25')).toBeInTheDocument()
  })

  it('renders the value as a string correctly', () => {
    const valueAsString = '25'

    render(<WeatherStatCard icon={icon} label={label} value={valueAsString} />)

    expect(screen.getByText(valueAsString)).toBeInTheDocument()
  })
})
