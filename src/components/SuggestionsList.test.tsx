import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CityData } from '../interfaces/cityData'
import { SuggestionsList } from './SuggestionsList'

const suggestions: CityData[] = [
  {
    id: 1,
    wikiDataId: 'Q60',
    type: 'city',
    city: 'New York',
    name: 'New York',
    country: 'United States',
    countryCode: 'US',
    region: 'New York',
    regionCode: 'NY',
    regionWdId: 'NY-001',
    latitude: 40.7128,
    longitude: -74.006,
    population: 8175133,
  },
  {
    id: 2,
    wikiDataId: 'Q65',
    type: 'city',
    city: 'Los Angeles',
    name: 'Los Angeles',
    country: 'United States',
    countryCode: 'US',
    region: 'California',
    regionCode: 'CA',
    regionWdId: 'CA-001',
    latitude: 34.0522,
    longitude: -118.2437,
    population: 3792621,
  },
  {
    id: 3,
    wikiDataId: 'Q84',
    type: 'city',
    city: 'London',
    name: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'England',
    regionCode: 'ENG',
    regionWdId: 'ENG-001',
    latitude: 51.5074,
    longitude: -0.1278,
    population: 8982000,
  },
]

describe('SuggestionsList', () => {
  const mockOnSelect = vi.fn() // Use vi.fn() instead of jest.fn()

  it('renders the suggestions correctly', () => {
    render(
      <SuggestionsList
        suggestions={suggestions}
        selectedIndex={null}
        onSelect={mockOnSelect}
      />,
    )

    suggestions.forEach((city) => {
      expect(
        screen.getByText(`${city.name}, ${city.region}, ${city.country}`),
      ).toBeInTheDocument()
    })
  })

  it('applies the correct class for the selected index', () => {
    render(
      <SuggestionsList
        suggestions={suggestions}
        selectedIndex={1} // Selecting "Los Angeles"
        onSelect={mockOnSelect}
      />,
    )

    const selectedItem = screen.getByText(
      'Los Angeles, California, United States',
    )
    expect(selectedItem).toHaveClass('bg-white/20') // Check for the selected style
  })

  it('calls onSelect with the correct city name when an item is clicked', async () => {
    render(
      <SuggestionsList
        suggestions={suggestions}
        selectedIndex={null}
        onSelect={mockOnSelect}
      />,
    )

    const losAngelesItem = screen.getByText(
      'Los Angeles, California, United States',
    )
    await userEvent.click(losAngelesItem)

    expect(mockOnSelect).toHaveBeenCalledWith(
      'Los Angeles, California, United States',
    )
    expect(mockOnSelect).toHaveBeenCalledTimes(1)
  })

  it('applies the correct class for the first and last item in the list', () => {
    render(
      <SuggestionsList
        suggestions={suggestions}
        selectedIndex={null}
        onSelect={mockOnSelect}
      />,
    )

    const firstItem = screen.getByText('New York, New York, United States')
    const lastItem = screen.getByText('London, England, United Kingdom')

    // Check the first and last items for rounded corners
    expect(firstItem).toHaveClass('rounded-t-xl')
    expect(lastItem).toHaveClass('rounded-b-xl')
  })
})
