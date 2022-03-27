import * as React from "react";
import { styled } from "@mui/material/styles";
import {Paper, PaperProps, Typography} from "@mui/material";
import {PropsWithChildren} from "react";

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
    width: "auto",
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "left",
    backgroundColor: theme.palette.primary.main,
}));

export const ResourceTitle: React.FC<{}> = ({ children }) => {
    return (
        <StyledPaper>
            <Typography variant={`h5`}>
                {children}
            </Typography>
        </StyledPaper>
    )
}