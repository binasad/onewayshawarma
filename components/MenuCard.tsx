'use client'

import { useLang } from '@/context/LanguageContext'
import { MenuItem, PriceOption } from '@/data/menu'

interface Props {
  item: MenuItem
  index: number
}

export default function MenuCard({ item, index }: Props) {
  const { lang, tr } = useLang()

  const openWhatsApp = () => {
    const name = item.name[lang]
    const msg = encodeURIComponent(`${tr.whatsapp.message}Me gustaría pedir: ${name}`)
    window.open(`https://wa.me/34621069792?text=${msg}`, '_blank')
  }

  const isFallback = Array.isArray(item.price)
    ? false
    : false

  const lowestPrice = Array.isArray(item.price)
    ? (item.price as PriceOption[])[0].price
    : item.price as string

  const badgeMap: Record<string, { label: string; color: string }> = {
    popular: { label: tr.menu.popular, color: 'bg-gold text-dark-bg' },
    halal: { label: tr.menu.halal, color: 'bg-green-700 text-white' },
    vegan: { label: tr.menu.vegan, color: 'bg-emerald-600 text-white' },
  }

  return (
    <div
      className="group relative bg-dark-card rounded-sm overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-400 flex flex-col"
      style={{
        animationDelay: `${index * 0.07}s`,
        transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 20px 40px rgba(201,168,76,0.12)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={item.image}
          alt={item.name[lang]}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-60" />

        {/* Badge */}
        {item.badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-inter font-bold tracking-wider uppercase px-2 py-1 rounded-sm ${badgeMap[item.badge].color}`}>
            {badgeMap[item.badge].label}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <h3 className="text-cream font-playfair text-lg leading-snug mb-1">{item.name[lang]}</h3>
          <p className="text-muted font-inter text-sm leading-relaxed line-clamp-2">{item.description[lang]}</p>
        </div>

        {/* Price + Button */}
        <div className="flex items-end justify-between gap-2 mt-auto pt-3 border-t border-white/5">
          <div>
            {Array.isArray(item.price) ? (
              <div className="flex flex-col gap-0.5">
                <span className="text-muted font-inter text-[10px] uppercase tracking-wider">{tr.menu.from}</span>
                <span className="text-gold font-playfair text-xl font-bold">{lowestPrice}</span>
              </div>
            ) : (
              <span className="text-gold font-playfair text-xl font-bold">{item.price as string}</span>
            )}
          </div>
          <button
            onClick={openWhatsApp}
            className="flex items-center gap-1.5 bg-transparent border border-gold/50 hover:bg-gold hover:border-gold text-gold hover:text-dark-bg font-inter text-xs tracking-widest uppercase px-3 py-2 transition-all duration-200 rounded-sm whitespace-nowrap"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {tr.menu.order}
          </button>
        </div>

        {/* Price breakdown for multi-price items */}
        {Array.isArray(item.price) && (item.price as PriceOption[]).length > 1 && (
          <div className="flex flex-wrap gap-2 -mt-1">
            {(item.price as PriceOption[]).map(p => (
              <span key={p.price} className="text-muted font-inter text-[10px]">
                {p.label[lang]}: <span className="text-cream/70">{p.price}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
