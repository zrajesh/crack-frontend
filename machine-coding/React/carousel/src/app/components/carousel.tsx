"use client"

import type React from "react"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type SliderSettings = {
  // Basic settings
  slidesToShow: number
  slidesToScroll: number
  autoplay: boolean
  autoplaySpeed: number
  infinite: boolean

  // Optional advanced settings
  dots: boolean
  arrows: boolean
  centerMode: boolean
  centerPadding: string
  responsive?: Array<{
    breakpoint: number
    settings: Partial<Omit<SliderSettings, "responsive">>
  }>
  beforeChange?: (currentSlide: number, nextSlide: number) => void
  afterChange?: (currentSlide: number) => void
}

export type ImageSliderProps = {
  images?: string[]
  children?: ReactNode
  settings?: Partial<SliderSettings>
  className?: string
}

const defaultSettings: SliderSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  infinite: true,
  dots: true,
  arrows: true,
  centerMode: false,
  centerPadding: "50px",
}

const ImageSlider = ({ images = [], children, settings = {}, className = "" }: ImageSliderProps) => {
  const mergedSettings: SliderSettings = { ...defaultSettings, ...settings }
  const {
    autoplay,
    autoplaySpeed,
    infinite,
    dots,
    arrows,
    centerMode,
    centerPadding,
    responsive,
    beforeChange,
    afterChange,
  } = mergedSettings

  const [activeSlide, setActiveSlide] = useState(0)
  const [currentSettings, setCurrentSettings] = useState(mergedSettings)
  const [trackWidth, setTrackWidth] = useState(0)
  const [slideWidth, setSlideWidth] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)

  const sliderRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Items to render - either images or children
  const items = children
    ? Array.isArray(children)
      ? children
      : [children]
    : images.map((src, index) => (
        <div key={index} className="h-full">
          <img src={src || "/placeholder.svg"} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      ))

  // Total number of slides
  const totalSlides = items.length

  // Handle responsive settings
  useEffect(() => {
    const handleResize = () => {
      if (!responsive || !responsive.length) return

      const width = window.innerWidth
      let newSettings = { ...mergedSettings }

      // Find the appropriate responsive settings based on breakpoint
      for (let i = 0; i < responsive.length; i++) {
        if (width <= responsive[i].breakpoint) {
          newSettings = { ...newSettings, ...responsive[i].settings }
          break
        }
      }

      setCurrentSettings(newSettings)
      updateDimensions()
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [responsive])

  // Update dimensions when settings change
  useEffect(() => {
    updateDimensions()
  }, [currentSettings.slidesToShow, centerMode, centerPadding])

  // Handle autoplay
  useEffect(() => {
    if (autoplay && !isDragging) {
      startAutoplay()
    } else {
      stopAutoplay()
    }

    return () => stopAutoplay()
  }, [autoplay, autoplaySpeed, activeSlide, isDragging, currentSettings])

  // Calculate dimensions
  const updateDimensions = () => {
    if (!sliderRef.current || !trackRef.current) return

    const sliderWidth = sliderRef.current.offsetWidth
    const newSlideWidth = centerMode
      ? (sliderWidth - Number.parseInt(centerPadding) * 2) / currentSettings.slidesToShow
      : sliderWidth / currentSettings.slidesToShow

    setSlideWidth(newSlideWidth)
    setTrackWidth(newSlideWidth * totalSlides)

    // Update translateX to match the current active slide
    setTranslateX(calculateTranslateX(activeSlide))
  }

  // Calculate the translateX value for a given slide index
  const calculateTranslateX = (slideIndex: number) => {
    if (!sliderRef.current) return 0

    const sliderWidth = sliderRef.current.offsetWidth

    if (centerMode) {
      return -(slideIndex * slideWidth) + Number.parseInt(centerPadding)
    } else {
      return -(slideIndex * (sliderWidth / currentSettings.slidesToShow))
    }
  }

  // Start autoplay
  const startAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
    }

    autoplayTimerRef.current = setInterval(() => {
      goToNextSlide()
    }, autoplaySpeed)
  }

  // Stop autoplay
  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
      autoplayTimerRef.current = null
    }
  }

  // Go to next slide
  const goToNextSlide = () => {
    const nextSlide = activeSlide + currentSettings.slidesToScroll

    if (beforeChange) {
      beforeChange(activeSlide, nextSlide >= totalSlides ? 0 : nextSlide)
    }

    if (nextSlide >= totalSlides) {
      if (infinite) {
        setActiveSlide(0)
        setTranslateX(calculateTranslateX(0))
      }
    } else {
      setActiveSlide(nextSlide)
      setTranslateX(calculateTranslateX(nextSlide))
    }

    if (afterChange) {
      afterChange(nextSlide >= totalSlides ? 0 : nextSlide)
    }
  }

  // Go to previous slide
  const goToPrevSlide = () => {
    const prevSlide = activeSlide - currentSettings.slidesToScroll

    if (beforeChange) {
      beforeChange(activeSlide, prevSlide < 0 ? totalSlides - 1 : prevSlide)
    }

    if (prevSlide < 0) {
      if (infinite) {
        const newSlide = totalSlides - currentSettings.slidesToShow
        setActiveSlide(newSlide > 0 ? newSlide : 0)
        setTranslateX(calculateTranslateX(newSlide > 0 ? newSlide : 0))
      }
    } else {
      setActiveSlide(prevSlide)
      setTranslateX(calculateTranslateX(prevSlide))
    }

    if (afterChange) {
      afterChange(prevSlide < 0 ? totalSlides - 1 : prevSlide)
    }
  }

  // Go to specific slide
  const goToSlide = (slideIndex: number) => {
    if (beforeChange) {
      beforeChange(activeSlide, slideIndex)
    }

    setActiveSlide(slideIndex)
    setTranslateX(calculateTranslateX(slideIndex))

    if (afterChange) {
      afterChange(slideIndex)
    }
  }

  // Handle mouse/touch events for dragging
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    setStartX(clientX)
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const diff = clientX - startX

    setTranslateX(calculateTranslateX(activeSlide) + diff)
  }

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return

    setIsDragging(false)
    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX
    const diff = clientX - startX

    // Determine if we should go to the next/prev slide based on drag distance
    if (Math.abs(diff) > slideWidth / 3) {
      if (diff > 0) {
        goToPrevSlide()
      } else {
        goToNextSlide()
      }
    } else {
      // Reset to current slide if drag wasn't far enough
      setTranslateX(calculateTranslateX(activeSlide))
    }
  }

  // Render dots
  const renderDots = () => {
    if (!dots) return null

    const dotsArray = []
    for (let i = 0; i < totalSlides - currentSettings.slidesToShow + 1; i += currentSettings.slidesToScroll) {
      dotsArray.push(i)
    }

    return (
      <div className="flex justify-center gap-2 mt-4">
        {dotsArray.map((index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              activeSlide === index || (activeSlide > index && activeSlide < index + currentSettings.slidesToScroll)
                ? "bg-blue-600"
                : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} ref={sliderRef}>
      {/* Track */}
      <div
        ref={trackRef}
        className="flex transition-transform duration-300 ease-out"
        style={{
          width: `${trackWidth}px`,
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? "none" : "transform 300ms ease-out",
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0" style={{ width: `${slideWidth}px` }}>
            {item}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {arrows && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md z-10 hover:bg-white transition-colors"
            onClick={goToPrevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md z-10 hover:bg-white transition-colors"
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots */}
      {renderDots()}
    </div>
  )
}

export default ImageSlider

