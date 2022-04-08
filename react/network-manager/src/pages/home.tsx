import * as React from "react";
import {Box, Divider, ListItem, ListItemButton, Paper, PaperProps, Stack} from "@mui/material";
import {usePackagesService} from "../clients";
import {Package, ResourceInfo, ResourceList, ResourceTitle, Subnet} from "../components";
import {styled} from "@mui/material/styles";

export const Home: React.FC<{}> = () => {
    const packagesService = usePackagesService("")

    if (packagesService.status != 'loaded') {
        return null
    }

    const nameHeader = <ResourceTitle>PACKAGE BROWSER</ResourceTitle>

    const packageInfo = <InfoBlock>
        <ResourceList title={`Packages`}>
            {packagesService.payload.map((p) => (
                <ListItem key={p.id}>
                    <ListItemButton href={`/package/${p.id}`}>
                        <Package id={p.id} display={`minimal`} />
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
                    <Divider sx={{mb: 1}}/>
                </Box>
                <Stack direction={`row`} sx={{height: "100%"}}>
                    {packageInfo}
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
