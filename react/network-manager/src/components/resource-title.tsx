import * as React from "react";
import {Box, Typography} from "@mui/material";

export const ResourceTitle: React.FC<{}> = ({ children }) => {
    return (
        <Box sx={{ m:  2}}>
            <Typography variant={`h5`}>
                {children}
            </Typography>
        </Box>
    )
}