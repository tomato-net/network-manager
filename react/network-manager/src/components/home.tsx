import * as React from "react";
import {Typography} from "@mui/material";

interface ISubnet {
    cidr: string
}

type Props = {
    id: string
}

export const Home: React.FC<Props> = (props) => {
    const [response, setResponse] = React.useState<ISubnet>({ cidr: "" })
    const { id } = props

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/subnets/${id}`)
            .then(res => res.json())
            .then(res => setResponse(res))
    }, [id]);

    return (
        <Typography variant={`h1`}>
            Subnet with ID: {id} has CIDR {response.cidr}
        </Typography>
    )
}