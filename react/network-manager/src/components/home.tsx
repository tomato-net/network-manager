import * as React from "react";
import {Typography} from "@mui/material";

export const Home: React.FC = () => {
    const [response, setResponse] = React.useState<string>("")

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/noauth`)
            .then(res => res.json())
            .then(res => setResponse(res.message))
    })

    return (
        <Typography variant={`h1`}>
            {response}
        </Typography>
    )
}