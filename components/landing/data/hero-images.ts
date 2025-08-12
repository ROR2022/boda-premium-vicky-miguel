export interface HeroImage {
  id: string
  src: string
  alt: string
  title: string
  subtitle: string
  category: 'boda' | 'quinces' | 'bautizo' | 'corporate'
}

export const heroImages: HeroImage[] = [
  {
    id: 'hero-boda-1',
    src: '/images/boda/boda8.jpeg',
    alt: 'Elegante invitación de boda digital',
    title: 'Invitaciones',
    subtitle: 'DE BODA',
    category: 'boda'
  },
  {
    id: 'hero-quinces-1', 
    src: '/images/quince/quince1.jpeg',
    alt: 'Hermosa invitación de quinceañera interactiva',
    title: 'Invitaciones',
    subtitle: 'DE XV AÑOS',
    category: 'quinces'
  },
  {
    id: 'hero-bautizo-1',
    src: '/images/bautizo/bautizo1.jpeg', 
    alt: 'Tierna invitación de bautizo personalizada',
    title: 'Invitaciones',
    subtitle: 'DE BAUTIZO',
    category: 'bautizo'
  },
  {
    id: 'hero-corporate-1',
    src: '/images/corporate/evento1.jpeg',
    alt: 'Profesional invitación corporativa',
    title: 'Invitaciones',
    subtitle: 'CORPORATIVAS',
    category: 'corporate'
  },
  {
    id: 'hero-boda-2',
    src: '/images/boda/boda2.jpeg',
    alt: 'Sofisticada invitación de boda con detalles dorados',
    title: 'Invitaciones',
    subtitle: 'ELEGANTES',
    category: 'boda'
  }
]

// Configuración del carrusel
export const carouselConfig = {
  autoplayInterval: 5000, // 5 segundos
  transitionDuration: 800, // 0.8 segundos
  pauseOnHover: true,
  showIndicators: true,
  showNavigation: true,
  preloadNext: true
} 