export const appStoreLinks = {
  googlePlay:
    'https://play.google.com/store/apps/details?id=com.bizz.sentraai',
  apple: 'https://apps.apple.com/us/app/sentra-ai/id6770271162',
} as const

export const navLinks = [
  { href: '/#WHO', label: 'WHO WE ARE' },
  { href: '/#PROBLEM', label: 'THE PROBLEM' },
  { href: '/#SOLUTION', label: 'THE SOLUTION' },
  { href: '/#WORKS', label: 'HOW IT WORKS' },
  { href: '/#BUILT', label: 'FOR WHO IT BUILT' },
  { href: '/#FAQ', label: 'FAQ' },
] as const

export const mayaSteps = [
  {
    title: 'Maya Watches',
    description: 'Maya continuously monitors the cameras and areas you select.',
    icon: 'eye',
  },
  {
    title: 'Maya Detects',
    description:
      'She identifies people, vehicles and unusual activity in real time.',
    icon: 'scan',
  },
  {
    title: 'Maya Verifies',
    description:
      'She analyzes the event and helps distinguish real activity from unnecessary alerts.',
    icon: 'bulb',
  },
  {
    title: 'Maya Notifies',
    description:
      'She sends clear WhatsApp alerts with the relevant image, camera and event information.',
    icon: 'filter',
  },
  {
    title: 'Maya Calls',
    description:
      'For urgent events, Maya can call you and your selected emergency contacts.',
    icon: 'whatsapp',
  },
  {
    title: 'Maya Responds',
    description:
      'She can activate connected sirens or deterrence systems automatically or upon your approval.',
    icon: 'phone',
  },
  {
    title: 'Maya Keeps Watching',
    description:
      'Maya continues following the event until the situation is resolved.',
    icon: 'bulb',
  },
] as const

export const solutionFeatures = [
  {
    title: '24/7 AI Monitoring',
    description: 'Always-on camera monitoring.',
    icon: 'clock',
  },
  {
    title: 'Person & Vehicle Detection',
    description: 'Identifies real movement and risk.',
    icon: 'car',
  },
  {
    title: 'False Alarm Filtering',
    description: 'Reduces unnecessary noise.',
    icon: 'filter',
  },
  {
    title: 'WhatsApp Photo Alerts',
    description: 'Clear alerts with event photos.',
    icon: 'whatsapp',
  },
  {
    title: 'Automatic Phone Calls',
    description: 'Escalation when it matters.',
    icon: 'phone',
  },
  {
    title: 'Siren Activation',
    description: 'Deterrence in real time.',
    icon: 'megaphone',
  },
] as const

export const howItWorks = [
  { title: '1. Connect Your Cameras', icon: 'camera' },
  { title: '2. Maya Starts Watching', icon: 'brain' },
  { title: '3. Maya Verifies Threats', icon: 'check' },
  { title: '4. Maya Contacts You', icon: 'mobile' },
] as const

export const comparisonRows = [
  ['Expensive monthly fees', 'Fraction of the cost'],
  ['Human operators', 'AI security operator'],
  ['Shift changes', '24/7 continuous protection'],
  ['Limited capacity', 'Scales across unlimited sites'],
  ['Human error', 'Consistent real-time response'],
  ['Delayed reaction', 'Instant alerts and calls'],
] as const

export const faqs = [
  {
    q: 'What cameras are compatible with Sentra AI?',
    a: 'Sentra AI is designed to connect with existing camera systems and reduce the need for full infrastructure replacement.',
  },
  {
    q: 'How does Sentra AI reduce false alarms?',
    a: 'The AI verifies events before escalation, helping filter unnecessary motion alerts and focusing on real threats.',
  },
  {
    q: 'How quickly will I receive alerts?',
    a: 'When a verified event is detected, alerts can be sent instantly through WhatsApp and automated call flows.',
  },
  {
    q: 'Can Sentra AI activate deterrence?',
    a: 'Yes. Response procedures can include actions such as siren activation and automatic escalation.',
  },
  {
    q: 'Do I need new cameras?',
    a: 'In many cases, no. The messaging focuses on upgrading existing camera systems into an always-awake AI security operator.',
  },
] as const

export const appPerks = [
  { label: '7-Day Free Trial', icon: 'card' },
  { label: 'Human Support', icon: 'headset' },
  { label: 'Cancel Anytime', icon: 'ban' },
  { label: 'Easy Setup', icon: 'magic' },
] as const
