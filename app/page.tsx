import { PremiumGallery } from "@/components/demo/boda/premium/PremiumGallery";
import { PremiumHero } from "@/components/demo/boda/premium/PremiumHero";
import { PremiumInvitation } from "@/components/demo/boda/premium/PremiumInvitation";
import { PremiumMusicPlayer } from "@/components/demo/boda/premium/PremiumMusicPlayer";
import { PremiumThankYou } from "@/components/demo/boda/premium/PremiumThankYou";
import { PremiumPadrinos } from "@/components/demo/boda/premium/PremiumPadrinos";
import { VipWeddingRoles } from "@/components/demo/boda/premium/VipWeddingRoles";
import { BasicCountdown } from "@/components/demo/boda/basic/BasicCountdown";
import { BasicEventDetails } from "@/components/demo/boda/basic/BasicEventDetails";
import { BasicAttendance } from "@/components/demo/boda/basic/BasicAttendance";
import { BasicGiftOptions } from "@/components/demo/boda/basic/BasicGiftOptions";
import { MusicProvider } from "@/context/music-context";
import { weddingConfig } from "@/components/demo/boda/data/wedding-config";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <MusicProvider>
      {/* Music Player premium (invisible, maneja el audio) */}
      <PremiumMusicPlayer />
      
      {/* Hero premium con música */}
      <PremiumHero />
      
      {/* Información de padres (premium) */}
      <PremiumInvitation />
      
      {/* Características básicas reutilizadas */}
      <BasicCountdown />
      <BasicEventDetails />
      
      {/* Características premium exclusivas */}
      <PremiumGallery />
      {weddingConfig.display.showPadrinos && <PremiumPadrinos />}
      
      {/* VIP Wedding Roles - Sistema de invitaciones personalizadas */}
      <VipWeddingRoles />
      
      {/* Confirmación y regalos (reutilizados del básico) */}
      <BasicAttendance />
      <BasicGiftOptions />
      
      {/* Mensaje final premium */}
      <PremiumThankYou />
      </MusicProvider>
    </div>
  )
}
