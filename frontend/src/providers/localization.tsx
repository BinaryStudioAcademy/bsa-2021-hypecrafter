import { TOptions, StringMap, Callback, TFunction } from 'i18next';
import { createContext, useContext, FC } from 'react';
import { useTranslation } from 'react-i18next';

type ContextProps = {
  t: (key: LocaleKeys, options?: string | TOptions<StringMap> | undefined) => string,
  changeLanguage(lng?: string, callback?: Callback): Promise<TFunction>, selectedLanguage: string
};
const LocalizationContext = createContext<ContextProps>({} as ContextProps);
export const useLocalization = () => useContext(LocalizationContext);

const LocalizationProvider: FC = ({ children }) => {
  const { t, i18n } = useTranslation();
  const values: ContextProps = { t, changeLanguage: i18n.changeLanguage.bind(i18n), selectedLanguage: i18n.language };
  return (
    <LocalizationContext.Provider value={values}>
      { children }
    </LocalizationContext.Provider>
  );
};

export default LocalizationProvider;
