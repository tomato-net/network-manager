import * as React from "react";
import {Package as PackageView} from "../components";
import {Paper} from "@mui/material";
import {useParams} from "react-router-dom";

export const Package: React.FC<{}> = () => {
    const { packageId } = useParams();
    const id = packageId as string

    return (
        <Paper sx={{
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            height: "100%",
        }}>
            <PackageView id={id} />
        </Paper>
    )
}
