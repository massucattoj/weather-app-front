import React from 'react'

interface WeatherStatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
}

export function WeatherStatCard({ icon, label, value }: WeatherStatCardProps) {
  return (
    <div className="weather-stat-card-container flex items-center gap-4 rounded-xl p-4">
      <div className="rounded-lg bg-blue-600/20 p-2">{icon}</div>
      <div>
        <p className="text-sm text-white/60">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  )
}
