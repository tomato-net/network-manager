import * as React from "react";
import {Interface, ResourceTitle} from "../components";
import {useParams} from "react-router-dom";
import {usePackageService} from "../clients";
import {Box, List, ListItem, ListItemButton, Paper, PaperProps, Stack} from "@mui/material";
import {styled} from "@mui/material/styles";

export const Package: React.FC<{}> = () => {
    const { packageId } = useParams();
    const id = packageId as string
    const packageService = usePackageService(id)

    if (packageService.status != 'loaded') {
        return null
    }

    const nameHeader = <ResourceTitle>
            {packageService.payload.name}
    </ResourceTitle>

    const interfaceInfo = <InfoBlock>
        <List dense subheader={`INTERFACES`} sx={{maxHeight: 500, overflow: 'auto'}}>
            {packageService.payload.interfaces.map((i) => (
                <ListItem key={i.id}>
                    <ListItemButton href={`/interface/${i.id}`}>
                        <Interface id={i.id} display={`minimal`} />
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
                    {interfaceInfo}
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
