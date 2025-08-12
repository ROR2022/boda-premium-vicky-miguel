"use client"

import { basicDemoData } from './data/basic-demo-data'

export function BasicHero() {
  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${basicDemoData.hero.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>
      
      {/* Contenido principal */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-in">
          <span className="text-pink-300 font-script italic">
            {basicDemoData.hero.name}
          </span>
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wider animate-fade-in-delay">
          {basicDemoData.hero.subtitle}
        </h2>
        
        {/* Información adicional */}
        <div className="mt-8 space-y-2">
          <p className="text-xl md:text-2xl font-medium">
            {basicDemoData.event.date.full}
          </p>
          <p className="text-lg md:text-xl opacity-90">
            {basicDemoData.event.ceremony.venue}
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
} 