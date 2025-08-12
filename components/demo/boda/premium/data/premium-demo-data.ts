import { basicDemoData } from '@/components/demo/boda/basic/data/basic-demo-data'
import { weddingConfig } from '../../data/wedding-config'

// Datos demo para el paquete premium de boda
// Ahora usa la configuración centralizada de wedding-config.ts
export const premiumDemoData = {
  // Heredar todos los datos del básico
  ...basicDemoData,
  
  // Sobreescribir hero con configuración de carrusel
  hero: {
    ...basicDemoData.hero,
    backgroundImages: weddingConfig.media.hero.backgroundImages,
    carouselSettings: {
      autoAdvance: true,
      interval: 3000, // 3 segundos
      showIndicators: true,
      showControls: true // flechas de navegación
    }
  },
  
  // Sobreescribir información demo con datos premium
  demo: {
    badge: "🌟 DEMO - Paquete Premium ($499)",
    description: "¡La más solicitada! - Incluye música, galería y padrinos",
    features: [
      ...basicDemoData.demo.features,
      "Música personalizada",
      "Galería de fotos", 
      "Lista de padrinos"
    ],
    cta: {
      title: "¿Te encanta el paquete Premium?",
      subtitle: "El más solicitado - Incluye TODAS las características esenciales + 3 premium exclusivas",
      buttonText: "Contratar Paquete Premium - $499",
      link: "/#pricing"
    }
  },
  
  // Configuración de música premium
  music: {
    title: weddingConfig.premium.music.title,
    source: weddingConfig.premium.music.source,
    youtube: weddingConfig.premium.music.youtube,
    track: weddingConfig.premium.music.localTrack, // CORREGIDO: usar localTrack
    autoplay: weddingConfig.premium.music.autoplay,
    loop: weddingConfig.premium.music.loop,
    description: weddingConfig.premium.music.description
  },
  
  // Información completa de invitación (característica premium)
  invitation: {
    title: "INVITACIÓN DE BODA",
    message: "Con gran alegría les invitamos a celebrar",
    subtitle: "Nuestra Boda",
    blessing: "con la bendición de Dios y nuestros padres:",
    celebrants: basicDemoData.event.celebrants,
    parents: basicDemoData.event.parents,
    decorativeMessage: "Los esperamos en este día tan especial"
  },
  
  // Lista de padrinos (característica premium NUEVA)
  padrinos: weddingConfig.premium.padrinos,
  
  // Galería de fotos (característica premium)
  gallery: weddingConfig.media.gallery,
  
  // Mensaje final personalizado (característica premium)
  thankYou: {
    title: weddingConfig.premium.thankYou.title,
    personalMessage: weddingConfig.premium.thankYou.personalMessage,
    message: weddingConfig.premium.thankYou.message,
    signature: weddingConfig.premium.thankYou.signature,
    footer: {
      year: "2025",
      name: `${weddingConfig.couple.displayNames.toUpperCase()} WEDDING`,
      company: "BY INVITACIONES WEB MX",
      rights: "ALL RIGHTS RESERVED",
      cta: {
        question: "¿TIENES UN EVENTO EN PUERTA?",
        action: "DISEÑA CON NOSOTROS TU INVITACIÓN WEB DIGITAL.",
        linkText: "AQUÍ",
        link: "https://invitacionesweb.lat"
      }
    }
  },
  
  // Configuración premium adicional
  premium: {
    hasMusic: true,
    hasGallery: true,
    hasPadrinos: true,
    hasFullInvitation: true,
    hasPersonalizedThankYou: true,
    badge: "PREMIUM",
    color: "from-purple-600 to-pink-600"
  }
}

export type PremiumDemoData = typeof premiumDemoData 