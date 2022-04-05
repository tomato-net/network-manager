import * as React from "react";
import {Box, Stack, Typography} from "@mui/material";

export interface ResourceInfoProps {
    title: string
    value: string
}

export const ResourceInfo: React.FC<ResourceInfoProps> = ({ title , value}) => {
    return (
        <Box>
            <Stack direction={`row`} sx={{justifyContent: 'center'}}>
                <Typography sx={{ mr: 2 }}>
                    {title}:
                </Typography>
                <Typography>
                    {value}
                </Typography>
            </Stack>
        </Box>
    )
}