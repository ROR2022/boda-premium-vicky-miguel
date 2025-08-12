"use client"

import { useState } from 'react'
import { Users, Heart, Crown, Circle, Flower, Music, Users2, Gem } from 'lucide-react'
import { premiumDemoData } from './data/premium-demo-data'

export function PremiumPadrinos() {
  const [selectedPadrino, setSelectedPadrino] = useState<number | null>(null)

  const getIcon = (role: string) => {
    switch (role) {
      case 'Padrinos de Honor':
        return <Crown className="w-6 h-6" />
      case 'Padrinos de los Anillos':
        return <Circle className="w-6 h-6" />
      case 'Padrinos del Ramo':
        return <Flower className="w-6 h-6" />
      case 'Padrinos de la Música':
        return <Music className="w-6 h-6" />
      case 'Padrinos del Vals':
        return <Users2 className="w-6 h-6" />
      case 'Padrinos de las Arras':
        return <Gem className="w-6 h-6" />
      default:
        return <Users className="w-6 h-6" />
    }
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Padrinos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Personas especiales que han sido parte fundamental en nuestras vidas y 
            que nos honran con su presencia en este día tan importante.
          </p>
        </div>

        {/* Grid de padrinos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumDemoData.padrinos.map((padrino, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                selectedPadrino === index 
                  ? 'border-purple-400 shadow-lg scale-105' 
                  : 'border-purple-200 hover:border-purple-300'
              }`}
              onClick={() => setSelectedPadrino(selectedPadrino === index ? null : index)}
            >
              {/* Icono y rol */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                  {getIcon(padrino.role)}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {padrino.role}
                </h3>
              </div>

              {/* Nombres */}
              <div className="space-y-2 mb-4">
                {padrino.names.map((name, nameIndex) => (
                  <p key={nameIndex} className="text-gray-700 font-medium">
                    {name}
                  </p>
                ))}
              </div>

              {/* Descripción */}
              <p className="text-sm text-gray-600 italic">
                {padrino.description}
              </p>

              {/* Indicador de selección */}
              {selectedPadrino === index && (
                <div className="mt-4 flex items-center gap-2 text-purple-600">
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">Seleccionado</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mensaje especial */}
        <div className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <Heart className="w-8 h-8 text-purple-600 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Un Agradecimiento Especial
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Cada uno de nuestros padrinos ha sido fundamental en nuestras vidas. 
            Su amor, apoyo y guía nos han llevado hasta este momento tan especial. 
            Gracias por ser parte de nuestra historia de amor.
          </p>
        </div>

        
      </div>
    </section>
  )
} 