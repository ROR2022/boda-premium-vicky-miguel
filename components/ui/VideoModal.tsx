"use client"

import { useEffect } from 'react'
import { X, Video } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoSrc: string
  title: string
  description?: string
}

export function VideoModal({ 
  isOpen, 
  onClose, 
  videoSrc, 
  title, 
  description 
}: VideoModalProps) {
  
  // Auto-pausar video al cerrar modal
  useEffect(() => {
    if (!isOpen) {
      // Pausar todos los videos cuando se cierre el modal
      const videos = document.querySelectorAll('video')
      videos.forEach(video => {
        if (!video.paused) {
          video.pause()
        }
      })
    }
  }, [isOpen])

  // Manejar ESC para cerrar
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black border-0">
        {/* Header con título y botón cerrar */}
        <DialogHeader className="p-4 bg-black text-white relative">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-purple-400" />
            <DialogTitle className="text-lg font-semibold text-white">
              {title}
            </DialogTitle>
          </div>
          {description && (
            <p className="text-gray-300 text-sm mt-1">{description}</p>
          )}
          
          {/* Botón cerrar personalizado */}
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-all hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:pointer-events-none">
            <X className="h-5 w-5 text-white" />
            <span className="sr-only">Cerrar video</span>
          </DialogClose>
        </DialogHeader>

        {/* Contenedor del video */}
        <div className="relative bg-black">
          <video
            className="w-full h-auto max-h-[70vh] object-contain"
            controls
            autoPlay
            playsInline
            preload="metadata"
            onError={(e) => {
              console.error('Error loading video:', e)
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            <p className="text-white p-4">
              Tu navegador no soporta la reproducción de video. 
              <a 
                href={videoSrc} 
                download 
                className="text-purple-400 hover:text-purple-300 underline ml-1"
              >
                Descargar video
              </a>
            </p>
          </video>
          
          {/* Loading overlay */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300 pointer-events-none">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p>Cargando video...</p>
            </div>
          </div>
        </div>

        {/* Footer con información adicional */}
        <div className="p-4 bg-gray-900 text-gray-300 text-sm">
          <p className="flex items-center gap-2">
            <span>💡</span>
            Usa los controles del video para ajustar volumen, pantalla completa y más opciones
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}