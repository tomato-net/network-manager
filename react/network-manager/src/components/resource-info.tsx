import * as React from "react";
import {Box, Stack, Typography} from "@mui/material";

export interface ResourceInfoProps {
    title: string
    value: string
}

export const ResourceInfo: React.FC<ResourceInfoProps> = ({ title , value}) => {
    return (
        <Box sx={{width: '100%', justifyContent:'center'}}>
            <Stack direction={`row`} sx={{justifyContent: 'center', width: '100%'}}>
                <Typography align={`left`} sx={{width: '40%'}}>
                    <b>{title}</b>
                </Typography>
                <Typography align={`right`} sx={{width: '40%'}}>
                    {value}
                </Typography>
            </Stack>
        </Box>
    )
}