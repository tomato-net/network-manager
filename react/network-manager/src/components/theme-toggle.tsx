import * as React from 'react';

import { useTheme } from '../context';
import { Box, Button } from "@mui/material";

export const ToggleThemeButton: React.FC = () => {
    const { toggleTheme } = useTheme();

    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            borderRadius: 1,
            p: 3,
        }}>
            <Button onClick={toggleTheme} color={`inherit`}>
                {`My Theme Toggle Button`}
            </Button>
        </Box>
    );
};