import * as React from "react";
import { useInterfaceService } from "../clients";
import {Typography} from "@mui/material";
import {Package, Subnet} from "./index";

type Display =
    | 'full'
    | 'minimal'

export const Interface: React.FC<{ id: string, display?: Display }> = ({ id, display = 'full' }) => {
    const interfaceService = useInterfaceService(id)

    if (interfaceService.status != 'loaded') {
        return null
    }

    const additionalContent = <div>
        <Typography variant={`body1`} >
            Packages
        </Typography>
        {interfaceService.payload.packages.map((p) => (
            <Package id={p.id} display={`minimal`} />
        ))}
        <Typography variant={`body1`}>
            Subnets
        </Typography>
            {interfaceService.payload.subnets.map((s) => (
                <Subnet id={s.id} display={`minimal`} />
            ))}
    </div>

    return (
        <Typography>
            {interfaceService.payload.name}
            {display === 'full' && additionalContent}
        </Typography>
    )
}
