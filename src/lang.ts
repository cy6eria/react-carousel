export interface ILangItem {
  errorMessage: string;
  close: string;
  back: string;
  forward: string;
}

export const lang: {[key: string]: ILangItem} = {
  'ru': {
    errorMessage: 'Во время загрузки произошла ошибка. Попробуйте повторить попытку.',
    close: 'Закрыть',
    back: 'Назад',
    forward: 'Вперед',
  },
  'en': {
    errorMessage: 'The loading is failed. Try to load it again.',
    close: 'Close',
    back: 'Back',
    forward: 'Forward',
  }
};
