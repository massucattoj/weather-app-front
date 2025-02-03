import { WeatherData } from "../../interfaces/weatherData";

export const mockWeatherData: WeatherData = {
  coord: { lon: -74.006, lat: 40.7128 },
  weather: [
    { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
  ],
  base: 'stations',
  main: {
    temp: 25,
    feels_like: 24.5,
    temp_min: 22,
    temp_max: 28,
    pressure: 1013,
    humidity: 65,
    sea_level: 1013,
    grnd_level: 1000,
  },
  visibility: 10000,
  wind: { speed: 5.2, deg: 180 },
  clouds: { all: 0 },
  dt: 1672531200,
  sys: {
    type: 1,
    id: 1414,
    country: 'US',
    sunrise: 1672502400,
    sunset: 1672545600,
  },
  timezone: -18000,
  id: 5128581,
  name: 'New York',
  cod: 200,
}