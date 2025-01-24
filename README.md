# Weather App

A simple weather app built with **Vite**, **Tailwind CSS**, and **TypeScript** that allows users to search for cities and view current weather data. This app features an autocomplete search, error handling, and a responsive UI design.

## Features

- **Autocomplete Search**: Type and search for cities with real-time suggestions.
- **Weather Display**: View current weather data for the selected city including temperature, weather condition (e.g., sunny, rainy), humidity, and wind speed.
- **Error Handling**: Handle browser location access errors or invalid city inputs.
- **Responsive UI**: A simple, clean, and responsive user interface designed using Tailwind CSS.
- **Location Detection (Optional)**: Automatically detect the user's location using the Geolocation API and display weather data for that location.

## Tech Stack

- **Vite**: Fast, modern build tool.
- **Tailwind CSS**: Utility-first CSS framework for fast and responsive designs.
- **TypeScript**: Type-safe JavaScript with static types.


## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/massucattoj/weather-app-front.git
cd weather-app-front
pnpm install
```

## Environment Setup

Make sure to create a .env file and add your weather API key:

```bash
VITE_API_URL=http://localhost:3000 (for dev)
VITE_OPEN_WEATHER_URL=http://openweathermap.org
```

## Running the App

Once the dependencies are installed, you can run the development server:

```bash
pnpm run dev
```

## Built with
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-007ACC?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)
![Lucide](https://img.shields.io/static/v1?style=for-the-badge&message=Lucide&color=F56565&logo=Lucide&logoColor=FFFFFF&label=)
![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)