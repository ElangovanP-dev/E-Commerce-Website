'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ZoomIn } from 'lucide-react'

export function ImageGallery({ images = [] }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setMousePos({ x, y })
  }

  const currentImg = images[selectedIndex] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'

  return (
    <div className="space-y-4">
      {/* Main Image Stage with Magnifying Zoom Lens */}
      <div
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        className="relative aspect-square w-full rounded-3xl overflow-hidden bg-card border border-border cursor-zoom-in shadow-lg"
      >
        <Image
          src={currentImg}
          alt="Product view"
          fill
          priority
          className={`object-cover object-center transition-transform duration-200 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                }
              : undefined
          }
        />

        <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center space-x-1.5 pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5" />
          <span>Hover to Zoom Lens</span>
        </div>
      </div>

      {/* Thumbnails list */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                selectedIndex === idx
                  ? 'border-primary shadow-glow'
                  : 'border-border/60 hover:border-primary/50 opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
