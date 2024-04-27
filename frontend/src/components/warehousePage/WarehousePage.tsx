import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import HeaderComponent from "../headerComponent/HeaderComponent";
import TableContainerComponent from "../tableContainer/TableContainerComponent";
import {Avatar, IconButton, TableCell, TableRow} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CustomDialog from "../customDialog/CustomDialog";
import AddEditPartModal from "../modals/AddEditPartModal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./WarehousePage.css";

export type PartData = {
    id: number,
    catalogNumber: string,
    partName: string,
    amount: number,
    price: number
}

const WarehousePage = () => {
    const [value, setValue] = useState<PartData | null>(null);
    const url = "http://localhost:8080/api/parts/all";
    const [data, setData] = useState<PartData[]>([]);
    const [allParts, setAllParts] = useState<PartData[]>([]);
    const [openDeleteWindow, setOpenDeleteWindow] = useState(false);
    const [partIdToDelete, setPartIdToDelete] = useState<number | null>(null);
    const [partIdToEdit, setPartIdToEdit] = useState<number | null>(null);
    const [openAddPartWindow, setOpenAddPartWindow] = useState(false);
    const [openEditPartWindow, setOpenEditPartWindow] = useState(false);
    const [part, setPart] = useState<PartData | null>(null);
    const [openAlert, setOpenAlert] = useState(false);

    const headers = ["Nazwa", "Numer katalogowy", "Cena (zł)", "Ilość", ""];

    const {
        reset,
        formState: {errors},
    } = useForm<PartData>()


    useEffect(() => {
        if (value !== null) {
            setData(data.filter((part) => part.id === value.id));
        } else {
            setData(allParts);
        }
    }, [value]);

    const fetchInfo = async () => {
        const res = await fetch(url);
        const d = await res.json();
        setAllParts(d);
        return setData(d);
    }

    console.log(data);

    useEffect(() => {
        fetchInfo();
    }, []);

    useEffect(() => {
        setPart(data?.find((part) => part?.id === partIdToEdit) || null);
    }, [data, partIdToEdit]);

    const onDeleteClick = async (partId: number) => {
        await fetch(`http://localhost:8080/api/parts/${partId}`, {
                method: "DELETE"
            }
        ).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenDeleteWindow(false);
        setPartIdToDelete(null);
    }

    const onAddClick = async (data: PartData) => {
        await fetch(`http://localhost:8080/api/parts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenAddPartWindow(false);
        reset();
    }


    console.log(part);

    const onEditSubmit = async (data: PartData) => {
        console.log(data)
        await fetch(`http://localhost:8080/api/parts`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                catalogNumber: part?.catalogNumber, price: Number(data.price), amount: Number(data.amount),
                partName: data.partName
            })
        }).then(() => {
            fetchInfo();
            setOpenAlert(true);
        }).catch((error) => console.log(error));
        setOpenEditPartWindow(false);
        setPart(null);
        setPartIdToEdit(null);
        reset();
    }

    useEffect(() => {
        if (partIdToEdit && part) {
            setOpenEditPartWindow(true);
        }
    }, [partIdToEdit, part]);

    return (
        <>
            <HeaderComponent label="Części" data={data} value={value} onOpen={() => {
                setOpenAddPartWindow(true)
            }} buttonText="Dodaj część" setPartValue={setValue} type="part"/>
            <TableContainerComponent headers={headers} className="partTableContainer">
                {data.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        className="table"
                    >
                        <TableCell className="partNameCell" component="th" scope="row">
                            {row.partName}
                        </TableCell>
                        <TableCell align="right">{row.catalogNumber}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">
                            <IconButton
                                color="inherit"
                                aria-label="Delete"
                                onClick={() => {
                                    setPartIdToDelete(row.id);
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
                                    setPartIdToEdit(row.id);
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
                          onSubmit={() => onDeleteClick(partIdToDelete || 0)} title={"Usunięcie części"}
                          text={"Czy jesteś pewien, że chcesz usunąć tę część?"}/>
            <AddEditPartModal open={openAddPartWindow} onClose={() => setOpenAddPartWindow(false)}
                              onSubmit={onAddClick} title={"Dodanie nowej części"}/>
            <AddEditPartModal open={openEditPartWindow} onClose={() => {
                setOpenEditPartWindow(false);
                setPartIdToEdit(null);
            }}
                              onSubmit={onEditSubmit} title={"Edytowanie części"} data={part}/>
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
    )

}
export default WarehousePage;