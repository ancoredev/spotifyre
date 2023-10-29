import { useEffect, useRef, useState } from "react"
import { useGlobalAudioPlayer } from "react-use-audio-player"

const useAudioTime = () => {
  const trackerRef = useRef<number>()
  const [position, setPosition] = useState(0)
  const { getPosition } = useGlobalAudioPlayer()
  
  useEffect(() => {
      const animate = () => {
          setPosition(getPosition())
          trackerRef.current = requestAnimationFrame(animate)
      }

      trackerRef.current = window.requestAnimationFrame(animate)

      return () => {
          if (trackerRef.current) {
              cancelAnimationFrame(trackerRef.current)
          }
      }
  }, [getPosition])
  
  return { position, setPosition, trackerRef };
}

export { useAudioTime }