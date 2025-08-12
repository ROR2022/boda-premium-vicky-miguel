"use client"

import { useState, useEffect } from 'react'
import { basicDemoData } from './data/basic-demo-data'

export function BasicCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date(basicDemoData.countdown.targetDate).getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section 
      className="py-16 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${basicDemoData.countdown.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Faltan
        </h2>
        
        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div className="text-3xl md:text-5xl font-bold mb-2">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base opacity-90">
              Días
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div className="text-3xl md:text-5xl font-bold mb-2">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base opacity-90">
              Horas
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div className="text-3xl md:text-5xl font-bold mb-2">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base opacity-90">
              Minutos
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <div className="text-3xl md:text-5xl font-bold mb-2">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base opacity-90">
              Segundos
            </div>
          </div>
        </div>
        
        <p className="text-lg md:text-xl opacity-90">
          Para nuestro día especial
        </p>
      </div>
    </section>
  )
} 