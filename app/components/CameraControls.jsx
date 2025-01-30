// components/Scene/CameraControls.jsx
'use client'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

const CameraControls = () => {
  const { camera } = useThree()
  const [walking, setWalking] = useState(false)
  const walkOffset = useRef(0)


  
  //--------------------------------------------------//
  useEffect(() => {
    
    const handleKeyDown = (event) => {
      const speed = 0.5
      const minZ = -7.5;
      const maxZ = 20;
      
      switch (event.key) {
        case 'w':
          if (camera.position.z - speed >= minZ) {
            camera.position.z -= speed
          }
          setWalking(true)
          break
          case 's':
            if (camera.position.z + speed <= maxZ) {
              camera.position.z += speed
            }
            setWalking(true)
            break
            case 'a':
              camera.position.x -= speed
              setWalking(true)
              break
              case 'd':
                camera.position.x += speed
                setWalking(true)
                break
                default:
                  break
                }
                camera.updateMatrixWorld()
    }


      

    const handleKeyUp = (event) => {
      if (['w', 's', 'a', 'd'].includes(event.key)) {
        setWalking(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [camera])

  // Walking effect
  // useEffect(() => {
  //   if (!walking) return

  //   let frameId
  //   const stepSpeed = 0.05 // Speed of the bounce
  //   const stepHeight = 0.025 // Height of the bounce

  //   const animateWalk = () => {
  //     walkOffset.current += stepSpeed
  //     //camera.position.y = Math.sin(walkOffset.current) * stepHeight // Bounce up and down
  //     frameId = requestAnimationFrame(animateWalk)
  //   }

  //   animateWalk()

  //   return () => {
  //     cancelAnimationFrame(frameId)
  //     camera.position.y = 0 // Reset to ground level when stopping
  //   }
  // }, [walking, camera])

  //---------------------------------------------------//

  return null
}

export default CameraControls
