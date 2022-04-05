import * as React from "react";
import {Interface, ResourceTitle} from "../components";
import {useParams} from "react-router-dom";
import {useSubnetService} from "../clients";
import {Box, List, ListItem, ListItemButton, Paper, PaperProps, Stack, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

export const Subnet: React.FC<{}> = () => {
    const { subnetId } = useParams();
    const id = subnetId as string
    const subnetService = useSubnetService(id)

    if (subnetService.status != 'loaded') {
        return null
    }

    const nameHeader = <ResourceTitle>
        {subnetService.payload.cidr}
    </ResourceTitle>

    const interfaceInfo = <InfoBlock>
        <List dense subheader={`INTERFACES`} sx={{maxHeight: 500, overflow: 'auto'}}>
            {subnetService.payload.interfaces.map((i) => (
                <ListItem key={i.id}>
                    <ListItemButton href={`/interface/${i.id}`}>
                        <Interface id={i.id} display={`minimal`} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </InfoBlock>

    const subnetInfo = <InfoBlock>
        <Typography>
            net class: {subnetService.payload.net_class}
        </Typography>
    </InfoBlock>

    return (
        <Box sx={{height: "100%"}}>
            <Stack sx={{height: "100%", justifyContent: 'center', textAlign: 'center', alignItems: 'center'}}>
                {nameHeader}
                <Stack direction={`row`} sx={{height: "100%"}}>
                    {interfaceInfo}
                    {subnetInfo}
                </Stack>
            </Stack>
        </Box>
    )
}

const InfoBlock = styled(Paper)<PaperProps>(({ theme }) => ({
    height: "fill",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 400,
    padding: theme.spacing(2),
    margin: theme.spacing(0, 1, 2, 2),
}));

const InfoElement = styled("div")(() => ({
    justifyContent: 'center',
}));

const InfoHeader = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2, 2),
}))
