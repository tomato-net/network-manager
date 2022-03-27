import * as React from "react";
import { useSubnetService } from "../clients";
import {Typography} from "@mui/material";
import {Interface} from "./interface";

type Display =
    | 'full'
    | 'minimal'


export const Subnet: React.FC<{ id: string, display?: Display }> = ({ id, display = 'full' }) => {
    const subnetService = useSubnetService(id)

    if (subnetService.status != 'loaded') {
       return null
    }

    const additionalContent = <div>
        <Typography variant={`body1`}>
            Net Class: {subnetService.payload.net_class}
        </Typography>
        <Typography variant={`body1`}>
            Interfaces
        </Typography>
        {subnetService.payload.interfaces.map((i) => (
            <Interface id={i.id} display={`minimal`} />
        ))}
    </div>

    return (
        <div>
            <Typography>
                {subnetService.payload.cidr}
            </Typography>
            {display === 'full' && additionalContent}
        </div>
    )
}