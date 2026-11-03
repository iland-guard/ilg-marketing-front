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
import { AppPrivacyPage, DeleteAccountPage } from './pages/AppLegalPages'
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

/**
 * Language-less URLs (app store listings, SMS terms) open in the visitor's
 * language instead of falling through to the `/:lang` route as an invalid lang.
 */
function LangRedirect({ path }: { path: string }) {
  return <Navigate to={`/${resolveInitialLang()}${path}`} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050a14] text-white">
        <main>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route
              path="/privacy-policy"
              element={<LangRedirect path="/privacy-policy" />}
            />
            <Route path="/terms" element={<LangRedirect path="/terms" />} />
            <Route
              path="/app-privacy-policy"
              element={<LangRedirect path="/app-privacy-policy" />}
            />
            <Route
              path="/delete-account"
              element={<LangRedirect path="/delete-account" />}
            />
            <Route path="/:lang" element={<LangLayout />}>
              <Route index element={<HomePage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="privacy-policy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="site-rules" element={<SiteRulesPage />} />
              <Route path="accessibility" element={<AccessibilityPage />} />
              <Route path="app-privacy-policy" element={<AppPrivacyPage />} />
              <Route path="delete-account" element={<DeleteAccountPage />} />
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
