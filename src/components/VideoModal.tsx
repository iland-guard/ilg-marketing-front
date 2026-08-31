import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

function toEmbed(url: string) {
  try {
    const cleaned = url.trim()
    if (cleaned.includes('embed/')) {
      const base = cleaned.split('?')[0]
      return `${base}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    }
    const withProto = cleaned.startsWith('http') ? cleaned : `https://${cleaned}`
    const u = new URL(withProto)
    let id = u.searchParams.get('v')
    if (!id) {
      const parts = u.pathname.split('/').filter(Boolean)
      id = parts[parts.length - 1]
    }
    if (!id) return cleaned
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
  } catch {
    return url
  }
}

export function VideoModal({
  open,
  url,
  onClose,
}: {
  open: boolean
  url: string | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && url ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
        >
          <motion.div
            className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-20 rounded-full bg-black/70 p-2 text-white hover:bg-black/90"
              aria-label="Close video"
            >
              <X className="size-5" />
            </button>

            {/* Keep 16:9 box; iframe absolutely fills it (avoids global height:auto collapse) */}
            <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
              <iframe
                key={url}
                title="Sentra AI video"
                src={toEmbed(url)}
                className="absolute inset-0 h-full w-full"
                style={{ height: '100%', width: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
