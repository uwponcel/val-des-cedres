import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import fr from './fr.json';
import en from './en.json';

export type Lang = 'fr' | 'en';
type Dict = Record<string, string>;

const dicts: Record<Lang, Dict> = { fr, en };

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t: (key) => dicts[lang][key] ?? dicts.fr[key] ?? key,
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
