import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { PaymentsPage } from './pages/PaymentsPage'
import { AccessibilityPage, PrivacyPage } from './pages/LegalPages'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050a14] text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
