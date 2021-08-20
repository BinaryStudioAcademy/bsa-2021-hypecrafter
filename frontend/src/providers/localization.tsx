import { Callback, StringMap, TFunction, TOptions } from 'i18next';
import { createContext, FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { date } from '../services/date';

export type TranslatorType = (key: LocaleKeys, options?: string | TOptions<StringMap> | undefined) => string;

type ContextProps = {
  t: TranslatorType,
  changeLanguage(lng?: string, callback?: Callback): Promise<TFunction>, selectedLanguage: string
};

const LocalizationContext = createContext<ContextProps>({} as ContextProps);
const useLocalization = () => useContext(LocalizationContext);

const LocalizationProvider: FC = ({ children }) => {
  const { t, i18n } = useTranslation();
  const values: ContextProps = { t, changeLanguage: i18n.changeLanguage.bind(i18n), selectedLanguage: i18n.language };
  date.setLanguage(values.selectedLanguage);
  return (
    <LocalizationContext.Provider value={values}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationProvider;
export { useLocalization };
