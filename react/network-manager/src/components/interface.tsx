import * as React from "react";
import { useInterfaceService } from "../clients";
import {Typography} from "@mui/material";
import { useParams } from "react-router-dom";

export const Interface: React.FC<{}> = () => {
    const { interfaceId } = useParams();
    const id = interfaceId as string
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
