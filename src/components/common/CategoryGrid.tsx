'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const CATEGORIES = [
  {
    name: 'Heritage Home & Brass',
    slug: 'home-decor',
    count: 'Sheesham & Brass',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    name: 'Handcrafted Silk & Apparel',
    slug: 'apparel',
    count: 'Pashmina & Banarasi',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    name: 'Artisanal Scents & Wellness',
    slug: 'wellness',
    count: 'Kannauj Attars & Oud',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    name: 'Premium Leather & Carry',
    slug: 'leather-bags',
    count: 'Himalayan Full-Grain',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
]

export function CategoryGrid() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#EA580C] block mb-1">
              Curated Craft Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F2C59] tracking-tight">
              Explore by Artisan Craft
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold text-[#EA580C] hover:underline flex items-center space-x-1"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.slug}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-3xl overflow-hidden group border border-slate-200 bg-white shadow-md min-h-[260px]"
            >
              <Link href={`/category/${cat.slug}`} className="block w-full h-full relative">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-[0.55]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2C59] via-transparent to-transparent opacity-90" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                      {cat.count}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#EA580C] transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black tracking-tight text-white group-hover:text-[#F97316] transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
