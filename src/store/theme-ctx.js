import { createContext } from "react";

const ThemeContext = createContext({
  theme: "",
  switchTheme: "",
});

export const CurrencyContext = createContext({
  currency: "",
});

export default ThemeContext;
