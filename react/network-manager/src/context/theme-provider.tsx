import * as React from 'react';

import { themes, ThemeContext } from './theme';
import { Theme, ThemeProvider as MThemeProvider } from '@mui/material';

interface State {
    theme: Theme;
}

interface Props {
    children: React.ReactChild;
}

export class ThemeProvider extends React.Component<Props, State> {
    readonly state: State = { theme: themes.light };

    toggleTheme = () => {
        this.setState(state => ({
            theme: state.theme === themes.light ? themes.dark : themes.light,
        }));
    }

    render() {
        const { theme } = this.state;
        const { toggleTheme } = this;

        return (
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <MThemeProvider theme={theme}>
                    {this.props.children}
                </MThemeProvider>
            </ThemeContext.Provider>
        );
    }
}