import * as React from 'react';

import {
    themes,
    ThemeContext
} from './theme';
import {
    useMediaQuery,
    ThemeProvider as MThemeProvider, CssBaseline
} from '@mui/material';

interface Props {
    children: React.ReactChild;
}

// TODO: useCookies to store theme palette
export const ThemeProvider: React.FC<Props> = props => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [ theme, setTheme ] = React.useState(prefersDarkMode ? themes.dark : themes.light)

    React.useMemo(
        () => setTheme(prefersDarkMode ? themes.dark : themes.light),
        [prefersDarkMode]
    )

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === themes.light ? themes.dark : themes.light));
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <MThemeProvider theme={theme}>
                <CssBaseline />
                {props.children}
            </MThemeProvider>
        </ThemeContext.Provider>
    );
}