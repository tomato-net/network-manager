import * as React from "react";
import {Interface as InterfaceView} from "../components";
import {Paper} from "@mui/material";
import {useParams} from "react-router-dom";

export const Interface: React.FC<{}> = () => {
    const { interfaceId } = useParams();
    const id = interfaceId as string
    return (
        <Paper sx={{
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            height: "100%",
        }}>
            <InterfaceView id={id} />
        </Paper>
    )
}
