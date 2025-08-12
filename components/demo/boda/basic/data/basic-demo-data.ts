import { weddingConfig } from '../../data/wedding-config'

// Datos demo para el paquete básico de boda
// Ahora usa la configuración centralizada de wedding-config.ts
export const basicDemoData = {
  hero: {
    name: weddingConfig.couple.displayNames,
    subtitle: "¡Nos Casamos!",
    backgroundImage: "/images/boda/boda1.jpeg",
  },

  event: {
    celebrants: {
      bride: weddingConfig.couple.fullNames.bride,
      groom: weddingConfig.couple.fullNames.groom,
    },
    parents: {
      brideParents: {
        father: weddingConfig.parents.bride.father,
        mother: weddingConfig.parents.bride.mother,
      },
      groomParents: {
        father: weddingConfig.parents.groom.father,
        mother: weddingConfig.parents.groom.mother,
      },
    },
    date: {
      full: weddingConfig.event.date.full,
      day: weddingConfig.event.date.day,
      date: weddingConfig.event.date.date,
    },
    ceremony: {
      time: weddingConfig.event.ceremony.time,
      venue: weddingConfig.event.ceremony.venue,
      address: weddingConfig.event.ceremony.address,
      type: weddingConfig.event.ceremony.type,
    },
    party: {
      time: weddingConfig.event.reception.time,
      venue: weddingConfig.event.reception.venue,
      address: weddingConfig.event.reception.address,
      type: weddingConfig.event.reception.type,
    },
    dressCode: weddingConfig.event.dressCode,
    restrictions: weddingConfig.event.restrictions,
  },

  countdown: {
    targetDate: weddingConfig.event.date.countdown,
    backgroundImage: "/images/countdown-bg.jpg",
  },

  attendance: {
    title: "CONFIRMACIÓN DE ASISTENCIA",
    message: "Respetuosamente No Niños",
    subtitle: "Hemos decidido celebrar este momento sin niños, deseamos que esta decisión no les impida asistir a nuestra celebración",
    fields: {
      name: "Nombre completo",
      response: "¿Podrás acompañarnos?",
      companions: "Nombre(s) de acompañante(s)",
      phone: "Número de celular",
      responseOptions: {
        yes: "¡Claro, ahí estaré!",
        no: "Lo siento, no podré asistir.",
      },
    },
  },

  gifts: {
    title: weddingConfig.gifts.title,
    message: weddingConfig.gifts.message,
    options: weddingConfig.gifts.options
  },

  demo: {
    badge: "🎭 DEMO - Paquete Básico ($299)",
    description: "Esta es una demostración del paquete básico",
    features: [
      "Cuenta Regresiva",
      "Cuándo y dónde",
      "Confirmación de asistencia",
      "Opciones de regalo",
      "Código de vestimenta",
    ],
    cta: {
      title: "¿Te gusta este paquete?",
      subtitle: "Incluye todas las características esenciales para tu boda",
      buttonText: "Contratar Paquete Básico - $299",
      link: "/#pricing",
    },
  },
};

export type BasicDemoData = typeof basicDemoData;
