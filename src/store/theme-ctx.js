import { createContext } from "react";

const ThemeContext = createContext({
  theme: "",
  switchTheme: "",
});

export default ThemeContext;
