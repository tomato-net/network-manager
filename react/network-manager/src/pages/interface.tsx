import * as React from "react";
import {Package, Subnet, ResourceTitle, ResourceList, ResourceInfo} from "../components";
import {useParams} from "react-router-dom";
import {useInterfaceService} from "../clients";
import {Box, Divider, List, ListItem, ListItemButton, ListSubheader, Paper, PaperProps, Stack} from "@mui/material";
import {styled} from "@mui/material/styles";

export const Interface: React.FC<{}> = () => {
    const { interfaceId } = useParams();
    const id = interfaceId as string
    const interfaceService = useInterfaceService(id)

    if (interfaceService.status != 'loaded') {
        return null
    }

    const nameHeader = <ResourceTitle>{interfaceService.payload.name}</ResourceTitle>
    const type = <ResourceInfo title={`type`} value={`interface`}/>

    const packageInfo = <InfoBlock>
        <ResourceList title={`Packages`}>
            {interfaceService.payload.packages.map((i) => (
                <ListItem key={i.id}>
                    <ListItemButton href={`/package/${i.id}`}>
                        <Package id={i.id} display={`minimal`} />
                    </ListItemButton>
                </ListItem>
            ))}
        </ResourceList>
    </InfoBlock>

    const subnetInfo = <InfoBlock>
        <ResourceList title={`Subnets`}>
            {interfaceService.payload.subnets.map((i) => (
                <ListItem key={i.id}>
                    <ListItemButton href={`/subnet/${i.id}`}>
                        <Subnet id={i.id} display={`minimal`} />
                    </ListItemButton>
                </ListItem>
            ))}
        </ResourceList>
    </InfoBlock>

    return (
        <Box sx={{height: "100%"}}>
            <Stack sx={{height: "100%", justifyContent: 'center', textAlign: 'center', alignItems: 'center'}}>
                <Box justifyContent={`center`} marginBottom={1}>
                    {nameHeader}
                    <Divider variant="middle" sx={{mb: 1}}/>
                    {type}
                </Box>
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
