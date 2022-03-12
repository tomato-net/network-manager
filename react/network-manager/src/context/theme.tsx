import * as React from 'react';
import { createTheme, Theme } from '@mui/material';

type Themes = {
    dark: Theme;
    light: Theme;
};

export const themes: Themes = {
    dark: createTheme({
        palette: {
            mode: 'dark',
        },
    }),
    light: createTheme({
        palette: {
            mode: 'light',
        },
    }),
};

export type ThemeContextProps = { theme: Theme; toggleTheme?: () => void };
export const ThemeContext = React.createContext<ThemeContextProps>({ theme: themes.light })
export const useTheme = () => React.useContext(ThemeContext)