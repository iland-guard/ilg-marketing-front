import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { type ReactNode } from 'react'

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  once = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Float({
  children,
  className = '',
  amplitude = 10,
  duration = 4.5,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
  delay?: number
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export function FadePresence({
  show,
  children,
}: {
  show: boolean
  children: ReactNode
}) {
  return (
    <AnimatePresence>
      {show ? children : null}
    </AnimatePresence>
  )
}
