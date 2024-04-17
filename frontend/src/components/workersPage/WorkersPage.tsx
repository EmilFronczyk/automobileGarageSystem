import React, {SyntheticEvent, useEffect, useState} from "react";
import {
    Autocomplete, Avatar, Box, Button,
    createFilterOptions, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import "./WorkerPage.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useForm} from "react-hook-form";
import CustomDialog from "../customDialog/CustomDialog";
import AddEditWorkerModal from "../addEditWorkerModal/AddEditWorkerModal";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TableContainerComponent from "../tableContainer/TableContainerComponent";
import HeaderComponent from "../headerComponent/HeaderComponent";
import {stringAvatar} from "../../reusableFunctions/ReusableFunctions";

export type WorkerData = {
    id: number,
    firstName: string,
    lastName: string,
    position: string,        
    payRate: number,
    phoneNumber: string,
    hireDate: string
}


const WorkersPage = () => {
    const [value, setValue] = useState<WorkerData | null>(null);
    const url = "http://localhost:8080/api/workers/all";
    const [data, setData] = useState<WorkerData[]>([]);
    const [allWorkers, setAllWorkers] = useState<WorkerData[]>([]);
    const [openDeleteWindow, setOpenDeleteWindow] = useState(false);
    const [workerIdToDelete, setWorkerIdToDelete] = useState<number | null>(null);
    const [workerIdToEdit, setWorkerIdToEdit] = useState<number | null>(null);
    const [openAddWorkerWindow, setOpenAddWorkerWindow] = useState(false);
    const [openEditWorkerWindow, setOpenEditWorkerWindow] = useState(false);
    const [worker, setWorker] = useState<WorkerData | null>(null);
    const [openAlert, setOpenAlert] = useState(false);

    const headers = ["Pracownik", "Stanowisko", "Numer telefonu", "Data zatrudnienia", "Stawka (zł/h)", ""];

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors},
    } = useForm<WorkerData>()


    useEffect(() => {
        if (value !== null) {
            setData(data.filter((worker) => worker.id === value.id));
        } else {
            setData(allWorkers);
        }
    }, [value]);

    const fetchInfo = async () => {
        const res = await fetch(url);
        const d = await res.json();
        setAllWorkers(d);
        return setData(d);
    }

    console.log(data);

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        setWorker(data?.find((worker) => worker?.id === workerIdToEdit) || null);
    }, [data, workerIdToEdit]);

    const onDeleteClick = async (workerId: number) => {
        await fetch(`http://localhost:8080/api/workers/${workerId}`, {
                method: "DELETE"
            }
        ).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenDeleteWindow(false);
        setWorkerIdToDelete(null);
    }

    const onAddClick = async (data: WorkerData) => {
        await fetch(`http://localhost:8080/api/workers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenAddWorkerWindow(false);
        reset();
    }


    console.log(worker);

    const onEditSubmit = async (data: WorkerData) => {
        console.log(data)
        await fetch(`http://localhost:8080/api/workers`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: worker?.firstName, lastName: worker?.lastName, payRate: Number(data.payRate),
                hireDate: data.hireDate, position: data.position, phoneNumber: data.phoneNumber
            })
        }).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenEditWorkerWindow(false);
        setWorker(null);
        setWorkerIdToEdit(null);
        reset();
    }

    useEffect(() => {
        if (workerIdToEdit && worker) {
            setOpenEditWorkerWindow(true);
        }
    }, [workerIdToEdit, worker]);

    return (
        <>
            <HeaderComponent label="Pracownicy" data={data} value={value} onOpen={() => {
                setOpenAddWorkerWindow(true)
            }} buttonText="Dodaj pracownika" setWorkerValue={setValue} type="worker"/>
            <TableContainerComponent headers={headers} className="workerTableContainer">
                {data.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        className="table"
                    >
                        <TableCell className="workerNameCell" component="th" scope="row">
                            <Avatar
                                {...stringAvatar(row.firstName + " " + row.lastName)}
                            />
                            {row.firstName + " " + row.lastName}
                        </TableCell>
                        <TableCell align="right">{row.position}</TableCell>
                        <TableCell align="right">{row.phoneNumber}</TableCell>
                        <TableCell align="right">{row.hireDate}</TableCell>
                        <TableCell align="right">{row.payRate}</TableCell>
                        <TableCell align="right">
                            <IconButton
                                color="inherit"
                                aria-label="Delete"
                                onClick={() => {
                                    setWorkerIdToDelete(row.id);
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
                                    setWorkerIdToEdit(row.id);
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
                          onSubmit={() => onDeleteClick(workerIdToDelete || 0)} title={"Usunięcie pracownika"}
                          text={"Czy jesteś pewien, że chcesz usunąć tego pracownika?"}/>
            <AddEditWorkerModal open={openAddWorkerWindow} onClose={() => setOpenAddWorkerWindow(false)}
                                onSubmit={onAddClick} title={"Dodanie nowego pracownika"}/>
            <AddEditWorkerModal open={openEditWorkerWindow} onClose={() => {
                setOpenEditWorkerWindow(false);
                setWorkerIdToEdit(null);
            }}
                                onSubmit={onEditSubmit} title={"Edytowanie pracownika"} data={worker}/>
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
export default WorkersPage;