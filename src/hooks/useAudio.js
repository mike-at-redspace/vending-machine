import { useRef } from 'react'

/**
 * Custom React hook to play an audio file from a given URL.
 *
 * @param {string} url - The URL of the audio file to play.
 * @returns {Function} play - Function to play the audio from the beginning.
 */
export function useAudio(url) {
  const audioRef = useRef(null)

  function play() {
    if (!audioRef.current) {
      audioRef.current = new window.Audio(url)
    }
    audioRef.current.currentTime = 0
    audioRef.current.play()
  }

  return play
}
