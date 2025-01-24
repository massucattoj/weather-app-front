import { CityData } from '../interfaces/cityData'

interface SuggestionsListProps {
  suggestions: CityData[]
  selectedIndex: number | null
  onSelect: (cityName: string) => void
}

export function SuggestionsList({
  suggestions,
  selectedIndex,
  onSelect,
}: SuggestionsListProps) {
  return (
    <ul className="glass absolute mt-2 w-full rounded-xl text-white">
      {suggestions.map((city, index) => (
        <li
          key={city.id}
          className={`cursor-pointer px-6 py-3 transition-colors hover:bg-white/30 ${
            index === 0 ? 'rounded-t-xl' : ''
          } ${index === suggestions.length - 1 ? 'rounded-b-xl' : ''} ${
            selectedIndex === index ? 'bg-white/20' : ''
          }`}
          onClick={() =>
            onSelect(`${city.name}, ${city.region}, ${city.country}`)
          }
        >
          {city.name}, {city.region}, {city.country}
        </li>
      ))}
    </ul>
  )
}
