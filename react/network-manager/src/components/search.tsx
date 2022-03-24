import * as React from "react";
import {Autocomplete, TextField} from "@mui/material";
import {useSubnetsService, useInterfacesService, usePackagesService} from "../clients";
import {useNavigate} from "react-router-dom";

interface Option {
    id: string
    display: string
    type: string
}

export const Search: React.FC = () => {
    const [search, setSearch] = React.useState("")
    const [subnetOptions, setSubnetOptions] = React.useState<Option[]>([])
    const [interfaceOptions, setInterfaceOptions] = React.useState<Option[]>([])
    const [packageOptions, setPackageOptions] = React.useState<Option[]>([])
    const [options, setOptions] = React.useState<Option[]>([])



    const subnetsService = useSubnetsService(search)
    const interfaceService = useInterfacesService({ name: search })
    const packagesService = usePackagesService(search)
    const navigate = useNavigate()

    const handleSearch = (_: React.SyntheticEvent, newValue: string) => setSearch(newValue)
    React.useMemo(() => {
        if (subnetsService.status === 'loaded') {
            setSubnetOptions(subnetsService.payload.map((s) => ({ id: s.id, display: s.cidr, type: 'subnet' })))
        }
    }, [search])

    React.useMemo(() => {
        if (interfaceService.status === 'loaded') {
            setInterfaceOptions(interfaceService.payload.map((i) => ({id: i.id, display: i.name, type: 'interface'})))
        }
    }, [search])

    React.useMemo(() => {
        if (packagesService.status === 'loaded') {
            setPackageOptions(packagesService.payload.map((p) => ({id: p.id, display: p.name, type: 'package'})))
        }
    }, [search])

    const handleSelect = (_: React.SyntheticEvent, value: string | Option | null) => navigate(`/${(value as Option).type}/${(value as Option).id}`)

    React.useMemo(() => {
        setOptions(subnetOptions.concat(interfaceOptions).concat(packageOptions))
    }, [subnetOptions, interfaceOptions, packageOptions])

    return (
        <div>
            <Autocomplete
                id={`search`}
                onInputChange={handleSearch}
                onChange={handleSelect}
                groupBy={(e) => e.type}
                freeSolo
                sx={{ width: 300 }}
                options={options}
                getOptionLabel={(option) => option.display}
                renderOption={(props, option: Option) => {
                    return(
                        <li {...props} key={option.id}>
                            {option.display}
                        </li>
                    )
                }}

                renderInput={(params) => <TextField {...params} label="Search subnets and interfaces..." />}
            />
        </div>
    )
}