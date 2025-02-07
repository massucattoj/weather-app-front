import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getWeatherInfo, getWeatherInfoByCoordinate } from '../api/weatherApi'
import type { WeatherData } from '../interfaces/weatherData'

interface WeatherState {
  weather: WeatherData | null
  isLoading: boolean
  error: string | null
}

const initialState: WeatherState = {
  weather: null,
  isLoading: false,
  error: null,
}

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchWeatherByCity',
  async (cityName: string, { rejectWithValue }) => {
    try {
      return await getWeatherInfo(cityName)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Failed to fetch weather data.')
      }
      return rejectWithValue('Failed to fetch weather data.')
    }
  }
)

export const fetchWeatherByCoordinates = createAsyncThunk(
  'weather/fetchWeatherByCoordinates',
  async (_, { rejectWithValue }) => {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
          })
        }
      )
      const { latitude, longitude } = position.coords
      const response = await getWeatherInfoByCoordinate({ latitude, longitude })
      return response
    } catch (error) {
      return rejectWithValue(
        'Failed to retrieve location. Please check your settings and try again.'
      )
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeatherByCity.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.isLoading = false
        state.weather = action.payload
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchWeatherByCoordinates.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWeatherByCoordinates.fulfilled, (state, action) => {
        state.isLoading = false
        state.weather = action.payload
      })
      .addCase(fetchWeatherByCoordinates.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export default weatherSlice.reducer
