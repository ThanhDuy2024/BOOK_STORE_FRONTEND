import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Dashboad from './pages/Dashboard/Dashboard'
import AdminLayouts from './layouts/Layouts'
import { LangContext, LangContextProvider } from './contexts/langContext'
import { IntlProvider } from "react-intl";

import en from "./locales/en.json";
import vi from "./locales/vi.json";
import RoutesList from './routes/Route'

const messages = {
  en,
  vi,
};
function App() {
  const [count, setCount] = useState(0)
  const { locale } = useContext(LangContext);
 
  return (
    <>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <RoutesList/>
      </IntlProvider>
    </>
  )
}

export default App
