"use client"

import { useEffect, useState, useCallback } from 'react'

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

interface UseYouTubeAudioOptions {
  videoId: string
  startTime?: number
  loop?: boolean
  alternatives?: Array<{ videoId: string; startTime: number }>
  onReady?: () => void
  onError?: (error: any) => void
}

export function useYouTubeAudio({
  videoId,
  startTime = 0,
  loop = true,
  alternatives = [],
  onReady,
  onError
}: UseYouTubeAudioOptions) {
  const [player, setPlayer] = useState<any>(null)
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(-1) // -1 = main video
  const [currentVideoId, setCurrentVideoId] = useState(videoId)
  const [currentStartTime, setCurrentStartTime] = useState(startTime)

  // Inicializar YouTube player
  const initializePlayer = useCallback(() => {
    if (typeof window === 'undefined' || !window.YT) return

    // Verificar que el elemento DOM existe
    const playerElement = document.getElementById('youtube-audio-player')
    if (!playerElement) {
      //console.log('YouTube player element not found, retrying in 100ms...')
      setTimeout(initializePlayer, 100)
      return
    }

    try {
      const ytPlayer = new window.YT.Player('youtube-audio-player', {
        height: '0',
        width: '0',
        videoId: currentVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          start: currentStartTime,
          origin: window.location.origin, // Importante para CORS
          widget_referrer: window.location.origin
        },
        events: {
          onReady: (event: any) => {
            setPlayer(event.target)
            setIsReady(true)
            onReady?.()
          },
          onStateChange: (event: any) => {
            const playerState = event.data
            
            // YouTube Player States
            // -1 = unstarted, 0 = ended, 1 = playing, 2 = paused, 3 = buffering, 5 = cued
            setIsPlaying(playerState === 1)
            
            // Handle loop
            if (playerState === 0 && loop) { // Video ended
              event.target.seekTo(startTime)
              event.target.playVideo()
            }
          },
          onError: (event: any) => {
            let errorMessage = 'YouTube Player Error'
            
            switch (event.data) {
              case 2:
                errorMessage = 'Video ID inválido'
                break
              case 5:
                errorMessage = 'Video no disponible en HTML5'
                break
              case 100:
                errorMessage = 'Video no encontrado o privado'
                break
              case 101:
              case 150:
                errorMessage = 'Video no permite reproducción embebida'
                break
              default:
                errorMessage = `Código de error: ${event.data}`
            }
            
            console.error('YouTube Error Details:', {
              code: event.data,
              message: errorMessage,
              videoId: currentVideoId,
              attemptedIndex: currentVideoIndex
            })

            // Intentar video alternativo
            if (currentVideoIndex < alternatives.length - 1) {
              const nextIndex = currentVideoIndex + 1
              const nextVideo = alternatives[nextIndex]
              console.log(`Intentando video alternativo ${nextIndex + 1}/${alternatives.length}:`, nextVideo.videoId)
              
              setCurrentVideoIndex(nextIndex)
              setCurrentVideoId(nextVideo.videoId)
              setCurrentStartTime(nextVideo.startTime)
              setPlayer(null)
              setIsReady(false)
              setError(null)
              
              // Reinicializar con nuevo video
              setTimeout(() => {
                initializePlayer()
              }, 1000)
              return
            }

            // No hay más alternativas, mostrar error y activar fallback
            setError(errorMessage)
            onError?.(event.data)
          }
        }
      })
    } catch (err) {
      const errorMessage = 'Failed to initialize YouTube player'
      setError(errorMessage)
      onError?.(err)
      console.error(errorMessage, err)
    }
  }, [currentVideoId, currentStartTime, loop, onReady, onError, alternatives, currentVideoIndex])

  // Esperar a que YouTube API esté disponible
  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        initializePlayer()
      } else {
        // Si YouTube API no está disponible, esperar o configurar callback
        window.onYouTubeIframeAPIReady = initializePlayer
      }
    }

    checkYouTubeAPI()

    return () => {
      if (player) {
        try {
          player.destroy()
        } catch (err) {
          console.warn('Error destroying YouTube player:', err)
        }
      }
    }
  }, [initializePlayer, player])

  // Funciones de control
  const play = useCallback(() => {
    if (!player || !isReady) {
      console.log('YouTube player not ready yet')
      return
    }

    try {
      // Verificación adicional de que el player tiene los métodos necesarios
      if (typeof player.playVideo === 'function') {
        player.playVideo()
      } else {
        console.error('Player playVideo method not available')
        setError('Player not properly initialized')
      }
    } catch (err) {
      console.error('Error playing YouTube audio:', err)
      setError('Failed to play audio')
    }
  }, [player, isReady])

  const pause = useCallback(() => {
    if (!player || !isReady) {
      console.log('YouTube player not ready yet')
      return
    }

    try {
      if (typeof player.pauseVideo === 'function') {
        player.pauseVideo()
      } else {
        console.error('Player pauseVideo method not available')
        setError('Player not properly initialized')
      }
    } catch (err) {
      console.error('Error pausing YouTube audio:', err)
      setError('Failed to pause audio')
    }
  }, [player, isReady])

  const stop = useCallback(() => {
    if (!player || !isReady) {
      console.log('YouTube player not ready yet')
      return
    }

    try {
      if (typeof player.stopVideo === 'function') {
        player.stopVideo()
      } else {
        console.error('Player stopVideo method not available')
        setError('Player not properly initialized')
      }
    } catch (err) {
      console.error('Error stopping YouTube audio:', err)
      setError('Failed to stop audio')
    }
  }, [player, isReady])

  const seekTo = useCallback((seconds: number) => {
    if (!player || !isReady) {
      console.log('YouTube player not ready yet')
      return
    }

    try {
      if (typeof player.seekTo === 'function') {
        player.seekTo(seconds)
      } else {
        console.error('Player seekTo method not available')
        setError('Player not properly initialized')
      }
    } catch (err) {
      console.error('Error seeking YouTube audio:', err)
      setError('Failed to seek audio')
    }
  }, [player, isReady])

  return {
    player,
    isReady,
    isPlaying,
    error,
    play,
    pause,
    stop,
    seekTo
  }
}