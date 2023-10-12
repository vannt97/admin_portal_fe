import language from '@iso/config/language.config';
import englishLang from '@iso/assets/images/flag/uk.svg';
import vietnameseLang from '@iso/assets/images/flag/vietnam.svg';

const config = {
  defaultLanguage: language,
  options: [
    {
      languageId: 'vietnamese',
      locale: 'vi',
      text: 'Vietnamese',
      icon: vietnameseLang,
    },
    {
      languageId: 'english',
      locale: 'en',
      text: 'English',
      icon: englishLang,
    },
  ],
};

export function getCurrentLanguage(lang) {
  let selecetedLanguage = config.options[0];
  config.options.forEach(language => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
}
export default config;
