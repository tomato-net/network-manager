import * as React from "react";
import {SubnetSearch} from "../components";
import {Paper} from "@mui/material";

export const Home: React.FC<{}> = () => {
    return (
        <Paper sx={{
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            height: "100%",
        }}>
            <SubnetSearch />
        </Paper>
    )
}