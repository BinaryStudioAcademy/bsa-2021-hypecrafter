import { i18n as i18nInterface } from 'i18next';
import { createContext, useContext, FC } from 'react';
import { useTranslation } from 'react-i18next';

type ContextProps = {t: (key: LocaleKeys) => string, i18n: i18nInterface};
const LocalizationContext = createContext<ContextProps>({} as ContextProps);
export const useLocalization = () => useContext(LocalizationContext);

const LocalizationProvider: FC = ({ children }) => {
  const { t, i18n }: ContextProps = useTranslation();
  return (
    <LocalizationContext.Provider value={{ t, i18n }}>
      { children }
    </LocalizationContext.Provider>
  );
};

export default LocalizationProvider;
