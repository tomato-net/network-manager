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

export interface InterfacesParameters {
    name?: string;
    ids?: string[];
}

export const useInterfacesService = ({ name, ids }: InterfacesParameters) => {
    const [result, setResult] = React.useState<Service<Interfaces>>({
        status: "loading",
    });

    let params: { [key: string]: string } = {}
    if (name !== undefined) {
       params.name = name
    }

    if (ids !== undefined) {
        params.id = ids.join('|')
    }

    const queryString = Object.keys(params).map((key) => key + '=' + params[key]).join('&');

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/interfaces/?${queryString}`)
            .then(response => response.json())
            .then(response => setResult({ status: 'loaded', payload: response }))
            .catch(error => setResult({ status: 'error', error }));
    }, [name]);

    return result;
}
