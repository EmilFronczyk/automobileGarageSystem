import React, {Dispatch, ReactNode, SetStateAction} from "react";
import {Autocomplete, Button, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {WorkerData} from "../workersPage/WorkersPage";
import "./HeaderComponent.css"

type headerComponentProps = {
    label: string,
    className?: string,
    data: WorkerData[],
    value: WorkerData | null,
    onOpen: () => void,
    buttonText: string,
    setValue: Dispatch<SetStateAction<WorkerData | null>>
}

const HeaderComponent = ({label, value, buttonText, onOpen, data, className, setValue}: headerComponentProps) => {
    return (
        <div className="headerTopRow">
            <p className="headerLabel">
                {label}
            </p>
            <Autocomplete className="headerSearchBar"
                          value={value} // Do pola value komponentu Autocomplete przekazuje to co jest pod value wyżej w kodzie {} -> coś innego niż string
                          onChange={(event, newValue) => {
                              setValue(newValue);
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