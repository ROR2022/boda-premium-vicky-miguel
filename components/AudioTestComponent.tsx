"use client"

import { useState, useRef, useEffect } from 'react'

export function AudioTestComponent() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [canPlay, setCanPlay] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const audioPath = "/images/custom/porSiempre.mp3"

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlay = () => {
      console.log('✅ Audio can play')
      setCanPlay(true)
      setError(null)
    }

    const handleError = (e: Event) => {
      const target = e.target as HTMLAudioElement
      console.error('❌ Audio error:', e)
      setError(`Error loading audio: ${target?.error?.message || 'Unknown error'}`)
      setCanPlay(false)
    }

    const handleLoadStart = () => {
      console.log('🔄 Audio load started')
    }

    const handleLoadedData = () => {
      console.log('✅ Audio data loaded')
    }

    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('loadeddata', handleLoadedData)

    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
        console.log('⏸️ Audio paused')
      } else {
        await audio.play()
        setIsPlaying(true)
        console.log('▶️ Audio playing')
      }
    } catch (err: unknown) {
      const error = err as Error
      console.error('❌ Play error:', err)
      setError(`Play error: ${error.message}`)
    }
  }

  return (
    <div className="fixed bottom-20 left-4 z-50 bg-white rounded-lg shadow-lg p-4 border">
      <h3 className="font-bold text-sm mb-2">🔊 Audio Test</h3>
      <div className="text-xs mb-2">
        <div>Path: {audioPath}</div>
        <div>Can Play: {canPlay ? '✅' : '❌'}</div>
        <div>Playing: {isPlaying ? '▶️' : '⏸️'}</div>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded text-xs mb-2">
          {error}
        </div>
      )}
      
      <button
        onClick={togglePlay}
        disabled={!canPlay}
        className={`px-3 py-1 text-xs rounded ${
          canPlay 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isPlaying ? '⏸️ Pause' : '▶️ Play'}
      </button>

      <audio
        ref={audioRef}
        src={audioPath}
        preload="auto"
        loop
      />
    </div>
  )
}
