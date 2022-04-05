import * as React from "react";
import {
    NavBar,
    ThemeToggleButton
} from "../components";
import {Box, Button, Paper, Stack} from "@mui/material";
import {Outlet} from "react-router-dom";

export const Layout: React.FC<{}> = () => {
    return (
        <Box sx={{ height: '100%', p: 2 }}>
            <NavBar />
            <Stack sx={{width: "100%"}}>
                <Outlet />
            </Stack>
        </Box>
    )
}