"use client"

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import Image from 'next/image'
import { premiumDemoData } from './data/premium-demo-data'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
// Implementación de autoplay integrada

export function PremiumGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [isHovered, setIsHovered] = useState(false)

  const closeModal = useCallback(() => {
    setSelectedImage(null)
  }, [])

  const nextImage = useCallback(() => {
    if (selectedImage !== null) {
      setCurrentImageIndex((prev) => 
        prev === premiumDemoData.gallery.images.length - 1 ? 0 : prev + 1
      )
    }
  }, [selectedImage])

  const prevImage = useCallback(() => {
    if (selectedImage !== null) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? premiumDemoData.gallery.images.length - 1 : prev - 1
      )
    }
  }, [selectedImage])

  const openImage = useCallback((index: number) => {
    setSelectedImage(index)
    setCurrentImageIndex(index)
  }, [])

  // Autoplay implementation
  useEffect(() => {
    if (!carouselApi || isHovered) return

    const interval = setInterval(() => {
      carouselApi.scrollNext()
    }, 3500)

    return () => clearInterval(interval)
  }, [carouselApi, isHovered])

  // Manejar teclas ESC y flechas para navegación
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      
      switch (e.key) {
        case 'Escape':
          closeModal()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prevImage()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextImage()
          break
      }
    }

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage, closeModal, nextImage, prevImage])

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white fill-current" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {premiumDemoData.gallery.title}
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            {premiumDemoData.gallery.subtitle}
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {premiumDemoData.gallery.description}
          </p>
        </div>

        {/* Carousel de Imágenes */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setCarouselApi}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {premiumDemoData.gallery.images.map((image, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-1">
                    <div
                      className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      onClick={() => openImage(index)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={256}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                        priority={index < 4}
                      />
                      
                      {/* Overlay sutil en hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white fill-current" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Controles del carousel */}
            <CarouselPrevious className="left-2 h-12 w-12 bg-white/80 hover:bg-white border-0 shadow-lg" />
            <CarouselNext className="right-2 h-12 w-12 bg-white/80 hover:bg-white border-0 shadow-lg" />
          </Carousel>
        </div>

        {/* Modal Limpio de Imagen */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl max-h-full">
              {/* Imagen Principal */}
              <Image
                src={premiumDemoData.gallery.images[currentImageIndex].src}
                alt={premiumDemoData.gallery.images[currentImageIndex].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                priority
              />

              {/* Contador Simple */}
              <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentImageIndex + 1} / {premiumDemoData.gallery.images.length}
              </div>

              {/* Botón Cerrar */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-12 h-12 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                <X className="w-6 h-6" />
                <span className="sr-only">Cerrar galería</span>
              </button>

              {/* Navegación Anterior */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                <ChevronLeft className="w-6 h-6" />
                <span className="sr-only">Imagen anterior</span>
              </button>

              {/* Navegación Siguiente */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                <ChevronRight className="w-6 h-6" />
                <span className="sr-only">Imagen siguiente</span>
              </button>
            </div>
          </div>
        )}

        {/* Mensaje Especial */}
        <div className="mt-16 bg-white rounded-2xl p-8 text-center shadow-lg">
          <div className="flex justify-center mb-4">
            <Heart className="w-8 h-8 text-purple-600 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Momentos Especiales
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Cada foto cuenta una historia de amor, risas y momentos inolvidables. 
            Estas imágenes capturan la esencia de nuestra relación y la emoción 
            de prepararnos para nuestro día especial.
          </p>
        </div>
      </div>
    </section>
  )
}