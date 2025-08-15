"use client"

import { useState } from 'react'
import { Users, CheckCircle, XCircle, MessageCircle } from 'lucide-react'
import { basicDemoData } from './data/basic-demo-data'
import { weddingConfig } from '../data/wedding-config'

export function BasicAttendance() {
  const [formData, setFormData] = useState({
    name: '',
    response: '',
    companions: '',
    phone: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({
    name: '',
    response: '',
    phone: '',
    general: ''
  })
  const [touched, setTouched] = useState({
    name: false,
    response: false,
    phone: false
  })

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      response: '',
      phone: '',
      general: ''
    }

    let isValid = true

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
      isValid = false
    }

    // Validar respuesta
    if (!formData.response) {
      newErrors.response = 'Debes seleccionar si podrás asistir o no'
      isValid = false
    }

    // Validar teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = 'El número de teléfono es obligatorio'
      isValid = false
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = 'El número de teléfono debe tener al menos 10 dígitos'
      isValid = false
    }

    // Mensaje general
    if (!isValid) {
      const missingFields = []
      if (newErrors.name) missingFields.push('Nombre')
      if (newErrors.response) missingFields.push('Respuesta de asistencia')
      if (newErrors.phone) missingFields.push('Teléfono')
      
      newErrors.general = `Por favor completa: ${missingFields.join(', ')}`
    }

    setErrors(newErrors)
    
    // Marcar todos los campos como "touched" para mostrar errores
    setTouched({
      name: true,
      response: true,
      phone: true
    })

    return isValid
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Validar formulario
    if (!validateForm()) {
      return
    }
    
    // Formatear mensaje para WhatsApp
    const message = formatWhatsAppMessage(formData)
    
    // Enviar por WhatsApp
    sendWhatsAppMessage(message)
    
    // Mostrar confirmación
    setIsSubmitted(true)
  }

  const formatWhatsAppMessage = (data: typeof formData) => {
    // Versión ultra simplificada para evitar problemas de codificación
    const attendanceStatus = data.response === 'yes' ? 'SI' : 'NO'
    const companions = data.response === 'yes' && data.companions ? ` - Acompañantes: ${data.companions}` : ''
    
    // Mensaje muy básico para probar
    const message = `Confirmacion Boda Vicky y Miguel

Nombre: ${data.name}
Telefono: ${data.phone}
Asistencia: ${attendanceStatus}${companions}

Fecha: 27 Diciembre 2025
Lugar: jardin Ceiba

Gracias!`

    return message
  }

  const phoneNumbers = {
    unified: {
      number: '529934584068',
      display: '+52 993 458 4068',
      name: 'Confirmaciones Boda',
      flag: '🇲🇽'
    }
  }

  const sendWhatsAppMessage = (message: string) => {
    const phoneNumber = '529934584068'
    
    // Debug completo
    console.log('=== DEBUG WHATSAPP ===')
    console.log('📝 Mensaje RAW:', JSON.stringify(message))
    console.log('📏 Longitud mensaje:', message.length)
    console.log('📱 Número:', phoneNumber)
    
    // Método 1: Codificación estándar
    const encodedMessage1 = encodeURIComponent(message)
    const url1 = `https://wa.me/${phoneNumber}?text=${encodedMessage1}`
    console.log('🔗 URL Método 1:', url1)
    
    // Método 2: Codificación manual básica
    const encodedMessage2 = message.replace(/\n/g, '%0A').replace(/ /g, '%20')
    const url2 = `https://wa.me/${phoneNumber}?text=${encodedMessage2}`
    console.log('🔗 URL Método 2:', url2)
    
    // Método 3: Sin codificación (solo para test)
    const url3 = `https://wa.me/${phoneNumber}`
    console.log('🔗 URL Método 3 (sin mensaje):', url3)
    
    // Intentar con el método más simple primero
    console.log('� Abriendo URL...')
    
    // Usar método 1 por defecto, pero mostrar opciones
    const finalUrl = url1
    console.log('✅ URL Final:', finalUrl)
    
    // Verificar longitud
    if (finalUrl.length > 2048) {
      console.warn('⚠️ URL muy larga:', finalUrl.length)
      alert(`URL muy larga (${finalUrl.length} caracteres). Reduce el texto.`)
      return
    }
    
    // Abrir WhatsApp
    try {
      window.open(finalUrl, '_blank')
      console.log('✅ WhatsApp abierto exitosamente')
    } catch (error) {
      console.error('❌ Error al abrir WhatsApp:', error)
      
      // Fallback: copiar al clipboard
      navigator.clipboard.writeText(message).then(() => {
        alert(`No se pudo abrir WhatsApp automáticamente. 
El mensaje se ha copiado al portapapeles. 
Número: +52 993 458 4068
Por favor pega el mensaje manualmente.`)
      }).catch(() => {
        alert(`Error al abrir WhatsApp. 
Envía manualmente a: +52 993 458 4068
Mensaje: ${message}`)
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    
    // Limpiar mensaje general si se está llenando un campo faltante
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }))
    }
  }

  const handleFieldFocus = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleFieldBlur = (field: string) => {
    // Validar campo individual al perder el foco
    if (field === 'name' && !formData.name.trim() && touched.name) {
      setErrors(prev => ({ ...prev, name: 'El nombre es obligatorio' }))
    } else if (field === 'phone' && touched.phone) {
      if (!formData.phone.trim()) {
        setErrors(prev => ({ ...prev, phone: 'El número de teléfono es obligatorio' }))
      } else if (formData.phone.trim().length < 10) {
        setErrors(prev => ({ ...prev, phone: 'El número debe tener al menos 10 dígitos' }))
      }
    }
  }

  return (
    <section 
    style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url('/images/custom/vicky_miguel_5.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 bg-gray-200 bg-opacity-40 rounded-lg p-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {basicDemoData.attendance.title}
          </h2>
          <p className="text-lg text-white mb-2">
            {basicDemoData.attendance.message}
          </p>
          <p className="text-white">
            {basicDemoData.attendance.subtitle}
          </p>
        </div>

        {/* Demo Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 text-center">
          <div className="flex items-center justify-center gap-2 text-green-700">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">Integración WhatsApp Activa</span>
          </div>
          <div className="mt-3">
            <div className="bg-white rounded-lg p-3 border inline-block">
              <p className="text-green-700 font-semibold">🇲🇽 Confirmaciones</p>
              <p className="text-green-600 text-sm">+52 993 458 4068</p>
            </div>
          </div>
        </div>

        {/* Mensaje de estado general */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-700">
              <XCircle className="w-5 h-5" />
              <span className="font-medium">Formulario incompleto</span>
            </div>
            <p className="text-red-600 text-sm mt-1">{errors.general}</p>
          </div>
        )}

        {/* Formulario */}
        {!isSubmitted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Nombre */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {basicDemoData.attendance.fields.name} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onFocus={() => handleFieldFocus('name')}
                onBlur={() => handleFieldBlur('name')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                  errors.name 
                    ? 'border-red-300 focus:ring-red-500 bg-red-50' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Ej: María González"
                required
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Respuesta */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {basicDemoData.attendance.fields.response} <span className="text-red-500">*</span>
              </label>
              <div className={`grid grid-cols-2 gap-4 ${
                errors.response ? 'ring-2 ring-red-200 rounded-lg p-1' : ''
              }`}>
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange('response', 'yes')
                    setTouched(prev => ({ ...prev, response: true }))
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.response === 'yes'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : errors.response
                        ? 'border-red-300 hover:border-red-400 bg-red-50'
                        : 'border-gray-300 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>{basicDemoData.attendance.fields.responseOptions.yes}</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange('response', 'no')
                    setTouched(prev => ({ ...prev, response: true }))
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.response === 'no'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : errors.response
                        ? 'border-red-300 hover:border-red-400 bg-red-50'
                        : 'border-gray-300 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <XCircle className="w-5 h-5" />
                    <span>{basicDemoData.attendance.fields.responseOptions.no}</span>
                  </div>
                </button>
              </div>
              {errors.response && (
                <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  {errors.response}
                </p>
              )}
            </div>

            {/* Acompañantes */}
            {formData.response === 'yes' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {basicDemoData.attendance.fields.companions}
                </label>
                <input
                  type="text"
                  value={formData.companions}
                  onChange={(e) => handleInputChange('companions', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Juan González, Ana López"
                />
              </div>
            )}

            {/* Teléfono */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {basicDemoData.attendance.fields.phone} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onFocus={() => handleFieldFocus('phone')}
                onBlur={() => handleFieldBlur('phone')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                  errors.phone 
                    ? 'border-red-300 focus:ring-red-500 bg-red-50' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Ej: 777 123 4567"
                required
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Indicador de progreso */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-3">Progreso del formulario:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {formData.name.trim() ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-gray-400" />
                  )}
                  <span className={`text-sm ${formData.name.trim() ? 'text-green-700' : 'text-gray-500'}`}>
                    Nombre completo
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {formData.response ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-gray-400" />
                  )}
                  <span className={`text-sm ${formData.response ? 'text-green-700' : 'text-gray-500'}`}>
                    Respuesta de asistencia
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {formData.phone.trim() ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-gray-400" />
                  )}
                  <span className={`text-sm ${formData.phone.trim() ? 'text-green-700' : 'text-gray-500'}`}>
                    Número de teléfono
                  </span>
                </div>
                {formData.response === 'yes' && (
                  <div className="flex items-center gap-2">
                    {formData.companions.trim() ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                    )}
                    <span className={`text-sm ${formData.companions.trim() ? 'text-green-700' : 'text-gray-500'}`}>
                      Acompañantes (opcional)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Botón de envío */}
            <div className="space-y-3">
              <p className="text-center text-gray-600 font-medium">Confirmar asistencia:</p>
              
              <button
                onClick={(e) => handleSubmit(e)}
                disabled={!formData.name || !formData.response || !formData.phone}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageCircle className="w-5 h-5" />
                💒 Confirmar por WhatsApp
              </button>
            </div>
          </div>
        ) : (
          /* Mensaje de confirmación */
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Confirmación Enviada por WhatsApp!
            </h3>
            <p className="text-gray-600 mb-6">
              Tu confirmación de asistencia se ha enviado exitosamente por WhatsApp. 
              ¡Te esperamos en nuestro día especial! 💕
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ name: '', response: '', companions: '', phone: '' })
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Confirmar Otro Invitado
            </button>
          </div>
        )}

        
      </div>
    </section>
  )
} 