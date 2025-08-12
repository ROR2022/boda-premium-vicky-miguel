"use client"

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMusicContext } from '@/context/music-context'
import { useYouTubeAudio } from '@/hooks/useYouTubeAudio'
import { YouTubeAudioPlayer } from '@/components/YouTubeAudioPlayer'
import { premiumDemoData } from './data/premium-demo-data'

export function PremiumHero() {
  const { isPlaying, setIsPlaying } = useMusicContext()
  
  // Estado del carrusel
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Estado del reproductor de audio
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [useLocalAudio, setUseLocalAudio] = useState(false)
  
  const images = premiumDemoData.hero.backgroundImages
  const settings = premiumDemoData.hero.carouselSettings

  // YouTube Audio Hook (solo si está configurado para YouTube)
  const {
    isReady: isYouTubeReady,
    play: playYouTube,
    pause: pauseYouTube,
    error: youtubeError
  } = useYouTubeAudio({
    videoId: premiumDemoData.music.source === 'youtube' ? premiumDemoData.music.youtube.videoId : '',
    startTime: premiumDemoData.music.youtube.startTime,
    alternatives: premiumDemoData.music.source === 'youtube' ? premiumDemoData.music.youtube.alternatives : [],
    loop: premiumDemoData.music.loop,
    onError: (error) => {
      console.error('YouTube Audio Error:', error)
      console.log('Activando fallback a audio local...')
      setUseLocalAudio(true)
    }
  })

  // Inicializar audio local (si está configurado como local o como fallback)
  useEffect(() => {
    if ((premiumDemoData.music.source === 'local' || useLocalAudio) && !audioElement) {
      console.log('Inicializando audio local...')
      const audio = new Audio(premiumDemoData.music.track)
      audio.loop = premiumDemoData.music.loop
      audio.preload = 'auto'
      setAudioElement(audio)
      
      return () => {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [useLocalAudio, audioElement])

  // Activar audio local automáticamente si está configurado
  useEffect(() => {
    if (premiumDemoData.music.source === 'local') {
      setUseLocalAudio(true)
    }
  }, [])

  // Timeout para fallback automático si YouTube no se carga
  useEffect(() => {
    if (!useLocalAudio && !isYouTubeReady && !youtubeError) {
      const fallbackTimer = setTimeout(() => {
        console.log('YouTube timeout - activando fallback automático a audio local')
        setUseLocalAudio(true)
      }, 5000) // 5 segundos timeout

      return () => clearTimeout(fallbackTimer)
    }
  }, [useLocalAudio, isYouTubeReady, youtubeError])

  // Controlar reproducción de audio (YouTube o local)
  useEffect(() => {
    if (useLocalAudio && audioElement) {
      // Usar audio local
      console.log('Usando audio local:', isPlaying ? 'play' : 'pause')
      if (isPlaying) {
        audioElement.play().catch(console.error)
      } else {
        audioElement.pause()
      }
      return
    }

    // Usar YouTube
    if (!isYouTubeReady) {
      console.log('YouTube not ready yet, waiting...')
      return
    }

    if (youtubeError) {
      console.error('YouTube error detected, switching to local audio:', youtubeError)
      setUseLocalAudio(true)
      return
    }

    // Pequeño delay para asegurar que el player esté completamente listo
    const timer = setTimeout(() => {
      if (isPlaying) {
        console.log('Attempting to play YouTube audio...')
        playYouTube()
      } else {
        console.log('Attempting to pause YouTube audio...')
        pauseYouTube()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [isPlaying, isYouTubeReady, playYouTube, pauseYouTube, youtubeError, useLocalAudio, audioElement])

  // Auto-avance del carrusel
  useEffect(() => {
    if (!settings.autoAdvance) return
    
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, settings.interval)

    return () => clearInterval(timer)
  }, [settings.autoAdvance, settings.interval, images.length])

  // Funciones de navegación del carrusel
  const nextImage = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
      setIsTransitioning(false)
    }, 150)
  }

  const prevImage = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
      setIsTransitioning(false)
    }, 150)
  }

  const goToImage = (index: number) => {
    if (index !== currentImageIndex) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentImageIndex(index)
        setIsTransitioning(false)
      }, 150)
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Carrusel de imágenes de fondo */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentImageIndex 
              ? `opacity-${isTransitioning ? '50' : '100'}` 
              : 'opacity-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      ))}
      
      {/* Overlay de gradiente premium */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30"></div>
      
      {/* Contenido principal */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-in">
          <span className="text-pink-300 font-script italic">
            {premiumDemoData.hero.name}
          </span>
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wider animate-fade-in-delay">
          {premiumDemoData.hero.subtitle}
        </h2>
        
        {/* Información adicional */}
        <div className="mt-8 space-y-2">
          <p className="text-xl md:text-2xl font-medium">
            {premiumDemoData.event.date.full}
          </p>
          <p className="text-lg md:text-xl opacity-90">
            {premiumDemoData.event.ceremony.venue}
          </p>
        </div>

        {/* Indicador de música */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            isPlaying ? 'bg-pink-400 animate-pulse' : 
            (useLocalAudio || isYouTubeReady) ? 'bg-gray-400' :
            'bg-yellow-400'
          }`}></div>
          <span className="text-sm opacity-80">
            {isPlaying ? 'Música romántica reproduciéndose' :
             useLocalAudio ? 'Audio de alta calidad disponible' :
             isYouTubeReady ? 'Audio YouTube disponible' :
             'Cargando música...'}
          </span>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Botón de música flotante */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Controles de navegación del carrusel */}
      {settings.showControls && (
        <>
          {/* Flecha izquierda */}
          <button
            onClick={prevImage}
            className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300 z-20"
            title="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Flecha derecha */}
          <button
            onClick={nextImage}
            className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300 z-20"
            title="Siguiente imagen"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Indicadores del carrusel */}
      {settings.showIndicators && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              title={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* YouTube Audio Player (invisible) */}
      <YouTubeAudioPlayer />
    </section>
  )
} 