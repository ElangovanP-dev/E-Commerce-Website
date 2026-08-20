'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const CATEGORIES = [
  {
    name: 'Cyber & Audio Tech',
    slug: 'audio-tech',
    count: '8 Products',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    name: 'Minimalist Apparel',
    slug: 'apparel',
    count: '12 Products',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    name: 'Horology & Timepieces',
    slug: 'timepieces',
    count: '6 Products',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    name: 'Japandi Home Living',
    slug: 'home-living',
    count: '10 Products',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    name: 'Luxury Carry & Bags',
    slug: 'carry-bags',
    count: '9 Products',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
]

export function CategoryGrid() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Explore by Category
            </h2>
          </div>
          <Link
            href="/#products"
            className="text-xs font-semibold text-muted-fg hover:text-primary transition-colors flex items-center space-x-1"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className={`relative rounded-3xl overflow-hidden group border border-border bg-card shadow-lg ${
                cat.featured ? 'lg:col-span-2 min-h-[280px]' : 'min-h-[280px]'
              }`}
            >
              <Link href={`/category/${cat.slug}`} className="block w-full h-full relative">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.65] group-hover:brightness-[0.55]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between text-foreground">
                  <div className="flex justify-between items-start">
                    <span className="bg-black/30 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[11px] font-mono text-muted-fg">
                      {cat.count}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-md border border-border text-foreground flex items-center justify-center group-hover:bg-primary group-hover:text-primary-fg transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
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
