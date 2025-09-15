// src/lib/i18nLoader.js
import { i18n } from "@lingui/core";

// Dynamically import the catalog for a given locale
export async function loadCatalog(locale) {
    // Adjust the path according to your compiled output structure
    // This assumes catalogs are compiled to src/locales/[locale]/messages.js
    const targetLocale = locale === undefined ? 'en' : locale;
    try {
        const module = await import(`../locales/${targetLocale}/messages.js`);
        const { messages } = module;
        
        if (!messages || typeof messages !== 'object') {
            return {};
        }
        
        return messages;
    } catch (error) {
        console.error(`Failed to load message catalog for locale: ${targetLocale}`, error);
        // Return empty object or handle error as appropriate
        return {};
    }
}

// Load messages and activate the locale
export async function loadLanguage(locale) {
    const messages = await loadCatalog(locale);
    i18n.load(locale, messages);
    i18n.activate(locale);
    console.log(`Language activated: ${locale}`);
}