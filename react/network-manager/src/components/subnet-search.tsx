import * as React from "react";
import {Autocomplete, TextField} from "@mui/material";
import {useSubnetsService, Subnet} from "../clients";

export const SubnetSearch: React.FC = () => {
    const [search, setSearch] = React.useState("")
    const [options, setOptions] = React.useState<Subnet[]>([])
    const subnetsService = useSubnetsService(search)

    const handleSearch = (_: React.SyntheticEvent, newValue: string) => setSearch(newValue)
    React.useMemo(() => {
        if (subnetsService.status === 'loaded') {
            setOptions(subnetsService.payload)
        }
    }, [search])

    return (
        <div>
            <Autocomplete
                id={`search`}
                onInputChange={handleSearch}
                freeSolo
                sx={{ width: 300 }}
                options={options}
                getOptionLabel={(option) => option.cidr}
                renderOption={(props, option: Subnet) => {
                    return(
                        <li {...props} key={option.id}>
                            {option.cidr}: {option.interfaces.map((e) => e.id)}
                        </li>
                    )
                }}

                renderInput={(params) => <TextField {...params} label="Search subnets..." />}
            />
        </div>
    )
}