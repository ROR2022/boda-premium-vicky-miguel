export const features = [
  "Cuenta Regresiva",
  "Cuándo y dónde",
  "Confirmación de asistencia",
  "Opciones de regalo",
  "Código de vestimenta",
  "Música personalizada",
  "Galería",
  "Padrinos",
  "Hospedaje",
  "Itinerario",
  "Pases invitados",
]

export const plans = [
  {
    name: "BASIC",
    price: "$299",
    currency: "PESOS",
    features: [
      "Cuenta Regresiva",
      "Cuándo y dónde",
      "Confirmación de asistencia",
      "Opciones de regalo",
      "Código de vestimenta",
    ],
    popular: false,
  },
  {
    name: "PREMIUM",
    price: "$499",
    currency: "PESOS",
    badge: "¡La más solicitada!",
    features: [
      "Cuenta Regresiva",
      "Cuándo y dónde",
      "Confirmación de asistencia",
      "Opciones de regalo",
      "Código de vestimenta",
      "Música",
      "Galería",
      "Padrinos",
    ],
    popular: true,
  },
  {
    name: "VIP",
    price: "$699",
    currency: "PESOS",
    features: [
      "Cuenta Regresiva",
      "Cuándo y dónde",
      "Confirmación de asistencia",
      "Opciones de regalo",
      "Código de vestimenta",
      "Música",
      "Galería",
      "Padrinos",
      "Hospedaje",
      "Itinerario",
      "Pases invitados",
    ],
    popular: false,
  },
]

export const comparisonFeatures = [
  { name: "Cuenta Regresiva", basic: true, premium: true, vip: true },
  { name: "Cuándo y dónde", basic: true, premium: true, vip: true },
  { name: "Confirmación de asistencia", basic: true, premium: true, vip: true },
  { name: "Opciones de regalo", basic: true, premium: true, vip: true },
  { name: "Código de vestimenta", basic: true, premium: true, vip: true },
  { name: "Música personalizada", basic: false, premium: true, vip: true },
  { name: "Galería", basic: false, premium: true, vip: true },
  { name: "Padrinos", basic: false, premium: true, vip: true },
  { name: "Hospedaje", basic: false, premium: false, vip: true },
  { name: "Itinerario", basic: false, premium: false, vip: true },
  { name: "Pases invitados", basic: false, premium: false, vip: true },
]

export const heroContent = {
  title: "Invitaciones",
  subtitle: "INTERACTIVAS",
  description: "BODA • XV AÑOS • BAUTIZO • CUMPLEAÑOS",
  subdescription: "COMUNIÓN • GRADUACIÓN • Y MÁS"
}

export const interactiveInvitationContent = {
  title: "TU INVITACIÓN INTERACTIVA",
  subtitle: "SOLICÍTALA HOY MISMO",
  highlight: "¡Y PAGA AL RECIBIR!",
  buttonText: "Escríbenos por WhatsApp",
  featuresTitle: "¿QUÉ PUEDE INCLUIR?",
  bottomText: "¡SIN LÍMITE DE INVITADOS!"
}

export const ctaContent = {
  deliveryText: "Entregas súper rápidas, solo mandanos un mensaje y tendras tu invitación de 24-48 horas.",
  consultText: "Consulta por costos y servicios adicionales.",
  buttonText: "¡Solicítala ahora!",
  mainTitle: "No esperes más, somos la opción más económica y profesional que encontrarás.",
  description: "",
  finalTitle: ""
}

export const footerContent = {
  copyright: "INVITACIONES WEB MX © 2025. TODOS LOS DERECHOS RESERVADOS.",
  links: [
    { text: "Aviso de Privacidad", href: "/aviso-privacidad" },
    { text: "Términos y Condiciones", href: "/terminos-condiciones" }
  ]
} 