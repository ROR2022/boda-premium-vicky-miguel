// Configuración centralizada para la boda de Vicky & Miguel
// Este archivo contiene todos los datos específicos de la pareja

export const weddingConfig = {
  // ==========================================
  // CONFIGURACIÓN DE VISIBILIDAD
  // ==========================================
  display: {
    showParents: false,   // Ocultar información de padres
    showPadrinos: false   // Ocultar lista de padrinos
  },

  // ==========================================
  // INFORMACIÓN PRINCIPAL DE LOS NOVIOS
  // ==========================================
  couple: {
    // Nombres para mostrar en el hero
    displayNames: "Vicky & Miguel",
    shortNames: {
      bride: "Vicky",
      groom: "Miguel"
    },
    
    // Nombres completos oficiales
    fullNames: {
      bride: "Virginia Zavala Franco", // Cambiar por el nombre real
      groom: "Miguel Hernández Mola" // Cambiar por el nombre real
    },
    
    // Metadatos para SEO y título
    metaTitle: "Boda Vicky & Miguel",
    metaDescription: "Celebra con nosotros nuestra boda - Vicky & Miguel"
  },

  // ==========================================
  // INFORMACIÓN DE PADRES
  // ==========================================
  parents: {
    bride: {
      father: "CARLOS LÓPEZ GARCÍA", // Cambiar por nombres reales
      mother: "MARÍA HERNÁNDEZ TORRES"
    },
    groom: {
      father: "MIGUEL RODRÍGUEZ PÉREZ",
      mother: "ANA SANTOS LÓPEZ"
    }
  },

  // ==========================================
  // FECHA Y UBICACIONES DEL EVENTO
  // ==========================================
  event: {
    // Fecha completa
    date: {
      full: "Sábado 27 de Diciembre 2025", // Fecha real de Vicky & Miguel
      day: "Sábado",
      date: "27 de Diciembre 2025",
      countdown: "December 27, 2025 19:00:00" // Para el countdown - 7:00 PM
    },
    
    // Ceremonia religiosa
    ceremony: {
      time: "19:00 hrs.",
      venue: "jardín Ceiba", // Ubicación real de Vicky & Miguel
      address: "Cam. Curahueso, Plutarco Elias Calles, Centro, Tabasco",
      type: "Ceremonia Religiosa"
    },
    
    // Recepción
    reception: {
      time: "20:00 hrs.",
      venue: "jardín Ceiba", // Mismo lugar que la ceremonia
      address: "Cam. Curahueso, Plutarco Elias Calles, Centro, Tabasco",
      type: "Recepción"
    },
    
    // Detalles adicionales
    dressCode: "Formal",
    restrictions: "No Niños"
  },

  // ==========================================
  // CONTACTO Y WHATSAPP
  // ==========================================
  contact: {
    // Números de WhatsApp para confirmaciones
    whatsapp: {
      bride: {
        number: '525512345678', // Cambiar por número real
        display: '+52 55 1234 5678',
        name: 'Novia (Vicky)',
        flag: '🇲🇽'
      },
      groom: {
        number: '525587654321', // Cambiar por número real  
        display: '+52 55 8765 4321',
        name: 'Novio (Miguel)',
        flag: '🇲🇽'
      }
    }
  },

  // ==========================================
  // CARACTERÍSTICAS PREMIUM
  // ==========================================
  premium: {
    // Lista de padrinos (CAMBIAR POR DATOS REALES)
    padrinos: [
      { 
        role: "Padrinos de Lazo", 
        names: ["Juan Pérez", "María García"],
        description: ""
      },
      { 
        role: "Padrinos de Arras", 
        names: ["Carlos López", "Ana Martínez"],
        description: ""
      },
      { 
        role: "Madrina de Ramos", 
        names: ["", "Rosa Hernández"],
        description: ""
      },
      { 
        role: "Padrinos de Anillos", 
        names: ["Luis Santos", "Carmen Ruiz"],
        description: ""
      },
      { 
        role: "Pajecitos", 
        names: ["Sofía López", "Diego Rodríguez"],
        description: ""
      },
      { 
        role: "Agradecemos a", 
        names: ["Familia López", "Familia Rodríguez", "Familia García", "Familia Hernández"],
        description: ""
      }
    ],

    // Configuración de música
    music: {
      title: "Música Romántica",
      source: "local", // "youtube" o "local" - CAMBIADO A LOCAL para usar porSiempre.mp3
      youtube: {
        videoId: "P9iKATG9BW4", // ID del video de YouTube
        startTime: 10,
        alternatives: [
          { videoId: "Lg4fNsPSfhU", startTime: 5 },
          { videoId: "4QbPKGBYZcw", startTime: 15 },
          { videoId: "D_RY4LIlIt8", startTime: 20 }
        ]
      },
      localTrack: "/images/custom/porSiempre.mp3", // CORREGIDO: ruta con / inicial
      autoplay: false,
      loop: true,
      description: "Música romántica para nuestro día especial"
    },

    // Mensaje final personalizado
    thankYou: {
      title: "¡Gracias por ser parte de uno de los mejores días de nuestras vidas!",
      personalMessage: "Cada uno de ustedes tiene un lugar especial en nuestros corazones, y no podemos imaginar esta celebración sin su presencia.",
      message: "Con todo nuestro cariño:",
      signature: "Vicky & Miguel"
    }
  },

  // ==========================================
  // MULTIMEDIA
  // ==========================================
  media: {
    // Imágenes principales
    hero: {
      // Imágenes de fondo para el carrusel del hero - ACTUALIZADAS
      backgroundImages: [
        "/images/custom/vicky_miguel_1.jpg", // Foto principal de Vicky & Miguel
        "/images/custom/vicky_miguel_2.jpg", // Segunda foto destacada
        "/images/custom/vicky_miguel_3.jpg"  // Tercera foto destacada
      ]
    },

    // Galería premium (16 fotos usando las 10 reales + repeticiones)
    gallery: {
      title: "Nuestra Historia en Imágenes",
      subtitle: "Y hoy nos damos cuenta de que siempre estuvimos cerca, pero nuestra vidas se cruzaron hasta que era el momento indicado",
      description: "Dios nunca falla, sus tiempos son Perfectos",
      images: [
        // Primera ronda - todas las fotos originales (1-10)
        { src: "/images/custom/vicky_miguel_1.jpg", alt: "Vicky & Miguel - Momento 1" },
        { src: "/images/custom/vicky_miguel_2.jpg", alt: "Vicky & Miguel - Momento 2" },
        { src: "/images/custom/vicky_miguel_3.jpg", alt: "Vicky & Miguel - Momento 3" },
        { src: "/images/custom/vicky_miguel_4.jpg", alt: "Vicky & Miguel - Momento 4" },
        { src: "/images/custom/vicky_miguel_5.jpg", alt: "Vicky & Miguel - Momento 5" },
        { src: "/images/custom/vicky_miguel_6.jpg", alt: "Vicky & Miguel - Momento 6" },
        { src: "/images/custom/vicky_miguel_7.jpg", alt: "Vicky & Miguel - Momento 7" },
        { src: "/images/custom/vicky_miguel_8.jpg", alt: "Vicky & Miguel - Momento 8" },
        { src: "/images/custom/vicky_miguel_9.jpg", alt: "Vicky & Miguel - Momento 9" },
        { src: "/images/custom/vicky_miguel_10.jpg", alt: "Vicky & Miguel - Momento 10" },
        { src: "/images/custom/vicky_miguel_11.jpg", alt: "Vicky & Miguel - Momento 11" },

        // Segunda ronda - repetir las mejores fotos (4, 6, 7, 8, 9, 10)
        { src: "/images/custom/vicky_miguel_4.jpg", alt: "Vicky & Miguel - Momento Especial 1" },
        { src: "/images/custom/vicky_miguel_6.jpg", alt: "Vicky & Miguel - Momento Especial 2" },
        { src: "/images/custom/vicky_miguel_7.jpg", alt: "Vicky & Miguel - Momento Especial 3" },
        { src: "/images/custom/vicky_miguel_8.jpg", alt: "Vicky & Miguel - Momento Especial 4" },
        { src: "/images/custom/vicky_miguel_9.jpg", alt: "Vicky & Miguel - Momento Especial 5" },
        { src: "/images/custom/vicky_miguel_10.jpg", alt: "Vicky & Miguel - Momento Especial 6" },
        { src: "/images/custom/vicky_miguel_11.jpg", alt: "Vicky & Miguel - Momento Especial 7" }
      ]
    }
  },

  // ==========================================
  // OPCIONES DE REGALOS
  // ==========================================
  gifts: {
    title: "OPCIONES DE REGALO",
    message: "Su presencia es nuestro mejor regalo, pero si desean obsequiarnos algo, aquí están nuestras opciones:",
    options: [
      {
        icon: "🏪",
        title: "Mesa de Regalos Liverpool",
        description: "Folio: 51738287",
        details: "Visita cualquier tienda Liverpool o compra en línea en liverpool.com.mx\n\n• Ingresa el folio en el apartado de mesa de regalos\n• Los regalos se envían directamente a los novios\n• Válido hasta después del evento"
      },
      {
        icon: "💰",
        title: "Lluvia de Sobres",
        description: "El día del evento",
        details: "Puedes entregar tu sobre durante la ceremonia o recepción\n\n• Habrá un buzón especial para los sobres\n• Entrega personal también es bienvenida\n• Tu presencia es nuestro mejor regalo"
      },
      {
        icon: "🎁",
        title: "Transferencia Bancaria",
        description: "Si prefieres obsequiarnos dinero",
        details: "Puedes hacerlo a través de un sobre o mediante transferencia bancaria\n\n• Pregunta a los novios por los detalles"
      }
    ]
  }
}

export type WeddingConfig = typeof weddingConfig
