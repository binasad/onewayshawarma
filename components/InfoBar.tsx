'use client'

import { useEffect, useRef } from 'react'
import { useLang } from '@/context/LanguageContext'

export default function InfoBar() {
  const { tr } = useLang()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const items = [
    { icon: '🕐', label: `${tr.infoBar.open} · ${tr.infoBar.days}`, sub: tr.infoBar.hours },
    { icon: '📍', label: 'Villa i Vila 84', sub: '08004 Barcelona' },
    { icon: '📞', label: '621 069 792', sub: 'WhatsApp & Llamadas' },
    { icon: '🛵', label: tr.infoBar.delivery, sub: tr.infoBar.minOrder },
    { icon: '✅', label: '100% Halal', sub: 'Certificado' },
  ]

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
      className="bg-dark-card border-y border-gold/20 py-4"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4">
          {items.map(({ icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xl">{icon}</span>
              <div>
                <p className="text-cream font-inter text-sm font-medium">{label}</p>
                <p className="text-muted font-inter text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
