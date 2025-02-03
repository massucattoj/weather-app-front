import { render, screen } from '@testing-library/react'

import { WeatherStatCard } from './WeatherStatCard'

describe('WeatherStatCard', () => {
  const icon = <svg data-testid="icon" />
  const title = 'Temperature'
  const value = 25
  const subtitle = 'Feels like 23°C'

  it('renders the WeatherStatCard component correctly', () => {
    render(<WeatherStatCard icon={icon} title={title} value={value} />)

    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(value.toString())).toBeInTheDocument()
  })

  it('renders the value as a number correctly', () => {
    render(<WeatherStatCard icon={icon} title={title} value={value} />)

    expect(screen.getByText('25')).toBeInTheDocument()
  })

  it('renders the value as a string correctly', () => {
    const valueAsString = '25'

    render(<WeatherStatCard icon={icon} title={title} value={valueAsString} />)

    expect(screen.getByText(valueAsString)).toBeInTheDocument()
  })

  it('renders the subtitle when provided', () => {
    
    render(<WeatherStatCard icon={icon} title={title} value={value} subtitle={subtitle} />)
  
    expect(screen.getByText(subtitle)).toBeInTheDocument()
  })
})
