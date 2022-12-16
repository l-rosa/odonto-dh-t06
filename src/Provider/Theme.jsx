import { createContext, useState } from 'react';

export const themes = {
    light: {
        theme: 'light',
        div: '',
        background: 'white',
        btn: 'btn-light'
      },
      dark: {
        theme: 'dark',
        div: '.dark',
        background: 'black',
        btn: '.dark'
      }
};     

export const ThemeContext = createContext(themes.light);

export default ThemeContext;