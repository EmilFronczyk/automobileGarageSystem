import {stringAvatar} from "../../reusableFunctions/ReusableFunctions";
import {CarToClientData} from "../carsPage/CarsPage";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import HeaderComponent from "../headerComponent/HeaderComponent";
import TableContainerComponent from "../tableContainer/TableContainerComponent";
import {Avatar, IconButton, TableCell, TableRow} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomDialog from "../customDialog/CustomDialog";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddEditClientModal from "../addEditClientModal/AddEditClientModal";
import "./ClientPage.css";

export type ClientFormData = {
    id: number,
    firstName: string,
    lastName: string,
    phoneNumber: string

}

export type ClientData = {
    id: number,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    cars: CarToClientData[]
}

const ClientsPage = () => {

    const [value, setValue] = useState<ClientData | null>(null);
    const url = "http://localhost:8080/api/clients/all";
    const [data, setData] = useState<ClientData[]>([]);
    const [allClients, setAllClients] = useState<ClientData[]>([]);
    const [openDeleteWindow, setOpenDeleteWindow] = useState(false);
    const [clientIdToDelete, setClientIdToDelete] = useState<number | null>(null);
    const [clientIdToEdit, setClientIdToEdit] = useState<number | null>(null);
    const [openAddClientWindow, setOpenAddClientWindow] = useState(false);
    const [openEditClientWindow, setOpenEditClientWindow] = useState(false);
    const [client, setClient] = useState<ClientData | null>(null);
    const [openAlert, setOpenAlert] = useState(false);

    const headers = ["Imię", "Nazwisko", "Numer telefonu", "Samochody w naprawie", ""];

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors},
    } = useForm<ClientFormData>()

    useEffect(() => {
        if (value !== null) {
            setData(data.filter((client) => client.id === value.id));
        } else {
            setData(allClients);
        }
    }, [value]);

    const fetchInfo = async () => {
        const res = await fetch(url);
        const d = await res.json();
        setAllClients(d);
        return setData(d);
    }

    console.log(data);

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        setClient(data?.find((worker) => worker?.id === clientIdToEdit) || null);
    }, [data, clientIdToEdit]);

    const onDeleteClick = async (clientId: number) => {
        await fetch(`http://localhost:8080/api/clients/${clientId}`, {
                method: "DELETE"
            }
        ).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenDeleteWindow(false);
        setClientIdToDelete(null);
    }

    const onAddClick = async (data: ClientFormData) => {
        await fetch(`http://localhost:8080/api/clients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenAddClientWindow(false);
        reset();
    }


    console.log(client);

    const onEditSubmit = async (data: ClientFormData) => {
        console.log(data)
        await fetch(`http://localhost:8080/api/clients`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: client?.firstName, lastName: client?.lastName, phoneNumber: data.phoneNumber
            })
        }).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenEditClientWindow(false);
        setClient(null);
        setClientIdToEdit(null);
        reset();
    }

    useEffect(() => {
        if (clientIdToEdit && client) {
            setOpenEditClientWindow(true);
        }
    }, [clientIdToEdit, client]);

    const getNumberOfCarsInRepair = (clientId: number): number => {
        return data.find((client) => client.id === clientId)?.cars.length || 0;
    }

    return (
        <>
            <HeaderComponent label="Klienci" data={data} value={value} onOpen={() => {
                setOpenAddClientWindow(true)
            }} buttonText="Dodaj klienta" setClientValue={setValue} type="client"/>
            <TableContainerComponent headers={headers} className="clientTableContainer">
                {data.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        className="table"
                        onClick={() => console.log("kliknelo sie na wiersz")}
                    >
                        <TableCell className="clientNameCell" component="th" scope="row">
                            <Avatar
                                {...stringAvatar(row.firstName + " " + row.lastName)}
                            />
                            {row.firstName}
                        </TableCell>
                        <TableCell align="right">{row.lastName}</TableCell>
                        <TableCell align="right">{row.phoneNumber}</TableCell>
                        <TableCell align="right">{getNumberOfCarsInRepair(row.id)}</TableCell>
                        <TableCell align="right">
                            <IconButton
                                color="inherit"
                                aria-label="Delete"
                                onClick={() => {
                                    setClientIdToDelete(row.id);
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
                                    setClientIdToEdit(row.id);
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
                          onSubmit={() => onDeleteClick(clientIdToDelete || 0)} title={"Usunięcie klienta"}
                          text={"Czy jesteś pewien, że chcesz usunąć tego klienta?"}/>
            <AddEditClientModal open={openAddClientWindow} onClose={() => setOpenAddClientWindow(false)}
                                onSubmit={onAddClick} title={"Dodanie nowego klienta"}/>
            <AddEditClientModal open={openEditClientWindow} onClose={() => {
                setOpenEditClientWindow(false);
                setClientIdToEdit(null);
            }}
                                onSubmit={onEditSubmit} title={"Edytowanie klienta"} data={client}/>
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
        </>
    );
}

export default ClientsPage