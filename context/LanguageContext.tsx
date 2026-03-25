'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Lang = 'en' | 'es'

interface Translations {
  nav: { menu: string; about: string; contact: string }
  hero: { est: string; tagline: string; cta: string }
  infoBar: { open: string; days: string; hours: string; delivery: string; minOrder: string }
  menu: {
    title: string; subtitle: string
    tabs: { all: string; wraps: string; plates: string; sides: string; pizzas: string; salads: string; boxes: string }
    order: string; from: string; sinMenu: string; conMenu: string; popular: string; halal: string; vegan: string
    noImage: string
  }
  whyUs: {
    title: string
    items: { fresh: { title: string; desc: string }; halal: { title: string; desc: string }; fast: { title: string; desc: string } }
  }
  whatsapp: { tooltip: string; message: string }
  footer: { rights: string; delivery: string; minOrder: string }
}

const t: Record<Lang, Translations> = {
  en: {
    nav: { menu: 'Menu', about: 'About', contact: 'Contact' },
    hero: { est: 'EST. IN BARCELONA', tagline: 'Fresh. Hot. Delicious.', cta: 'Explore Our Menu' },
    infoBar: { open: 'Open', days: 'Mon – Sun', hours: '12:00 – 23:00', delivery: 'Delivery Available', minOrder: 'Min. Order 15€' },
    menu: {
      title: 'Our Menu', subtitle: 'Everything made fresh, served hot',
      tabs: { all: 'All', wraps: 'Durums & Wraps', plates: 'Plates', sides: 'Sides', pizzas: 'Pizzas', salads: 'Salads', boxes: 'Boxes' },
      order: 'Order Now', from: 'from', sinMenu: 'without menu', conMenu: 'with menu', popular: 'Popular', halal: 'Halal', vegan: 'Vegan',
      noImage: 'Ask us for this item',
    },
    whyUs: {
      title: 'Why Choose Us?',
      items: {
        fresh: { title: 'Fresh Daily', desc: 'Every dish prepared fresh every single day' },
        halal: { title: '100% Halal', desc: 'All our meat is certified halal' },
        fast: { title: 'Fast Delivery', desc: 'Hot food delivered to your door quickly' },
      },
    },
    whatsapp: { tooltip: 'Order on WhatsApp', message: 'Hi! I would like to order from Vila i Vila. ' },
    footer: { rights: 'All rights reserved', delivery: 'Delivery available across Barcelona', minOrder: 'Minimum order 15€' },
  },
  es: {
    nav: { menu: 'Menú', about: 'Nosotros', contact: 'Contacto' },
    hero: { est: 'EN BARCELONA', tagline: 'Fresco. Caliente. Delicioso.', cta: 'Ver Nuestro Menú' },
    infoBar: { open: 'Abierto', days: 'Lun – Dom', hours: '12:00 – 23:00', delivery: 'Servicio a Domicilio', minOrder: 'Pedido Mínimo 15€' },
    menu: {
      title: 'Nuestro Menú', subtitle: 'Todo preparado fresco, servido caliente',
      tabs: { all: 'Todo', wraps: 'Durums y Wraps', plates: 'Platos', sides: 'Acompañamientos', pizzas: 'Pizzas', salads: 'Ensaladas', boxes: 'Cajas' },
      order: 'Pedir Ahora', from: 'desde', sinMenu: 'sin menú', conMenu: 'con menú', popular: 'Popular', halal: 'Halal', vegan: 'Vegano',
      noImage: 'Pregúntenos por este plato',
    },
    whyUs: {
      title: '¿Por Qué Elegirnos?',
      items: {
        fresh: { title: 'Fresco Cada Día', desc: 'Cada plato preparado fresco todos los días' },
        halal: { title: '100% Halal', desc: 'Toda nuestra carne es certificada halal' },
        fast: { title: 'Entrega Rápida', desc: 'Comida caliente entregada en tu puerta' },
      },
    },
    whatsapp: { tooltip: 'Pedir por WhatsApp', message: '¡Hola! Me gustaría pedir de Vila i Vila. ' },
    footer: { rights: 'Todos los derechos reservados', delivery: 'Entrega disponible en Barcelona', minOrder: 'Pedido mínimo 15€' },
  },
}

interface LangCtx { lang: Lang; toggle: () => void; tr: Translations }
const LangContext = createContext<LangCtx>({ lang: 'es', toggle: () => {}, tr: t.es })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')
  const toggle = () => setLang(l => l === 'es' ? 'en' : 'es')
  return <LangContext.Provider value={{ lang, toggle, tr: t[lang] }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
