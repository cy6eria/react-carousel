export interface ILangItem {
  errorMessage: string;
  close: string;
}

export const lang: {[key: string]: ILangItem} = {
  'ru': {
    errorMessage: 'Во время загрузки произошла ошибка. Попробуйте повторить попытку.',
    close: 'Закрыть',
  },
  'en': {
    errorMessage: 'The loading is failed. Try to load it again.',
    close: 'Close',
  }
};
