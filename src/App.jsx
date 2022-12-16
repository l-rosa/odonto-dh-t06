
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import React, { useState, useContext, useMemo } from "react";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./Routes/Home";
import Contact from "./Routes/Login";
import Detail from "./Routes/Detail";
import ThemeContext, { themes } from "./Provider/Theme";
import ThemeProvider from "./Provider/Theme";

const Layout = ({children}) => {

  const { theme } = useContext(ThemeContext)

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar a classe dark ou light */}
      <div className={`${theme.theme}`}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {

  const [theme, setTheme] = useState(themes.light);
  const handleChangeTheme = () => {
    if (theme === themes.dark) setTheme(themes.light)
    if (theme === themes.light) setTheme(themes.dark)
  }

  const providerValue =  useMemo(()=>({theme, handleChangeTheme}),[theme,handleChangeTheme])
 

  return (
    <ThemeProvider.Provider value={providerValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="" element={<Contact/>} />
            <Route path="/login" element={<Contact/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/dentist" element={<Detail/>} />
            <Route path="/dentist/:id" element={<Detail/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider.Provider>
  );
}

export default App;
