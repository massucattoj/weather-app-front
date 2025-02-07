import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchCities } from '../api/citiesApi'
import type { CityData } from '../interfaces/cityData'

interface CitySuggestionsState {
  suggestions: CityData[]
  isLoading: boolean
  error: string | null
}

const initialState: CitySuggestionsState = {
  suggestions: [],
  isLoading: false,
  error: null,
}

export const fetchCitySuggestions = createAsyncThunk(
  'citySuggestions/fetchCitySuggestions',
  async (query: string, { rejectWithValue }) => {
    try {
      const cities = await searchCities(query)
      return cities
    } catch (error) {
      return rejectWithValue('Failed to fetch city suggestions.')
    }
  }
)

const citySuggestionsSlice = createSlice({
  name: 'citySuggestions',
  initialState,
  reducers: {
    clearSuggestions: state => {
      state.suggestions = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCitySuggestions.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCitySuggestions.fulfilled, (state, action) => {
        state.isLoading = false
        state.suggestions = action.payload
      })
      .addCase(fetchCitySuggestions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearSuggestions } = citySuggestionsSlice.actions

export default citySuggestionsSlice.reducer
