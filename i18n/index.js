import en_GB from './translations/en-GB';
import en_US from './translations/en-US';
import de from './translations/de';

const DEFAULT_LOCALE = 'en-GB';

// @todo Use the babel-plugin-react-intl plugin to generate the default translations from those in components/modules
const translations = {
    'en-GB': en_GB,
    'en-US': en_US,
    'de': de
};

const isAvailable = (locale) => Boolean(translations[locale]);
const getMessages = (locale) => isAvailable(locale) ? translations[locale] : translations[DEFAULT_LOCALE];

export { isAvailable, getMessages, DEFAULT_LOCALE };
