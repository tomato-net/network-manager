import * as React from "react";
import {Interface, ResourceTitle} from "../components";
import {useParams} from "react-router-dom";
import {usePackageService} from "../clients";
import {Box, Paper, PaperProps, Stack, Typography} from "@mui/material";
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
        <InfoHeader>
            INTERFACES
        </InfoHeader>
        {packageService.payload.interfaces.map((i) => (
            <InfoElement>
                <Interface id={i.id} display={`minimal`} />
            </InfoElement>
        ))}
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
    padding: theme.spacing(2),
}))
