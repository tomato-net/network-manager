import * as React from "react";
import { useSubnetService } from "../clients";
import {Typography} from "@mui/material";
import { useParams } from "react-router-dom";

export const Subnet: React.FC<{ id: string }> = ({ id }) => {
    const subnetService = useSubnetService(id)

    if (subnetService.status != 'loaded') {
       return null
    }

    return (
        <Typography>
            CIDR: {subnetService.payload.cidr}
            <br />
            Net Class: {subnetService.payload.net_class}
            <br />
            Interfaces: {subnetService.payload.interfaces.map((i) => i.id).join(", ")}
        </Typography>
    )
}