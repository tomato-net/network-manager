import * as React from "react";
import {Package, Subnet, ResourceTitle} from "../components";
import {useParams} from "react-router-dom";
import {useInterfaceService} from "../clients";
import {Box, List, ListItem, ListItemButton, Paper, PaperProps, Stack} from "@mui/material";
import {styled} from "@mui/material/styles";

export const Interface: React.FC<{}> = () => {
    const { interfaceId } = useParams();
    const id = interfaceId as string
    const interfaceService = useInterfaceService(id)

    if (interfaceService.status != 'loaded') {
        return null
    }

    const nameHeader = <ResourceTitle>
        {interfaceService.payload.name}
    </ResourceTitle>

    const packageInfo = <InfoBlock>
        <List dense subheader={`PACKAGES`} sx={{maxHeight: 500, overflow: 'auto'}}>
            {interfaceService.payload.packages.map((i) => (
                <ListItem key={i.id}>
                    <ListItemButton href={`/package/${i.id}`}>
                        <Package id={i.id} display={`minimal`} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </InfoBlock>

    const subnetInfo = <InfoBlock>
        <List dense subheader={`SUBNETS`} sx={{maxHeight: 500, overflow: 'auto'}}>
            {interfaceService.payload.subnets.map((i) => (
                <ListItem key={i.id}>
                    <ListItemButton href={`/subnet/${i.id}`}>
                        <Subnet id={i.id} display={`minimal`} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </InfoBlock>

    return (
        <Box sx={{height: "100%"}}>
            <Stack sx={{height: "100%", justifyContent: 'center', textAlign: 'center', alignItems: 'center'}}>
                {nameHeader}
                <Stack direction={`row`} sx={{height: "100%"}}>
                    {packageInfo}
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
