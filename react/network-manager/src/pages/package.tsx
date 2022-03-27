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

    const packageInfo = <InfoBlock>
        <InfoHeader>
            PACKAGE INFO
        </InfoHeader>
        <InfoElement>
            No info
        </InfoElement>
    </InfoBlock>

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
            <Stack sx={{height: "100%"}}>
                {nameHeader}
                <Stack direction={`row`} sx={{height: "100%"}}>
                    {packageInfo}
                    {interfaceInfo}
                </Stack>
            </Stack>
        </Box>
    )
}

const InfoBlock = styled(Paper)<PaperProps>(({ theme }) => ({
    height: "fill",
    width: 400,
    padding: theme.spacing(2),
    margin: theme.spacing(0, 1, 2, 2),
    backgroundColor: theme.palette.secondary.main,
}));

const InfoElement = styled("div")()
const InfoHeader = styled("div")(({ theme }) => ({
    padding: theme.spacing(2),
}))
