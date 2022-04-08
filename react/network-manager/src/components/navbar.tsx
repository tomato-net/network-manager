import * as React from "react";
import {AppBar, Box, Button, Stack, Toolbar} from "@mui/material";
import {Search} from "./search";
import {ThemeToggleButton} from "./theme-toggle";

export const NavBar: React.FC<{}> = () => {
    return (
        <Box sx={{ pb: 2 }}>
           <AppBar sx={{ p: 2 }} position={`static`} color={`primary`} enableColorOnDark>
               <Toolbar>
                   <Stack direction={`row`} spacing={2}>
                       <ThemeToggleButton />
                       <Button variant={`outlined`} color={`inherit`} href={"/"}>
                           Home
                       </Button>
                       <Search />
                   </Stack>
               </Toolbar>
           </AppBar>
        </Box>
    )
}