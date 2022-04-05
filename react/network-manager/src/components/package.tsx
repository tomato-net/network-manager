import * as React from "react";
import { usePackageService } from "../clients";
import {Box, Typography} from "@mui/material";
import { Interface } from "./interface";

type Display =
    | 'full'
    | 'minimal'

interface PackageProps {
    id: string;
    display?: Display;
}

export const Package: React.FC<PackageProps> = ({ id, display = 'full' }) => {
    const packageService = usePackageService(id)

    if (packageService.status != 'loaded') {
        return null
    }

    if (display === 'minimal') {
        return (
            <div>
                <Typography>
                    {packageService.payload.name}
                </Typography>
            </div>
        )
    }

    return (
        <Box>
            <Typography>
                {packageService.payload.name}
            </Typography>
            <Typography variant={`body1`} >
                Interfaces
            </Typography>
            {packageService.payload.interfaces.map((i) => (
                <Interface id={i.id} display={`minimal`} />
            ))}
        </Box>
    )
}