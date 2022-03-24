import * as React from "react";
import { Service } from "./service";
import { Identifiable } from "./interface";

export interface Package {
    id: string;
    name: string;
    interfaces: Identifiable[];
}

export type Packages = Array<Package>

export const usePackageService = ( id: string ) => {
    const [result, setResult] = React.useState<Service<Package>>({
        status: "loading",
    });

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/packages/${id}`)
            .then(response => response.json())
            .then(response => setResult({ status: 'loaded', payload: response }))
            .catch(error => setResult({ status: 'error', error }));
    }, [id]);

    return result;
}

export const usePackagesService = ( name: string ) => {
    const [result, setResult] = React.useState<Service<Packages>>({
        status: "loading",
    });

    const params: { [key: string]: string } = { name: name }
    const queryString = Object.keys(params).map((key) => key + '=' + params[key]).join('&');

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/packages/?${queryString}`)
            .then(response => response.json())
            .then(response => setResult({ status: 'loaded', payload: response }))
            .catch(error => setResult({ status: 'error', error }));
    }, [name]);

    return result;
}
