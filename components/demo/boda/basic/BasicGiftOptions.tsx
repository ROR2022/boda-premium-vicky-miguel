"use client"

import { Gift, CreditCard, DollarSign } from 'lucide-react'
import { basicDemoData } from './data/basic-demo-data'

export function BasicGiftOptions() {
  const getIcon = (icon: string) => {
    switch (icon) {
      case '💳':
        return <CreditCard className="w-6 h-6" />
      case '🎁':
        return <Gift className="w-6 h-6" />
      case '💰':
        return <DollarSign className="w-6 h-6" />
      default:
        return <span className="text-2xl">{icon}</span>
    }
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
              <Gift className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {basicDemoData.gifts.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {basicDemoData.gifts.message}
          </p>
        </div>

        {/* Opciones de regalo */}
        <div className="grid md:grid-cols-3 gap-6">
          {basicDemoData.gifts.options.map((option, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-6 border border-pink-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Icono */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white">
                  {getIcon(option.icon)}
                </div>
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {option.title}
              </h3>

              {/* Descripción */}
              <p className="text-gray-600 text-center mb-4">
                {option.description}
              </p>

              {/* Detalles */}
              <div className="bg-white rounded-lg p-4 border border-pink-100">
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {option.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Información Importante
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Para Transferencias:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Verificar datos antes de transferir</li>
                <li>• Incluir nombre del remitente</li>
                <li>• Guardar comprobante</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Para Mesa de Regalos:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Código válido hasta el día del evento</li>
                <li>• Puedes comprar en línea o en tienda</li>
                <li>• Los regalos se entregan después</li>
              </ul>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  )
} 