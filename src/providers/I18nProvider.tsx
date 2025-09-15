'use client'
import { i18n } from '@lingui/core'
import { I18nProvider as LinguiI18nProvider } from '@lingui/react'
import { useEffect } from 'react'

import { loadCatalog } from '@/lib/i18nLoader'

export default function I18nProvider({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: string
}) {
  useEffect(() => {
    async function loadMessages() {
      const messages = await loadCatalog(locale)
      // Ensure messages is always an object to prevent Object.entries errors
      const safeMessages = messages || {}
      
      try {
        i18n.load(locale, safeMessages)
        i18n.activate(locale)
      } catch (error) {
        console.error('Error during i18n.load or activate:', error);
      }
    }
    loadMessages()
  }, [locale])

  return <LinguiI18nProvider i18n={i18n}>{children}</LinguiI18nProvider>
}
