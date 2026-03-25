'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/context/LanguageContext'

export default function Navbar() {
  const { lang, toggle, tr } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
        padding: scrolled ? '12px 0' : '20px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-start">
          <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-inter">Doner Kebab &amp; Pizzeria</span>
          <span className="text-cream font-playfair text-2xl font-bold leading-tight tracking-tight">Vila i Vila</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: tr.nav.menu, id: 'menu' },
            { label: tr.nav.about, id: 'whyus' },
            { label: tr.nav.contact, id: 'footer' },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-cream/70 hover:text-gold text-sm tracking-widest uppercase font-inter transition-colors duration-200"
            >
              {label}
            </button>
          ))}

          {/* Language Toggle */}
          <LanguageToggle lang={lang} toggle={toggle} />
        </div>

        {/* Mobile right */}
        <div className="flex md:hidden items-center gap-4">
          <LanguageToggle lang={lang} toggle={toggle} />
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="flex flex-col gap-[5px] p-1"
            aria-label="Menu"
          >
            <span className={`block w-6 h-[1.5px] bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? '200px' : '0', background: 'rgba(13,13,13,0.98)' }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {[
            { label: tr.nav.menu, id: 'menu' },
            { label: tr.nav.about, id: 'whyus' },
            { label: tr.nav.contact, id: 'footer' },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-cream/80 text-sm tracking-widest uppercase font-inter text-left py-1 border-b border-white/5"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

function LanguageToggle({ lang, toggle }: { lang: string; toggle: () => void }) {
  const isEN = lang === 'en'
  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="relative flex items-center rounded-full border border-gold/40 overflow-hidden font-inter text-xs font-semibold tracking-widest uppercase"
      style={{ background: '#1A1A1A', padding: '3px' }}
    >
      {/* sliding pill */}
      <span
        className="absolute top-[3px] bottom-[3px] w-[calc(50%-3px)] rounded-full bg-gold transition-all duration-300 ease-in-out"
        style={{ left: isEN ? 'calc(50%)' : '3px' }}
      />
      <span className={`relative z-10 px-3 py-1 transition-colors duration-300 ${!isEN ? 'text-dark-bg' : 'text-cream/50'}`}>ES</span>
      <span className={`relative z-10 px-3 py-1 transition-colors duration-300 ${isEN ? 'text-dark-bg' : 'text-cream/50'}`}>EN</span>
    </button>
  )
}
