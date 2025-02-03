import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SuggestionsList } from './SuggestionsList'
import { mockCityData } from '../../test/mocks/mockCityData'

const suggestions = mockCityData

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
