import { 
  Music, 
  MessageCircle, 
  Gift, 
  Camera, 
  Clock, 
  MapPin,
  LucideIcon
} from "lucide-react"

export interface InteractiveFeature {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string
  bgColor: string
  demo: {
    mockupImage: string
    animationType: 'bounce' | 'pulse' | 'slide' | 'fade'
  }
}

export const interactiveFeatures: InteractiveFeature[] = [
  {
    id: 'countdown',
    title: 'Cuenta Regresiva',
    description: 'Timer dinámico que cuenta los días, horas y minutos hasta tu evento especial',
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    demo: {
      mockupImage: '/images/cuenta1.png',
      animationType: 'pulse'
    }
  },
  {
    id: 'location',
    title: 'Ubicación con Maps',
    description: 'Botón directo a Google Maps',
    icon: MapPin,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    demo: {
      mockupImage: '/images/ubi1.png',
      animationType: 'bounce'
    }
  },
  {
    id: 'rsvp',
    title: 'Confirmación WhatsApp',
    description: 'Confirma asistencia fácilmente con un click directo a WhatsApp',
    icon: MessageCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    demo: {
      mockupImage: '/images/whats1.jpg',
      animationType: 'slide'
    }
  },
  {
    id: 'gifts',
    title: 'Mesa de Regalos',
    description: 'Lista interactiva de regalos con enlaces directos a tiendas en línea',
    icon: Gift,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    demo: {
      mockupImage: '/images/regalos1.png',
      animationType: 'fade'
    }
  },
  {
    id: 'gallery',
    title: 'Galería de Fotos',
    description: 'Hermosas galerías con fotos de la pareja y momentos especiales',
    icon: Camera,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
    demo: {
      mockupImage: '/images/galeria1.jpg',
      animationType: 'slide'
    }
  },
  {
    id: 'music',
    title: 'Música Personalizada',
    description: 'Reproductor de música con las canciones favoritas de los novios',
    icon: Music,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    demo: {
      mockupImage: '/images/music1.png',
      animationType: 'bounce'
    }
  }
]

export const demoConfig = {
  autoChangeInterval: 4000, // 4 segundos
  animationDuration: 600,
  phoneImageUrl: '/placeholder.svg?height=600&width=300&text=iPhone+Mockup',
  fallbackScreenImage: '/placeholder.svg?height=400&width=300&text=Default+Invitation'
} 