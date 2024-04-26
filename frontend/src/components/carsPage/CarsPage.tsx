import "./CarsPage.css";
import {RepairToCarData} from "../repairsPage/RepairsPage";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import HeaderComponent from "../headerComponent/HeaderComponent";
import TableContainerComponent from "../tableContainer/TableContainerComponent";
import {Avatar, IconButton, TableCell, TableRow} from "@mui/material";
import {stringAvatar} from "../../reusableFunctions/ReusableFunctions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomDialog from "../customDialog/CustomDialog";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddEditCarModal from "../modals/AddEditCarModal";
import CarDetails, {checkStatus} from "./CarsDetails";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export type CarToClientData = {
    id: number,
    mark: string,
    model: string,
    registration: string,
    status: boolean
}

export type CarData = {
    id: number,
    mark: string,
    model: string,
    status: boolean,
    registration: string,
    nr_vin: string,
    client: string,
    repairs: RepairToCarData[]
}

export type CarFormData = {
    id: number,
    mark: string,
    model: string,
    status: boolean,
    registration: string,
    nr_vin: string,
    client: string,
}

const CarsPage = () => {

    const [value, setValue] = useState<CarData | null>(null);
    const url = "http://localhost:8080/api/cars/all";
    const [data, setData] = useState<CarData[]>([]);
    const [allCars, setAllCars] = useState<CarData[]>([]);
    const [openDeleteWindow, setOpenDeleteWindow] = useState(false);
    const [carIdToDelete, setCarIdToDelete] = useState<number | null>(null);
    const [carIdToEdit, setCarIdToEdit] = useState<number | null>(null);
    const [carToViewDetails, setCarToViewDetails] = useState<CarData | null>(null);
    const [openAddCarWindow, setOpenAddCarWindow] = useState(false);
    const [openEditCarWindow, setOpenEditCarWindow] = useState(false);
    const [car, setCar] = useState<CarData | null>(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [carDetailsWindow, setCarDetailsWindow] = useState(false);

    const headers = ["Marka", "Model", "Numer rejestracyjny", "Status naprawy", ""];

    const {
        reset,
        formState: {errors},
    } = useForm<CarFormData>()

    useEffect(() => {
        if (value !== null) {
            setData(data.filter((car) => car.id === value.id));
        } else {
            setData(allCars);
        }
    }, [value]);

    const fetchInfo = async () => {
        const res = await fetch(url);
        const d = await res.json();
        setAllCars(d);
        return setData(d);
    }

    console.log(data);

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        setCar(data?.find((car) => car?.id === carIdToEdit) || null);
    }, [data, carIdToEdit]);

    const onDeleteClick = async (carId: number) => {
        await fetch(`http://localhost:8080/api/clients/${carId}`, {
                method: "DELETE"
            }
        ).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenDeleteWindow(false);
        setCarIdToDelete(null);
    }

    const onAddClick = async (data: CarFormData) => {
        console.log(data);
        await fetch(`http://localhost:8080/api/cars`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenAddCarWindow(false);
        reset();
    }


    console.log(car);

    const onEditSubmit = async (data: CarFormData) => {
        console.log(data)
        await fetch(`http://localhost:8080/api/cars`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: carIdToEdit,
                mark: car?.mark,
                model: car?.model,
                registration: data.registration,
                nr_vin: car?.nr_vin,
                status: data.status
            })
        }).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenEditCarWindow(false);
        setCar(null);
        setCarIdToEdit(null);
        reset();
    }

    useEffect(() => {
        if (carIdToEdit && car) {
            setOpenEditCarWindow(true);
        }
    }, [carIdToEdit, car]);


    useEffect(() => {
        if (openEditCarWindow || openDeleteWindow) {
            setCarDetailsWindow(false);
        }
    }, [openEditCarWindow, openDeleteWindow]);

    console.log(data)

    return (
        <>
            <HeaderComponent label="Samochody" data={data} value={value} onOpen={() => {
                setOpenAddCarWindow(true)
            }} buttonText="Dodaj samochód" setCarValue={setValue} type="car"/>
            <TableContainerComponent headers={headers} className="carTableContainer">
                {data.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        className="table"
                        onClick={() => {
                            setCarToViewDetails(row);
                            setCarDetailsWindow(true);
                        }}
                    >
                        <TableCell className="carNameCell" component="th" scope="row">
                            <Avatar
                                {...stringAvatar(row.mark + " " + row.model)}
                            />
                            {row.mark}
                        </TableCell>
                        <TableCell align="right">{row.model}</TableCell>
                        <TableCell align="right">{row.registration}</TableCell>
                        <TableCell className="statusRow"
                                   sx={{color: row?.status ? "green" : "darkred", fontWeight: "bolder"}} align="right">
                            {row?.status ? <CheckCircleIcon className="statusIcon"/> :
                                <CancelIcon className="statusIcon"/>}
                            <p>{checkStatus(row?.status || false)}</p>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton
                                color="inherit"
                                aria-label="Delete"
                                onClick={() => {
                                    setCarIdToDelete(row.id);
                                    setOpenDeleteWindow(true);
                                }}
                                edge="start"
                                sx={{marginLeft: 0.2, padding: 0, marginTop: -1}}
                                size="small"
                                className="iconButton"
                            >
                                {<DeleteIcon/>}
                            </IconButton>
                            <IconButton
                                color="inherit"
                                aria-label="Edit"
                                onClick={() => {
                                    setCarIdToEdit(row.id);
                                }}
                                edge="start"
                                sx={{marginLeft: 2, padding: 0, marginTop: -1}}
                                size="small"
                                className="iconButton"
                            >
                                {<EditIcon/>}
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableContainerComponent>
            <CustomDialog open={openDeleteWindow} onClose={() => setOpenDeleteWindow(false)}
                          onSubmit={() => onDeleteClick(carIdToDelete || 0)} title={"Usunięcie samochodu"}
                          text={"Czy jesteś pewien, że chcesz usunąć ten samochód"}/>
            <AddEditCarModal open={openAddCarWindow} onClose={() => setOpenAddCarWindow(false)}
                             onSubmit={onAddClick} title={"Dodanie nowego samochodu"}/>
            <AddEditCarModal open={openEditCarWindow} onClose={() => {
                setOpenEditCarWindow(false);
                setCarIdToEdit(null);
            }}
                             onSubmit={onEditSubmit} title={"Edytowanie samochodu"} data={car}/>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
                <Alert
                    onClose={() => setOpenAlert(false)}
                    severity="success"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    Operacja zakończona sukcesem!
                </Alert>
            </Snackbar>
            <CarDetails open={carDetailsWindow} onClose={() => setCarDetailsWindow(false)}
                        title={"Szczegółowe informacje"}
                        car={carToViewDetails}/>
        </>
    )

}

export default CarsPage;