interface WeatherStatCardProps {
  icon: React.ReactNode
  title: string
  value: string | number
  subtitle?: string
}

export function WeatherStatCard({
  icon,
  title,
  value,
  subtitle,
}: WeatherStatCardProps) {
  return (
    <div className="glass-dark flex flex-col items-center space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
      {icon}

      <h3 className="text-lg font-medium text-gray-800">{title}</h3>

      <p className="text-4xl font-bold text-white">{value}</p>

      {subtitle && <p className="text-gray-800">{subtitle}</p>}
    </div>
  )
}
