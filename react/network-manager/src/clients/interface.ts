import * as React from "react";
import { Service } from "./service";

export interface Identifiable {
    id: string;
}

export interface Interface {
    id: string;
    name: string;
    subnets: Identifiable[];
    packages: Identifiable[];
}

export type Interfaces = Array<Interface>

export const useInterfaceService = ( id: string ) => {
    const [result, setResult] = React.useState<Service<Interface>>({
        status: "loading",
    });

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/interfaces/${id}`)
            .then(response => response.json())
            .then(response => setResult({ status: 'loaded', payload: response }))
            .catch(error => setResult({ status: 'error', error }));
    }, [id]);

    return result;
}

export const useInterfacesService = ( name: string ) => {
    const [result, setResult] = React.useState<Service<Interfaces>>({
        status: "loading",
    });

    const params: { [key: string]: string } = { name: name }
    const queryString = Object.keys(params).map((key) => key + '=' + params[key]).join('&');

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/interfaces/?${queryString}`)
            .then(response => response.json())
            .then(response => setResult({ status: 'loaded', payload: response }))
            .catch(error => setResult({ status: 'error', error }));
    }, [name]);

    return result;
}
