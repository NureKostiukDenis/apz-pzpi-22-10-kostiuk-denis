import polyglotI18nProvider from 'ra-i18n-polyglot';
import ua from "../../../locales/ua.ts";
import en from "../../../locales/en.ts";


export const i18nProvider = polyglotI18nProvider((locale) => {
    if (locale === 'ua') {
        return ua;
    }
    return en;
}, 'ua');
