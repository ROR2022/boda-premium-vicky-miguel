// Componentes premium exclusivos
export { PremiumHero } from './PremiumHero'
export { PremiumInvitation } from './PremiumInvitation'
export { PremiumPadrinos } from './PremiumPadrinos'
export { PremiumGallery } from './PremiumGallery'
export { PremiumThankYou } from './PremiumThankYou'
export { PremiumMusicPlayer } from './PremiumMusicPlayer'

// Datos del demo premium
export { premiumDemoData, type PremiumDemoData } from './data/premium-demo-data'

// Componentes básicos reutilizados (re-export para conveniencia)
export {
  BasicCountdown,
  BasicEventDetails,
  BasicAttendance,
  BasicGiftOptions
} from '@/components/demo/boda/basic'

// Nota: El paquete premium incluye TODAS las características del básico PLUS:
// - 🎵 Música personalizada (PremiumHero con MusicPlayer)
// - 🖼️ Galería de fotos (PremiumGallery)
// - 👥 Lista de padrinos (PremiumPadrinos - NUEVA característica)
// - 💌 Invitación completa con información de padres (PremiumInvitation)
// - 💝 Mensaje final personalizado (PremiumThankYou) 