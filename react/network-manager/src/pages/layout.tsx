import * as React from "react";
import {
    ThemeToggleButton
} from "../components";
import {Button, Stack} from "@mui/material";
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
            <Outlet />
        </Stack>
    )
}