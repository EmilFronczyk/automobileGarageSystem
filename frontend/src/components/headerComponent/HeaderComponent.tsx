import React, {Dispatch, ReactNode, SetStateAction} from "react";
import {Autocomplete, Button, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {WorkerData} from "../workersPage/WorkersPage";
import "./HeaderComponent.css"
import {ClientData} from "../clientsPage/ClientsPage";

type headerComponentProps = {
    label: string,
    className?: string,
    data: (ClientData | WorkerData)[],
    value: ClientData | WorkerData | null,
    onOpen: () => void,
    buttonText: string,
    type: 'client' | 'worker',
    setClientValue?: Dispatch<SetStateAction<ClientData | null>>
    setWorkerValue?: Dispatch<SetStateAction<WorkerData | null>>
}


const HeaderComponent = ({
                             label,
                             value,
                             buttonText,
                             onOpen,
                             data,
                             className,
                             setClientValue,
                             setWorkerValue,
                             type
                         }: headerComponentProps) => {
    return (
        <div className="headerTopRow">
            <p className="headerLabel">
                {label}
            </p>
            <Autocomplete className="headerSearchBar"
                          value={value} // Do pola value komponentu Autocomplete przekazuje to co jest pod value wyżej w kodzie {} -> coś innego niż string
                          onChange={(event, newValue) => {
                              if (type === 'client' && setClientValue) {
                                  setClientValue(newValue as ClientData | null);
                              } else if (type === 'worker' && setWorkerValue) {
                                  setWorkerValue(newValue as WorkerData | null);
                              }
                          }}
                          size="small"
                          options={data}
                          getOptionLabel={(option) => option.firstName + " " + option.lastName}
                          renderInput={(params) => <TextField {...params} label="Wyszukaj pracownika"/>}
            />
            <Button className="addButton" variant="contained" onClick={onOpen}>
                <AddIcon sx={{marginRight: 2}}/> {buttonText}
            </Button>
        </div>
    );

}

export default HeaderComponent