import React, {Dispatch, ReactNode, SetStateAction} from "react";
import {Autocomplete, Button, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {WorkerData} from "../workersPage/WorkersPage";
import "./HeaderComponent.css"
import {ClientData, getNumberOfCarsInRepair} from "../clientsPage/ClientsPage";
import {CarData} from "../carsPage/CarsPage";
import {PartData} from "../warehousePage/WarehousePage";
import PersonIcon from '@mui/icons-material/Person';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import ConstructionIcon from '@mui/icons-material/Construction';
import {RepairData} from "../repairsPage/RepairsPage";

type headerComponentProps = {
    label: string,
    className?: string,
    data: (ClientData | WorkerData | CarData | PartData | RepairData)[],
    value: ClientData | WorkerData | CarData | PartData | RepairData | null,
    onOpen: () => void,
    buttonText: string,
    type: 'client' | 'worker' | 'car' | 'part' | 'repair',
    setClientValue?: Dispatch<SetStateAction<ClientData | null>>
    setWorkerValue?: Dispatch<SetStateAction<WorkerData | null>>
    setCarValue?: Dispatch<SetStateAction<CarData | null>>
    setPartValue?: Dispatch<SetStateAction<PartData | null>>
    setRepairValue?: Dispatch<SetStateAction<RepairData | null>>
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
                             setRepairValue,
                             type
                         }: headerComponentProps) => {
    const getOptionLabel = (option: ClientData | WorkerData | CarData | PartData | RepairData): string => {
        if ('firstName' in option && 'lastName' in option) {
            // Jeśli to dane klienta lub pracownika
            return option.firstName + ' ' + option.lastName;
        } else if ('mark' in option && 'model' in option) {
            // Jeśli to dane samochodu
            return option.mark + ' ' + option.model;
        } else if ('partName' in option) {
            // Jeśli to dane części
            return option.partName;
        } else if ('title' in option) {
            // Jeśli to dane naprawy
            return option.title;
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

        } else if (type === "repair") {
            return "Wyszukaj naprawy";

        } else {
            return "Wyszukaj samochód";
        }
    }

    const getCarsInRepairCount = (): number => {
        let sum = 0;
        if (type === 'client') {
            data.forEach(d => sum += getNumberOfCarsInRepair(d.id, data as ClientData[]))
        } else if (type === 'car') {
            data.forEach((d) => {
                if ('status' in d && d?.status) {
                    sum = sum + 1;
                }
            })
        } else sum = 0;
        return sum;
    }

    const getStatisticHeaders = () => {
        if (type === "client") {
            return ["Liczba wszystkich klientów", "Liczba samochodów w naprawie"];
        } else if (type === "worker") {
            return ["Liczba wszystkich pracowników"];

        } else if (type === "part") {
            return ["Liczba wszystkich części"];

        } else if (type === "repair") {
            return ["Liczba wszystkich trwających napraw"];

        } else {
            return ["Liczba wszystkich samochodów", "Liczba samochodów w naprawie"];
        }
    }

    const getStatisticIcons = () => {
        if (type === "client") {
            return [<PersonIcon sx={{width: 70, height: 70, color: '#40A2D8', marginTop: 2, marginLeft: 2}}/>,
                <CarRepairIcon sx={{width: 70, height: 70, color: '#40A2D8', marginTop: 2, marginLeft: 2}}/>];
        } else if (type === "worker") {
            return [<PersonIcon sx={{width: 70, height: 70, color: '#40A2D8', marginTop: 2, marginLeft: 2}}/>];

        } else if (type === "part") {
            return [<BuildCircleIcon sx={{width: 70, height: 70, color: '#40A2D8', marginTop: 2, marginLeft: 2}}/>];

        } else if (type === "repair") {
            return [<ConstructionIcon sx={{width: 70, height: 70, color: '#40A2D8', marginTop: 2, marginLeft: 2}}/>];

        } else {
            return [<DirectionsCarIcon sx={{width: 70, height: 70, color: '#40A2D8', marginTop: 2, marginLeft: 2}}/>,
                <CarRepairIcon sx={{width: 70, height: 70, color: '#40A2D8', marginTop: 2, marginLeft: 2}}/>];
        }
    }

    return (
        <>
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
                                  } else if (type === 'repair' && setRepairValue) {
                                      setRepairValue(newValue as RepairData | null);
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
            <div className='statistics'>
                <div className="statisticsContainer">
                    {getStatisticIcons()[0]}
                    <div className="counterContainer">
                        <p className="title">{getStatisticHeaders()[0]}</p>
                        <p className="counter">{data?.length || 0}</p>
                    </div>
                </div>
                {getStatisticHeaders().length > 1 && <div className="statisticsContainer">
                    {getStatisticIcons()[1]}
                    <div className="counterContainer">
                        <p className="title">{getStatisticHeaders()[1]}</p>
                        <p className="counter">{getCarsInRepairCount()}</p>
                    </div>
                </div>}
            </div>
        </>
    );

}

export default HeaderComponent