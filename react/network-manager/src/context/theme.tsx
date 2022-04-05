import * as React from 'react';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom';
import {
    createTheme,
    LinkProps,
    Theme
} from '@mui/material';
import {blue, blueGrey, pink, red} from "@mui/material/colors";

const LinkBehaviour = React.forwardRef<
    any,
    Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
});

type Themes = {
    dark: Theme;
    light: Theme;
};

export const themes: Themes = {
    dark: createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: blueGrey[500],
            },
            background: {
                default: blueGrey[900],
                paper: blueGrey[800],
            },
        },
        components: {
            MuiLink: {
                defaultProps: {
                    component: LinkBehaviour,
                } as LinkProps
            },
            MuiButtonBase: {
                defaultProps: {
                    LinkComponent: LinkBehaviour,
                },
            },
        },
    }),
    light: createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: blueGrey[100],
            },
            background: {
                default: blueGrey[50],
                paper: '#fff',
            },
        },
        components: {
            MuiLink: {
                defaultProps: {
                    component: LinkBehaviour,
                } as LinkProps
            },
            MuiButtonBase: {
                defaultProps: {
                    LinkComponent: LinkBehaviour,
                },
            },
        },
    }),
};

export type ThemeContextProps = { theme: Theme; toggleTheme?: () => void };
export const ThemeContext = React.createContext<ThemeContextProps>({ theme: themes.dark })
export const useTheme = () => React.useContext(ThemeContext)