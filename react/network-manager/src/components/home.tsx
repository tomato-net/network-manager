import * as React from "react";
import {Typography} from "@mui/material";
import {useSubnetService, useSubnetsService} from "../clients";

type Props = {
    id: string
}

export const Home: React.FC<Props> = (props) => {
    const { id } = props
    const subnetService = useSubnetService(id)
    const subnetsService = useSubnetsService()

    return (
        <Typography variant={`body1`}>
            {subnetService.status === 'loading' && `Loading`}
            {subnetService.status === 'error' && `Error loading subnet`}
            {subnetService.status === 'loaded' && (
                `Subnet with ID: ${id} has CIDR ${subnetService.payload.cidr}`
            )}
        </Typography>
    )
}