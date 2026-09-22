import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LangLayout } from './components/LangLayout'
import { HomePage } from './pages/HomePage'
import { PaymentsPage } from './pages/PaymentsPage'
import {
  AccessibilityPage,
  PrivacyPage,
  SiteRulesPage,
  TermsPage,
} from './pages/LegalPages'
import { DEFAULT_LANG, isLang } from './i18n/languages'

function RootRedirect() {
  let lang = DEFAULT_LANG
  try {
    const stored = localStorage.getItem('sentra_lang')
    if (stored && isLang(stored)) lang = stored
  } catch {
    /* ignore */
  }
  return <Navigate to={`/${lang}`} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050a14] text-white">
        <main>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/:lang" element={<LangLayout />}>
              <Route index element={<HomePage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="privacy-policy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="site-rules" element={<SiteRulesPage />} />
              <Route path="accessibility" element={<AccessibilityPage />} />
            </Route>
            <Route
              path="*"
              element={<Navigate to={`/${DEFAULT_LANG}`} replace />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
