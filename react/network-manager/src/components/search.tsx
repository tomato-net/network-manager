import * as React from "react";
import {Autocomplete, Box, CircularProgress, TextField} from "@mui/material";
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
    const [open, setOpen] = React.useState<Boolean>(false)

    const subnetsService = useSubnetsService(search)
    const interfaceService = useInterfacesService({ name: search })
    const packagesService = usePackagesService(search)
    const loading = open && (subnetsService.status != 'loaded' || interfaceService.status != 'loaded' || packagesService.status != 'loaded')

    const navigate = useNavigate()

    const handleSearch = (_: React.SyntheticEvent, newValue: string) => setSearch(newValue)
    React.useMemo(() => {
        if (subnetsService.status === 'loaded') {
            setSubnetOptions(subnetsService.payload.map((s) => ({ id: s.id, display: s.cidr, type: 'subnet' })))
        }
    }, [search, subnetsService.status])

    React.useMemo(() => {
        if (interfaceService.status === 'loaded') {
            setInterfaceOptions(interfaceService.payload.map((i) => ({id: i.id, display: i.name, type: 'interface'})))
        }
    }, [search, interfaceService.status])

    React.useMemo(() => {
        if (packagesService.status === 'loaded') {
            setPackageOptions(packagesService.payload.map((p) => ({id: p.id, display: p.name, type: 'package'})))
        }
    }, [search, packagesService.status])

    const handleSelect = (_: React.SyntheticEvent, value: string | Option | null) => navigate(`/${(value as Option).type}/${(value as Option).id}`)

    React.useMemo(() => {
        console.log("memo")
        setOptions(subnetOptions.concat(interfaceOptions).concat(packageOptions))
    }, [subnetOptions, interfaceOptions, packageOptions])

    return (
        <Box>
            <Autocomplete
                id={`search`}
                onInputChange={handleSearch}
                onChange={handleSelect}
                groupBy={(e) => e.type}
                onOpen={() => { setOpen(true) }}
                onClose={() => { setOpen(false) }}
                freeSolo
                sx={{ width: 300 }}
                options={options}
                loading={loading}
                getOptionLabel={(option) => option.display}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={`Search...`}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            )
                        }}
                    />
                )}
                renderOption={(props, option: Option) => {
                    return(
                        <li {...props} key={option.id}>
                            {option.display}
                        </li>
                    )
                }}
            />
        </Box>
    )
}