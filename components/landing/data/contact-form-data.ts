export const contactFormData = {
  title: "¡Contáctanos!",
  subtitle: "Cuéntanos sobre tu evento y te ayudaremos a crear la invitación perfecta",
  
  // Tipos de eventos disponibles
  eventTypes: [
    { value: "boda", label: "Boda", icon: "💒" },
    { value: "quince", label: "XV Años", icon: "👑" },
    { value: "bautizo", label: "Bautizo", icon: "👶" },
    { value: "cumpleanos", label: "Cumpleaños", icon: "🎂" },
    { value: "corporativo", label: "Evento Corporativo", icon: "🏢" },
    { value: "otro", label: "Otro", icon: "🎉" }
  ],
  
  // Paquetes disponibles
  packages: [
    { 
      value: "basico", 
      label: "Paquete Básico", 
      icon: "📱",
      price: "$299",
      features: ["Cuenta regresiva", "Información del evento", "Confirmación de asistencia", "Opciones de regalo", "Código de vestimenta"]
    },
    { 
      value: "premium", 
      label: "Paquete Premium", 
      icon: "✨",
      price: "$499",
      features: ["Todo del Básico", "Música personalizada", "Galería de fotos", "Lista de padrinos", "Invitación completa"]
    },
    { 
      value: "vip", 
      label: "Paquete VIP", 
      icon: "👑",
      price: "$699",
      features: ["Todo del Premium", "Hospedaje recomendado", "Itinerario completo", "Pases de invitados", "Playlist múltiple"]
    }
  ],
  
  // Configuración del WhatsApp
  whatsapp: {
    phone: "7777937484",
    countryCode: "52", // México
    messageTemplate: (name: string, eventType: string, packageType: string, description: string) => {
      const eventTypeLabel = contactFormData.eventTypes.find(t => t.value === eventType)?.label || eventType;
      const packageInfo = contactFormData.packages.find(p => p.value === packageType);
      
      return `¡Hola! Me interesa una invitación digital personalizada.

📋 Información del evento:
• Nombre: ${name}
• Tipo de evento: ${eventTypeLabel}
• Paquete de interés: ${packageInfo?.label || packageType} ${packageInfo?.price ? `(${packageInfo.price})` : ''}
• Descripción: ${description}

🎯 Me gustaría conocer más sobre este paquete y confirmar disponibilidad.

¡Gracias!`;
    }
  },
  
  // Mensajes de validación
  validation: {
    name: {
      required: "El nombre es obligatorio",
      minLength: "El nombre debe tener al menos 2 caracteres",
      maxLength: "El nombre no puede exceder 50 caracteres"
    },
    eventType: {
      required: "Por favor selecciona el tipo de evento"
    },
    package: {
      required: "Por favor selecciona un paquete"
    },
    description: {
      required: "Por favor describe tu evento",
      minLength: "La descripción debe tener al menos 10 caracteres",
      maxLength: "La descripción no puede exceder 200 caracteres"
    }
  },
  
  // Textos del formulario
  form: {
    nameLabel: "Tu nombre completo",
    namePlaceholder: "Ej: María González",
    eventTypeLabel: "Tipo de evento",
    eventTypePlaceholder: "Selecciona el tipo de evento",
    packageLabel: "Paquete de interés",
    packagePlaceholder: "Selecciona el paquete que te interesa",
    descriptionLabel: "Descripción de tu evento",
    descriptionPlaceholder: "Cuéntanos sobre tu evento, fecha, lugar, tema, etc.",
    submitButton: "Enviar WhatsApp",
    cancelButton: "Cancelar"
  },
  
  // Mensajes de confirmación
  messages: {
    success: "¡Perfecto! Se abrirá WhatsApp con tu mensaje",
    error: "Por favor completa todos los campos correctamente",
    loading: "Preparando mensaje..."
  }
}; 