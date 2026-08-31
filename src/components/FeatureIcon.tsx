import type { LucideIcon } from 'lucide-react'
import {
  Ban,
  Brain,
  Car,
  Camera,
  ChartLine,
  CheckCircle2,
  Clock3,
  CreditCard,
  Eye,
  Filter,
  Headphones,
  Lightbulb,
  Megaphone,
  MessageCircle,
  Phone,
  ScanSearch,
  Shield,
  Smartphone,
  Sparkles,
  XCircle,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  eye: Eye,
  scan: ScanSearch,
  bulb: Lightbulb,
  filter: Filter,
  whatsapp: MessageCircle,
  phone: Phone,
  clock: Clock3,
  car: Car,
  megaphone: Megaphone,
  camera: Camera,
  brain: Brain,
  check: CheckCircle2,
  mobile: Smartphone,
  card: CreditCard,
  headset: Headphones,
  ban: Ban,
  magic: Sparkles,
  shield: Shield,
  x: XCircle,
  chart: ChartLine,
}

export function FeatureIcon({
  name,
  className = 'size-6',
}: {
  name: string
  className?: string
}) {
  const Icon = map[name] ?? Shield
  return <Icon className={className} strokeWidth={1.75} aria-hidden />
}
