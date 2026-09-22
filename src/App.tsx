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
import { DEFAULT_LANG, isLang, type Lang } from './i18n/languages'
import { LANG_STORAGE_KEY } from './i18n'

function detectBrowserLang(): Lang {
  try {
    const candidates = [
      ...(navigator.languages ?? []),
      navigator.language,
    ].filter(Boolean)

    for (const code of candidates) {
      const base = code.toLowerCase().split('-')[0]
      if (isLang(base)) return base
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG
}

function resolveInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY)
    if (stored && isLang(stored)) return stored
  } catch {
    /* ignore */
  }
  return detectBrowserLang()
}

function RootRedirect() {
  return <Navigate to={`/${resolveInitialLang()}`} replace />
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
