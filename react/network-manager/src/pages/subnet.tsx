import * as React from "react";
import {Subnet as SubnetView} from "../components";
import {Paper} from "@mui/material";

export const Subnet: React.FC<{}> = () => {
    return (
        <Paper sx={{
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            height: "100%",
        }}>
            <SubnetView />
        </Paper>
    )
}