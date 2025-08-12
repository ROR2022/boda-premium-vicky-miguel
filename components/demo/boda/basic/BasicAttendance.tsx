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

  const handleSubmit = (e: React.MouseEvent, recipient: 'groom' | 'bride') => {
    e.preventDefault()
    
    // Validar formulario
    if (!validateForm()) {
      return
    }
    
    // Formatear mensaje para WhatsApp
    const message = formatWhatsAppMessage(formData, recipient)
    
    // Enviar por WhatsApp
    sendWhatsAppMessage(message, recipient)
    
    // Mostrar confirmación
    setIsSubmitted(true)
  }

  const formatWhatsAppMessage = (data: typeof formData, recipient: 'groom' | 'bride') => {
    const attendanceStatus = data.response === 'yes' ? '✅ SÍ ASISTIRÉ' : '❌ NO PODRÉ ASISTIR'
    const companionsText = data.response === 'yes' && data.companions 
      ? `\n👥 *Acompañantes:* ${data.companions}` 
      : ''
    
    const contact = phoneNumbers[recipient]
    const greeting = recipient === 'groom' ? `Hola ${weddingConfig.couple.shortNames.groom}!` : `Hola ${weddingConfig.couple.shortNames.bride}!`
    
    return `🎊 *CONFIRMACIÓN DE ASISTENCIA - BODA ${weddingConfig.couple.displayNames.toUpperCase()}* 🎊

${greeting} ${contact.flag}

👤 *Nombre:* ${data.name}
📞 *Teléfono:* ${data.phone}
💒 *Asistencia:* ${attendanceStatus}${companionsText}

📅 *Fecha:* ${weddingConfig.event.date.full}
⛪ *Ceremonia:* ${weddingConfig.event.ceremony.time} - ${weddingConfig.event.ceremony.venue}
🎉 *Recepción:* ${weddingConfig.event.reception.time} - ${weddingConfig.event.reception.venue}

¡Gracias por confirmar! 💕`
  }

  const phoneNumbers = {
    groom: {
      number: weddingConfig.contact.whatsapp.groom.number,
      display: weddingConfig.contact.whatsapp.groom.display,
      name: weddingConfig.contact.whatsapp.groom.name,
      flag: weddingConfig.contact.whatsapp.groom.flag
    },
    bride: {
      number: weddingConfig.contact.whatsapp.bride.number,
      display: weddingConfig.contact.whatsapp.bride.display,
      name: weddingConfig.contact.whatsapp.bride.name,
      flag: weddingConfig.contact.whatsapp.bride.flag
    }
  }

  const validatePhoneNumber = (phone: string, country: 'mexico' | 'usa'): boolean => {
    const cleanPhone = phone.replace(/\D/g, '') // Solo dígitos
    
    if (country === 'mexico') {
      // México: 52 + código área + número = 12 dígitos
      return cleanPhone.length === 12 && cleanPhone.startsWith('52')
    } else {
      // USA: 1 + código área + número = 11 dígitos  
      return cleanPhone.length === 11 && cleanPhone.startsWith('1')
    }
  }

  const sendWhatsAppMessage = (message: string, recipient: 'groom' | 'bride') => {
    const contact = phoneNumbers[recipient]
    const country = recipient === 'groom' ? 'mexico' : 'usa'
    
    // Validar formato del número
    if (!validatePhoneNumber(contact.number, country)) {
      console.error('❌ Error: Formato de número inválido para', contact.name)
      alert(`Error en el número de WhatsApp de ${contact.name}. Contacta al administrador.`)
      return
    }
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${contact.number}?text=${encodedMessage}`
    
    // Debug info (remover en producción)
    console.log(`✅ Enviando a ${contact.name}:`, contact.display)
    console.log('📱 WhatsApp URL:', whatsappUrl)
    
    // Abrir WhatsApp en nueva ventana
    window.open(whatsappUrl, '_blank')
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
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {basicDemoData.attendance.title}
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            {basicDemoData.attendance.message}
          </p>
          <p className="text-gray-600">
            {basicDemoData.attendance.subtitle}
          </p>
        </div>

        {/* Demo Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 text-center">
          <div className="flex items-center justify-center gap-2 text-green-700">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">Integración WhatsApp Activa</span>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-3 border">
              <p className="text-green-700 font-semibold">{phoneNumbers.groom.flag} {phoneNumbers.groom.name}</p>
              <p className="text-green-600 text-sm">{phoneNumbers.groom.display}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border">
              <p className="text-green-700 font-semibold">{phoneNumbers.bride.flag} {phoneNumbers.bride.name}</p>
              <p className="text-green-600 text-sm">{phoneNumbers.bride.display}</p>
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

            {/* Botones de envío */}
            <div className="space-y-3">
              <p className="text-center text-gray-600 font-medium">Elegir a quién confirmar:</p>
              
              {/* Botón Novio */}
              <button
                onClick={(e) => handleSubmit(e, 'groom')}
                disabled={!formData.name || !formData.response || !formData.phone}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageCircle className="w-5 h-5" />
                🇲🇽 Confirmar con el Novio (Arodi)
              </button>
              
              {/* Botón Novia */}
              <button
                onClick={(e) => handleSubmit(e, 'bride')}
                disabled={!formData.name || !formData.response || !formData.phone}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageCircle className="w-5 h-5" />
                🇺🇸 Confirmar con la Novia (Vero)
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