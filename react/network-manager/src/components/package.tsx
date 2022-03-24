import * as React from "react";
import { usePackageService, useInterfacesService } from "../clients";
import {Typography} from "@mui/material";
import { Interface } from "./interface";

export const Package: React.FC<{ id: string }> = ({ id }) => {
    const packageService = usePackageService(id)

    if (packageService.status != 'loaded') {
        return null
    }

    return (
        <div>
            <Typography>
                Name: {packageService.payload.name}
                <br />
            </Typography>
            {packageService.payload.interfaces.map((i) => (
                <Interface id={i.id} />
            ))}
        </div>
    )
}
