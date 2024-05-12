import {PartData} from "../warehousePage/WarehousePage";
import "./RepairsPage.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import HeaderComponent from "../headerComponent/HeaderComponent";
import TableContainerComponent from "../tableContainer/TableContainerComponent";
import {Avatar, IconButton, TableCell, TableRow} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CarDetails, {checkStatus} from "../carsPage/CarsDetails";
import CustomDialog from "../customDialog/CustomDialog";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddEditRepairModal from "../modals/AddEditRepairModal";
import RepairDetail from "./RepairDetail";

export type RepairToCarData = {
    id: number,
    title: string,
    date: string
}

export type RepairData = {
    id: number,
    client: string,
    vehicle: string
    worker: string,
    registration: string,
    status: boolean,
    date: string,
    title: string,
    parts: PartData[],
    income: number,
    spending: number,
    costOfRepair: number
}
const RepairsPage = () => {
    const [value, setValue] = useState<RepairData | null>(null);
    const url = "http://localhost:8080/api/repairs/all";
    const [data, setData] = useState<RepairData[]>([]);
    const [allRepairs, setAllRepairs] = useState<RepairData[]>([]);
    const [openDeleteWindow, setOpenDeleteWindow] = useState(false);
    const [repairIdToDelete, setRepairIdToDelete] = useState<number | null>(null);
    const [repairIdToEdit, setRepairIdToEdit] = useState<number | null>(null);
    const [repairToViewDetails, setRepairToViewDetails] = useState<RepairData | null>(null);
    const [openAddRepairWindow, setOpenAddRepairWindow] = useState(false);
    const [openEditRepairWindow, setOpenEditRepairWindow] = useState(false);
    const [repair, setRepair] = useState<RepairData | null>(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [repairDetailsWindow, setRepairDetailsWindow] = useState(false);

    const headers = ["Tytuł naprawy", "Samochód", "Przypisany pracownik", "Status naprawy", ""];

    const {
        reset,
        formState: {errors},
    } = useForm<RepairData>()

    useEffect(() => {
        if (value !== null) {
            setData(data.filter((repair) => repair.id === value.id));
        } else {
            setData(allRepairs);
        }
    }, [value]);

    const fetchInfo = async () => {
        const res = await fetch(url);
        const d = await res.json();
        setAllRepairs(d);
        return setData(d);
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const onDeleteClick = async (repairId: number) => {
        await fetch(`http://localhost:8080/api/repairs/${repairId}`, {
                method: "DELETE"
            }
        ).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenDeleteWindow(false);
        setRepairIdToDelete(null);
    }

    const onAdd = (data: RepairData) => {
        console.log(data)
        fetch(`http://localhost:8080/api/repairs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenAddRepairWindow(false);
        reset();
    }

    const onEditSubmit = (data: RepairData) => {
        fetch(`http://localhost:8080/api/repairs`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: repairIdToEdit,
                client: repair?.client,
                vehicle: repair?.vehicle,
                registration: repair?.registration,
                status: data.status,
                title: data.title,
                parts: data.parts,
                date: data.date
            })
        }).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenEditRepairWindow(false);
        setRepair(null);
        setRepairIdToEdit(null);
        reset();
    }

    useEffect(() => {
        setRepair(data?.find((repair) => repair?.id === repairIdToEdit) || null);
    }, [data, repairIdToEdit]);

    useEffect(() => {
        if (repairIdToEdit && repair) {
            setOpenEditRepairWindow(true);
        }
    }, [repairIdToEdit, repair]);


    useEffect(() => {
        if (openEditRepairWindow || openDeleteWindow) {
            setRepairDetailsWindow(false);
        }
    }, [openEditRepairWindow, openDeleteWindow]);

    return (
        <>
            <HeaderComponent label="Naprawy" data={data} value={value} onOpen={() => {
                setOpenAddRepairWindow(true)
            }} buttonText="Dodaj naprawę" setRepairValue={setValue} type="repair"/>
            <TableContainerComponent headers={headers} className="repairTableContainer">
                {data.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        className="table"
                        onClick={() => {
                            setRepairToViewDetails(row);
                            setRepairDetailsWindow(true);
                        }}
                    >
                        <TableCell className="repairNameCell" component="th" scope="row">
                            {row.title}
                        </TableCell>
                        <TableCell align="right">{row.vehicle}</TableCell>
                        <TableCell align="right">{row.worker}</TableCell>
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
                                    setRepairIdToDelete(row.id);
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
                                    setRepairIdToEdit(row.id);
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
                          onSubmit={() => onDeleteClick(repairIdToDelete || 0)} title={"Usunięcie naprawy"}
                          text={"Czy jesteś pewien, że chcesz usunąć tę naprawę"}/>
            <AddEditRepairModal open={openAddRepairWindow} onClose={() => setOpenAddRepairWindow(false)}
                                title={"Dodanie nowej naprawy"} onAdd={onAdd}/>
            <AddEditRepairModal open={openEditRepairWindow} onClose={() => {
                setOpenEditRepairWindow(false);
                setRepairIdToEdit(null);
            }} title={"Edytowanie naprwy"} data={repair} onEdit={onEditSubmit}/>
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
            <RepairDetail open={repairDetailsWindow} onClose={() => setRepairDetailsWindow(false)}
                          title={"Szczegółowe informacje"}
                          repair={repairToViewDetails}/>
        </>
    )

}

export default RepairsPage;