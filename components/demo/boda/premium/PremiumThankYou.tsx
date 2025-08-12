"use client"

import { Heart, ArrowUp } from 'lucide-react'
import { premiumDemoData } from './data/premium-demo-data'

export function PremiumThankYou() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-white fill-current" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {premiumDemoData.thankYou.title}
          </h2>
        </div>

        {/* Mensaje principal */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-8">
          <p className="text-lg md:text-xl leading-relaxed mb-8">
            {premiumDemoData.thankYou.personalMessage}
          </p>
          
          <div className="border-t border-white/20 pt-8">
            <p className="text-lg mb-4">{premiumDemoData.thankYou.message}</p>
            <p className="text-2xl md:text-3xl font-bold text-pink-300">
              {premiumDemoData.thankYou.signature}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="space-y-4">
            <p className="text-sm opacity-80">
              {premiumDemoData.thankYou.footer.year}
            </p>
            <p className="text-lg font-semibold">
              {premiumDemoData.thankYou.footer.name}
            </p>
            <p className="text-sm opacity-80">
              {premiumDemoData.thankYou.footer.company}
            </p>
            <p className="text-xs opacity-60">
              {premiumDemoData.thankYou.footer.rights}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-2">
            {premiumDemoData.thankYou.footer.cta.question}
          </h3>
          <p className="text-sm mb-4 opacity-90">
            {premiumDemoData.thankYou.footer.cta.action}
          </p>
          <a
            href={premiumDemoData.thankYou.footer.cta.link}
            className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {premiumDemoData.thankYou.footer.cta.linkText}
          </a>
        </div>

        {/* Botón de regreso arriba */}
        <button
          onClick={scrollToTop}
          className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
          title="Regresar arriba"
        >
          <ArrowUp className="w-6 h-6" />
        </button>

        
      </div>
    </section>
  )
} 