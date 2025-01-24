import debounce from 'lodash/debounce'
import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { searchCities } from '../api/citiesApi'
import { CityData } from '../interfaces/cityData'
import { SuggestionsList } from './SuggestionsList'

interface SearchBoxProps {
  onCitySelect: (cityName: string) => void
}

export function SearchBox({ onCitySelect }: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<CityData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        if (searchQuery.length < 2) {
          setSuggestions([])
          return
        }

        setIsLoading(true)
        setError(null)
        try {
          const cities: CityData[] = await searchCities(searchQuery)
          setSuggestions(cities)
        } catch (err) {
          console.error('Error fetching city suggestions:', err)
          setError('Failed to fetch city suggestions. Please try again.')
        } finally {
          setIsLoading(false)
        }
      }, 2000),
    [],
  )

  useEffect(() => {
    fetchSuggestions(query)
  }, [query, fetchSuggestions])

  const handleSelectSuggestion = (cityName: string) => {
    onCitySelect(cityName)
    setSuggestions([])
    setQuery('')
    setSelectedIndex(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return

    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        prevIndex === null || prevIndex === suggestions.length - 1
          ? 0
          : prevIndex + 1,
      )
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? suggestions.length - 1
          : prevIndex - 1,
      )
    } else if (e.key === 'Enter' && selectedIndex !== null) {
      handleSelectSuggestion(
        `${suggestions[selectedIndex].name}, ${suggestions[selectedIndex].region}, ${suggestions[selectedIndex].country}`,
      )
    }
  }

  return (
    <div className="relative">
      <div className="flex">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="glass w-full rounded-xl px-6 py-2 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50"
          aria-label="Search for a city"
          onKeyDown={handleKeyDown}
        />
        <button
          className="glass ml-4 flex items-center justify-center rounded-xl px-6 py-2 hover:bg-white/20 disabled:opacity-50"
          onClick={() => handleSelectSuggestion(query)}
          disabled={!query.trim()}
          aria-label="Search"
        >
          <Search className="h-8 w-8 text-white" />
        </button>
      </div>

      {error && <div className="mt-2 text-red-500">{error}</div>}

      {isLoading ? (
        <div className="absolute mt-2 w-full p-4 text-center text-white/80">
          Loading...
        </div>
      ) : suggestions.length > 0 ? (
        <SuggestionsList
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          onSelect={handleSelectSuggestion}
        />
      ) : null}
    </div>
  )
}
