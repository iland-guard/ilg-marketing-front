import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
import { LangLayout } from './components/LangLayout'
import { HomePage } from './pages/HomePage'
import { PaymentsPage } from './pages/PaymentsPage'
import { AccessibilityPage, TermsPage } from './pages/LegalPages'
import {
  DeleteAccountPage,
  PrivacyPage,
  SupportPage,
} from './pages/AppLegalPages'
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

/** Retired pages (merged into others) keep working for existing links. */
function MovedPage({ to }: { to: string }) {
  const { lang } = useParams()
  const { hash } = useLocation()
  return <Navigate to={`/${lang}${to}${hash}`} replace />
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
              element={<LangRedirect path="/privacy-policy" />}
            />
            <Route
              path="/site-rules"
              element={<LangRedirect path="/terms" />}
            />
            <Route
              path="/delete-account"
              element={<LangRedirect path="/delete-account" />}
            />
            <Route path="/support" element={<LangRedirect path="/support" />} />
            <Route path="/:lang" element={<LangLayout />}>
              <Route index element={<HomePage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="privacy-policy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="accessibility" element={<AccessibilityPage />} />
              <Route path="delete-account" element={<DeleteAccountPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route
                path="app-privacy-policy"
                element={<MovedPage to="/privacy-policy" />}
              />
              <Route path="site-rules" element={<MovedPage to="/terms" />} />
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
