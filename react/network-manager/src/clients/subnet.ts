import * as React from "react";
import { Service } from "./service";

export interface Subnet {
    id: string;
    cidr: string;
}

export type Subnets = Array<Subnet>

export const useSubnetService = ( id: string ) => {
    const [result, setResult] = React.useState<Service<Subnet>>({
        status: "loading",
    });

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/subnets/${id}`)
            .then(response => response.json())
            .then(response => setResult({ status: 'loaded', payload: response }))
            .catch(error => setResult({ status: 'error', error }));
    }, [id]);

    return result;
}

export const useSubnetsService = () => {
    const [result, setResult] = React.useState<Service<Subnets>>({
        status: "loading",
    });

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/subnets/`)
            .then(response => response.json())
            .then(response => setResult({ status: 'loaded', payload: response }))
            .catch(error => setResult({ status: 'error', error }));
    }, []);

    return result;
}