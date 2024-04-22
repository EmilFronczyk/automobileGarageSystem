import React, {Dispatch, ReactNode, SetStateAction} from "react";
import {Autocomplete, Button, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {WorkerData} from "../workersPage/WorkersPage";
import "./HeaderComponent.css"
import {ClientData} from "../clientsPage/ClientsPage";
import {CarData} from "../carsPage/CarsPage";
import {PartData} from "../warehousePage/WarehousePage";

type headerComponentProps = {
    label: string,
    className?: string,
    data: (ClientData | WorkerData | CarData | PartData)[],
    value: ClientData | WorkerData | CarData | PartData | null,
    onOpen: () => void,
    buttonText: string,
    type: 'client' | 'worker' | 'car' | 'part',
    setClientValue?: Dispatch<SetStateAction<ClientData | null>>
    setWorkerValue?: Dispatch<SetStateAction<WorkerData | null>>
    setCarValue?: Dispatch<SetStateAction<CarData | null>>
    setPartValue?: Dispatch<SetStateAction<PartData | null>>
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
                             setCarValue,
                             setPartValue,
                             type
                         }: headerComponentProps) => {
    const getOptionLabel = (option: ClientData | WorkerData | CarData | PartData): string => {
        if ('firstName' in option && 'lastName' in option) {
            // Jeśli to dane klienta lub pracownika
            return option.firstName + ' ' + option.lastName;
        } else if ('mark' in option && 'model' in option) {
            // Jeśli to dane samochodu
            return option.mark + ' ' + option.model;
        } else if ('partName' in option) {
            // Jeśli to dane samochodu
            return option.partName;
        } else {
            // Inny rodzaj danych
            return ''; // Możesz dostosować to do własnych potrzeb
        }
    }

    const getTitle = (): string => {
        if (type === "client") {
            return "Wyszukaj klienta";
        } else if (type === "worker") {
            return "Wyszukaj pracownika";

        } else if (type === "part") {
            return "Wyszukaj część";

        } else {
            return "Wyszukaj samochód";
        }
    }

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
                              } else if (type === 'car' && setCarValue) {
                                  setCarValue(newValue as CarData | null);
                              } else if (type === 'part' && setPartValue) {
                                  setPartValue(newValue as PartData | null);
                              }
                          }}
                          size="small"
                          options={data}
                          getOptionLabel={(option) => getOptionLabel(option)}
                          renderInput={(params) => <TextField {...params} label={getTitle()}/>}
            />
            <Button className="addButton" variant="contained" onClick={onOpen}>
                <AddIcon sx={{marginRight: 2}}/> {buttonText}
            </Button>
        </div>
    );

}

export default HeaderComponent