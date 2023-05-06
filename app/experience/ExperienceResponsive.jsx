import { Suspense, useEffect, useMemo } from 'react'
import { PerspectiveCamera, OrbitControls, Box, ScrollControls, Scroll, Sparkles, useVideoTexture, Float, Cylinder, Sphere, Html } from '@react-three/drei'
import CausticLightShort from './CausticLightShort'
import NearObjects from './NearObjects'
import FarObjects from './FarObjects'
import Sand from './Sand'
import SubAndMic from './SubAndMic'
import { useThree } from '@react-three/fiber'
import Image from 'next/image'
import Model from './Model'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '/tailwind.config.js'
import { useMediaQuery } from '@react-hook/media-query'
import { ExperienceText } from './ExperienceText'



const fullConfig = resolveConfig(tailwindConfig)
const maxWidth = fullConfig.theme.screens.xl
const translateXValue = `calc(max-w-screen-xl / 2)`
// debugger
console.log(translateXValue)



function remap(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1)
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
}



export default function ExperienceResponsive() {
    const { viewport, camera } = useThree();
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const dimensions = viewport.getCurrentViewport(camera, [0, 13, 0])
    const ratio = viewport.aspect
    // console.log(`ratio: ${ratio}`)
    const zoom = remap(ratio, 1.96, 6.17, 1, 2.99)
    const clampedZoom = clamp(zoom, 0.7, 4)
    const visibleHeight = 2 * Math.tan((Math.PI / 180) * camera.fov / 2) * 13;
    const visibleWidth = visibleHeight * camera.aspect;

    console.log(viewport.width)
    // console.log(window.innerHeight)
    // console.log(`aspect: ${widthAtCameraHeight.width / widthAtCameraHeight.height}`)
    // console.log(camera.getEffectiveFOV())
    return (
        <Suspense>
            <PerspectiveCamera makeDefault position={[0, 13, 7]} zoom={clampedZoom} />
            <fog attach="fog" color={typeof backgroundColor != 'undefined' ? backgroundColor : "#0fa2ab"} near={-25} far={50} />
            <ambientLight intensity={.5} />
            {/* <OrbitControls maxPolarAngle = {Math.PI/2}/> */}

            <Sparkles
                position={[0, 10, 0]}
                count={2000}
                speed={0.1}
                opacity={0.8}
                size={1}
                scale={20}
            />
            {/**Caustic light seems to make page error out every 1/20 times */}
            <CausticLightShort />
            <FarObjects />
            <Sand />
            {/* <Box position={[0, 13, 0]}></Box> */}
            {/* <Boxes /> */}
            <Float>


                <Model
                    model="Water_Ship_001"
                    scale={1}
                    position={isDesktop ? [10, 15, -10] : [3, 15, -10]}
                />

            </Float>

            <Model
                model="Coralls_008"
                scale={1}
                position={isDesktop ? [-2.8, 5, -3] : [-0.3, 5. - 3]}
                rotation={[0, -3, 0]}
            />

            <Model
                model="Coral_026"
                scale={1}
                position={isDesktop ? [-4.9, 6.8, -1.3] : [-2.9, 6.8, -1.3]}
                rotation={[1, -3, 0]}
            />

            {/*Starfish*/}
            <Model
                model="Coral_005"
                scale={1}
                position={isDesktop ? [-6.7, 10.7, -2.5] : [-2.8, 10.7, -2.5]}
                rotation={isDesktop ? [1, 0, -1.6] : [1, 0, -1.2]}
            />

            <Model
                model="Rock_021"
                scale={1}
                position={[-(viewport.width / 2) + 5.5, 8.5, -3.5]}
                rotation={[0, -3, 0]}
            />
            <ExperienceText />
        </Suspense>
    )
}

function Boxes() {
    const { viewport } = useThree()
    const currentViewport = viewport
    const width = currentViewport.width
    const boxes = []
    for (let i = 0; i < 10; i++) {
        const color = i % 2 == 0 ? 'hotPink' : 'turquoise'
        //Box is set back by 0.5 so the faces are at origin.
        boxes.push(<Box position={[-(width / 2) + i + 0.5, 13, -0.5]} material-color={color} />)
    }
    return boxes
}

