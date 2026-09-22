export const appStoreLinks = {
  googlePlay:
    'https://play.google.com/store/apps/details?id=com.bizz.sentraai',
  apple: 'https://apps.apple.com/us/app/sentra-ai/id6770271162',
} as const

export const navLinkIds = [
  'who',
  'problem',
  'solution',
  'works',
  'built',
  'faq',
] as const

export const navLinkHrefs: Record<(typeof navLinkIds)[number], string> = {
  who: '#WHO',
  problem: '#PROBLEM',
  solution: '#SOLUTION',
  works: '#WORKS',
  built: '#BUILT',
  faq: '#FAQ',
}

export const mayaStepIcons = [
  'eye',
  'scan',
  'bulb',
  'filter',
  'whatsapp',
  'phone',
  'bulb',
] as const

export const solutionFeatureIcons = [
  'clock',
  'car',
  'filter',
  'whatsapp',
  'phone',
  'megaphone',
] as const

export const howItWorksIcons = [
  'camera',
  'brain',
  'check',
  'mobile',
] as const

export const categoryIcons = ['x', 'chart', 'shield'] as const
