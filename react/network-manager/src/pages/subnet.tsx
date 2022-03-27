import * as React from "react";
import {Subnet as SubnetView} from "../components";
import {Paper} from "@mui/material";
import {useParams} from "react-router-dom";

export const Subnet: React.FC<{}> = () => {
    const { subnetId } = useParams();
    const id = subnetId as string

    return (
        <SubnetView id={id} />
    )
}