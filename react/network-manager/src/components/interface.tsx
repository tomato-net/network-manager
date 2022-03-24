import * as React from "react";
import { useInterfaceService } from "../clients";
import {Typography} from "@mui/material";

export const Interface: React.FC<{ id: string }> = ({ id }) => {
    const interfaceService = useInterfaceService(id)

    if (interfaceService.status != 'loaded') {
        return null
    }

    return (
        <Typography>
            Name: {interfaceService.payload.name}
            <br />
            Package: {interfaceService.payload.packages[0].id}
            <br />
            Subnets: {interfaceService.payload.subnets.map((i) => i.id).join(", ")}
        </Typography>
    )
}
