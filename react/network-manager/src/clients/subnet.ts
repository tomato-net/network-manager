import * as React from "react";
import { Service } from "./service";

export interface Interfaces {
    id: string;
}

export interface Subnet {
    id: string;
    cidr: string;
    net_class: string;
    interfaces: Interfaces[];
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

export const useSubnetsService = ( cidr: string ) => {
    const [result, setResult] = React.useState<Service<Subnets>>({
        status: "loading",
    });

    const params: { [key: string]: string } = { cidr: cidr }
    const queryString = Object.keys(params).map((key) => key + '=' + params[key]).join('&');

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/subnets/?${queryString}`)
            .then(response => response.json())
            .then(response => setResult({ status: 'loaded', payload: response }))
            .catch(error => setResult({ status: 'error', error }));
    }, [cidr]);

    return result;
}