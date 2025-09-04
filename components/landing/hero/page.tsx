'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import Link from 'next/link'
import  Logo  from '@/public/image/Logo.png'
import { ArrowRight, Menu, Rocket, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const menuItems = [
    { name: 'Features', href: '#FeaturesSection' },
    { name: 'About', href: '/about' },
]

export default function HeroSection() {
    const [menuState, setMenuState] = React.useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1024px)')
        const checkMobile = (e: MediaQueryList | MediaQueryListEvent) => {
            setIsMobile(e.matches)
        }
        checkMobile(mediaQuery)
        mediaQuery.addEventListener('change', checkMobile)
        return () => mediaQuery.removeEventListener('change', checkMobile)
    }, [])

    return (
        <>
            <header className="bg-transparent">
                <nav
                    data-state={menuState && 'active'}
                    className="fixed z-20 w-full bg-transparent md:relative bg-transparent">
                    <div className="m-auto max-w-5xl px-6 bg-transaprent">
                        <div className="flex flex-wrap items-center bg-transparent justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                            <div className="flex w-full justify-between bg-transparent lg:w-auto">
                                <Link
                                    href="/"
                                    aria-label="home"
                                    className="flex items-center space-x-2">
                                    <Image src={Logo} width={50} height={50} alt='logo' />
                                    <span className="text-white text-lg font-semibold">Reimagine AI</span>
                                </Link>

                                <div className="flex w-fit flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6 lg:hidden">
                                    <Button
                                        asChild
                                        size="sm">
                                        <Link href="/chat/anime">
                                            <span>get Started</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-transparent in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 border-transparent p-6 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                                <div className="lg:pr-4 hidden lg:block">
                                    <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    className="text-white hover:text-white block duration-150">
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
                                    <Button
                                        asChild
                                        size="sm">
                                        <Link href="/chat/anime">
                                            <span>get Started</span>
                                        </Link>
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="overflow-hidden">
                <section className="relative" style={{ minHeight: '100vh' }}>
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        onLoadedMetadata={() => {
                            if (videoRef.current) {
                                const duration = videoRef.current.duration
                                videoRef.current.currentTime = Math.max(0, duration - 3)
                            }
                        }}
                    >
                        <source src={isMobile ? "/backgrounds/loadingmobile.mp4" : "/backgrounds/loadingbg.mp4"} type="video/mp4" />
                    </video>
                    <div className="relative py-24 lg:py-28 z-20">
                        <div className="mx-auto max-w-7xl px-6 md:px-12">
                            <div className="text-center sm:mx-auto sm:w-10/12 lg:mr-auto lg:mt-0 lg:w-4/5">
                                <Link
                                    href="/"
                                    className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border p-1 pr-3">
                                    <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">New</span>
                                    <span className="text-sm text-white">Welcome to Reimaging</span>
                                    <span className="bg-(--color-border) block h-4 w-px"></span>

                                    <ArrowRight className="size-4" />
                                </Link>

                                <h1 className="mt-8 text-4xl text-white font-semibold md:text-5xl xl:text-5xl xl:[line-height:1.125]">
                                   <span className='text-primary'>Reimagine</span> is Empowering AI to imagine <br /> your favorite character in real life
                                </h1>
                                <p className="mx-auto mt-8 hidden max-w-2xl text-white text-wrap text-lg sm:block">Transform your favorite characters into interactive companions. Experience AI-powered chats that bring anime, fiction, and legendary figures to life in your conversations.</p>
                                <p className="mx-auto mt-6 max-w-2xl text-white text-wrap sm:hidden">Transform your favorite characters into interactive companions. Experience AI-powered chats that bring anime, fiction, and legendary figures to life in your conversations.</p>

                                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        size="lg"
                                        asChild>
                                        <Link href="/chat/anime">
                                            <Rocket className="relative size-4" />
                                            <span className="text-nowrap">let's have fun</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        asChild>
                                        <Link href="/about">
                                            <span className="text-nowrap">Learn More</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                            </main>
        </>
    )
}
