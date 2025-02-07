// components/SearchBox/SearchBox.tsx
import debounce from 'lodash/debounce'
import { Search } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearSuggestions,
  fetchCitySuggestions,
} from '../../slices/citySuggestionsSlice'
import type { AppDispatch, RootState } from '../../store/store'
import { SuggestionsList } from '../SuggestionsList/SuggestionsList'

interface SearchBoxProps {
  onCitySelect: (cityName: string) => void
}

export function SearchBox({ onCitySelect }: SearchBoxProps) {
  const dispatch: AppDispatch = useDispatch()
  const { suggestions, isLoading, error } = useSelector(
    (state: RootState) => state.citySuggestions
  )
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const fetchSuggestions = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.length >= 2) {
        dispatch(fetchCitySuggestions(searchQuery))
      } else {
        dispatch(clearSuggestions())
      }
    }, 2000),
    []
  )

  useEffect(() => {
    fetchSuggestions(query)
  }, [query, fetchSuggestions])

  const handleSelectSuggestion = (cityName: string) => {
    onCitySelect(cityName)
    dispatch(clearSuggestions())
    setQuery('')
    setSelectedIndex(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return

    if (e.key === 'ArrowDown') {
      setSelectedIndex(prevIndex =>
        prevIndex === null || prevIndex === suggestions.length - 1
          ? 0
          : prevIndex + 1
      )
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prevIndex =>
        prevIndex === null || prevIndex === 0
          ? suggestions.length - 1
          : prevIndex - 1
      )
    } else if (e.key === 'Enter' && selectedIndex !== null) {
      handleSelectSuggestion(
        `${suggestions[selectedIndex].name}, ${suggestions[selectedIndex].region}, ${suggestions[selectedIndex].country}`
      )
    }
  }

  return (
    <div className="relative">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="glass w-full rounded-xl px-6 py-2 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50"
          aria-label="Search for a city"
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
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
