import * as React from "react";
import {List, ListSubheader} from "@mui/material";

export interface ResourceListProps {
    title: string
}

export const ResourceList: React.FC<ResourceListProps> = ({ title, children }) => {
    return(
        <List dense subheader={<ListSubheader>{title.toUpperCase()}</ListSubheader>} sx={{maxHeight: 500, overflow: 'auto'}}>
            {children}
        </List>
    )
}