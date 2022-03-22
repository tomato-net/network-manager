import * as React from "react";
import {Interface as InterfaceView} from "../components";
import {Paper} from "@mui/material";

export const Interface: React.FC<{}> = () => {
    return (
        <Paper sx={{
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            height: "100%",
        }}>
            <InterfaceView />
        </Paper>
    )
}
