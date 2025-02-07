import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { activitySuggestionApi } from '../api/activitySuggestionApi'
import type { RootState } from '../store/store'

export const useActivitySuggestion = () => {
  const [activitySuggestion, setActivitySuggestion] = useState<string | null>(
    null
  )
  const [isActivityLoading, setIsActivityLoading] = useState(false)
  const [activityError, setActivityError] = useState<string | null>(null)

  // Access weather data directly from Redux
  const weather = useSelector((state: RootState) => state.weather.weather)

  useEffect(() => {
    const fetchActivitySuggestion = async () => {
      if (weather) {
        setIsActivityLoading(true)
        setActivityError(null)

        try {
          const response = await activitySuggestionApi(weather)
          setActivitySuggestion(response)
        } catch (error) {
          console.error('Failed to fetch activity suggestion:', error)
          setActivityError(
            'Could not fetch activity suggestion. Please try again.'
          )
        } finally {
          setIsActivityLoading(false)
        }
      }
    }

    fetchActivitySuggestion()
  }, [weather])

  return { activitySuggestion, isActivityLoading, activityError }
}
