"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";

  const savedLanguage = localStorage.getItem("freshcart-language");

  return savedLanguage === "en" || savedLanguage === "ar"
    ? savedLanguage
    : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const direction = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.documentElement.dataset.language = language;
    document.body.dir = direction;
    document.body.dataset.language = language;
  }, [direction, language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("freshcart-language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      <div
        lang={language}
        dir={direction}
        data-language={language}
        suppressHydrationWarning
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
