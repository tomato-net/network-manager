import * as React from "react";
import {
    ThemeToggleButton
} from "../components";
import {Button, Paper, Stack} from "@mui/material";
import {Outlet} from "react-router-dom";

export const Layout: React.FC<{}> = () => {
    return (
        <Stack sx={{width: "100%"}}>
            <Stack direction={`row`}>
                <ThemeToggleButton />
                <Button href={"/"}>
                    Home
                </Button>
            </Stack>
            <Paper sx={{
                justifyContent: "center",
                textAlign: "center",
                width: "100%",
                height: "100%",
            }}>
                <Outlet />
            </Paper>
        </Stack>
    )
}