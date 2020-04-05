import { lang, ILangItem } from './lang';

export const getLang = (): ILangItem => {
  const key = window.navigator.languages.find((i) => lang[i]);

  return key ? lang[key] : lang.en!;
}
