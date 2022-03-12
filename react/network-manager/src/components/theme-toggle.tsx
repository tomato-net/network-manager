import * as React from 'react';

import { useTheme } from '../context';

export const ToggleThemeButton: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button style={theme} onClick={toggleTheme}>
            {`My Theme Toggle Button`}
        </button>
    );
};