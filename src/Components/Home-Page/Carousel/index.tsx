'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Transition } from '@headlessui/react'
import { carouselData } from '@/utils/data'


export default function Carousel() {
    const duration: number = 5000
    const itemsRef = useRef<HTMLDivElement>(null)
    const frame = useRef<number>(0)
    const firstFrameTime = useRef(performance.now())
    const [active, setActive] = useState<number>(0)
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        firstFrameTime.current = performance.now()
        frame.current = requestAnimationFrame(animate)
        return () => {
            cancelAnimationFrame(frame.current)
        }
    }, [active])

    const animate = (now: number) => {
        let timeFraction = (now - firstFrameTime.current) / duration
        if (timeFraction <= 1) {
            setProgress(timeFraction * 100)
            frame.current = requestAnimationFrame(animate)
        } else {
            timeFraction = 1
            setProgress(0)
            setActive((active + 1) % carouselData.length)
        }
    }

    useEffect(() => {
    }, [])

    return (
        <div className="w-full max-w-[1200px] mx-auto text-center relative py-6 px-4 flex items-center justify-center">
            {/* Item image */}
            <div className="transition-all duration-150 delay-300 ease-in-out h-52 max-lg:h-32 max-md:h-24 max-sm:h-16">
                <div className="relative flex flex-col" ref={itemsRef}>

                    {carouselData.map((item, index) => (
                        <Transition
                            key={index}
                            show={active === index}
                            enter="transition ease-in-out duration-500 order-first"
                            enterFrom="opacity-0 scale-105"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in-out duration-300 absolute"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Image className="rounded-xl h-52 max-lg:h-32 max-md:h-24 max-sm:h-16" src={`${process.env.BASE_PATH}${item}`} width={1500} height={100} alt='img' />
                        </Transition>
                    ))}

                </div>
            </div>
            {/* Buttons */}
            <div className="w-1/12 max-lg:w-2/12 max-md:w-3/12 mx-auto grid grid-cols-2 mt-8 absolute bottom-6 left-[44%] max-md:left-[40%]">

                {carouselData.map((item, index) => (
                    <button
                        key={index}
                        className="p-2 rounded focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 group"
                        onClick={() => { setActive(index); setProgress(0) }}
                    >
                        <span className={`text-center flex flex-col items-center ${active === index ? '' : 'opacity-50 group-hover:opacity-100 group-focus:opacity-100 transition-opacity'}`}>
                            <span className="block relative w-full bg-slate-200 h-1 rounded-full" role="progressbar" aria-valuenow={active === index ? progress : 0}>
                                <span className="absolute inset-0 bg-indigo-500 rounded-[inherit]" style={{ width: active === index ? `${progress}%` : '0%' }}></span>
                            </span>
                        </span>
                    </button>
                ))}

            </div>
        </div>
    )
}