"use client"

interface YouTubeAudioPlayerProps {
  className?: string
}

export function YouTubeAudioPlayer({ className = "" }: YouTubeAudioPlayerProps) {
  return (
    <div 
      id="youtube-audio-player"
      className={`absolute opacity-0 pointer-events-none ${className}`}
      style={{
        width: 0,
        height: 0,
        overflow: 'hidden',
        zIndex: -1
      }}
      aria-hidden="true"
    />
  )
}