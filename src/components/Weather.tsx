import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useState } from 'react'
import useSWR from 'swr'
import { WeatherResponse } from 'types/weather'

export const Weather = () => {
  const [useCelsius, setCelsius] = useState(true)

  const { data }: { data?: WeatherResponse } = useSWR('weather')

  if (!data) return null

  const { main: weatherName, description: weatherDescription } = data.weather[0]
  const { temp: celsius } = data.main

  const fahrenheit = (celsius * 9) / 5 + 32
  const toggleTemperature = () => setCelsius((celsius) => !celsius)

  return (
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <FontAwesomeIcon
        icon={
          ({
            Snow: ['fas', 'snowflake'],
            Thunderstorm: ['fas', 'bolt-alt'],
            Rain: ['fas', 'cloud-rain'],
            Drizzle: ['fas', 'cloud-showers'],
            Mist: ['fas', 'cloud-mist'],
            Clouds: ['fas', 'cloud'],
            Clear: ['fas', 'sun'],
            Haze: ['fas', 'sun-haze'],
          }[weatherName] as IconProp) || ['fas', 'cloud']
        }
        className="mr-2"
      />
      It's currently{' '}
      {(celsius < 8 && <span className="mr-1">❄️</span>) ||
        (celsius > 30 && <span className="mr-1">🔥</span>)}
      <span onMouseOver={toggleTemperature} onMouseLeave={toggleTemperature} className="font-bold">
        {useCelsius ? `${Math.round(celsius)} °C` : `${Math.round(fahrenheit)} °F`}
      </span>{' '}
      <span className="text-xs">({weatherDescription})</span> in{' '}
      <a
        href="https://weather.com/en-GB/weather/today/l/51.49,-0.14"
        rel="noopener noreferrer"
        target="_blank"
        className="font-bold focus:outline-none transition duration-300 ease-in-out hover:text-indigo-900 dark:hover:text-indigo-200"
      >
        London
      </a>
      .
    </motion.p>
  )
}
