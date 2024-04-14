import React, {SyntheticEvent, useEffect, useState} from "react";
import {
    Autocomplete, Avatar, Button,
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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';


type WorkerData = {
    id: number,
    firstName: string,
    lastName: string,
    position: string,
    payRate: number,
    phoneNumber: string,
    hireDate: string
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            width: 32, height: 32,
            bgcolor: stringToColor(name),
            fontSize: 15
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const WorkersPage = () => {
    const [value, setValue] = useState<WorkerData | null>(null);
    const [open, toggleOpen] = useState(false);
    const url = "http://localhost:8080/api/workers/all";
    const [data, setData] = useState<WorkerData[]>([]);
    const [allWorkers, setAllWorkers] = useState<WorkerData[]>([]);
    const [openDeleteWindow, setOpenDeleteWindow] = useState(false);
    const [workerIdToDelete, setWorkerIdToDelete] = useState<number | null>(null);

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

    const onDeleteClick = async (workerId: number) => {
        await fetch(`http://localhost:8080/api/workers/${workerId}`, {
                method: "DELETE"
            }
        ).then(() => fetchInfo()).catch((error) => console.log(error));
        setOpenDeleteWindow(false);
        setWorkerIdToDelete(null);
    }

    return (
        <>
            <div className="workersTopRow">
                <p className="workersLabel">
                    Pracownicy
                </p>
                <Autocomplete className="workersSearchBar"
                              value={value} // Do pola value komponentu Autocomplete przekazuje to co jest pod value wyżej w kodzie {} -> coś innego niż string
                              onChange={(event, newValue) => {
                                  setValue(newValue);
                              }}
                              size="small"
                              options={data}
                              getOptionLabel={(option) => option.firstName + " " + option.lastName}
                              renderInput={(params) => <TextField {...params} label="Wyszukaj pracownika"/>}
                />
            </div>

            <TableContainer className="workerTableContainer" component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Pracownik</TableCell>
                            <TableCell align="right">Stanowisko</TableCell>
                            <TableCell align="right">Numer telefonu</TableCell>
                            <TableCell align="right">Data zatrudnienia</TableCell>
                            <TableCell align="right">Stawka (zł/h)</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
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
                                        onClick={() => console.log("kliknelo sie edit")}
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
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={openDeleteWindow}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpenDeleteWindow(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Usunięcie pracownika</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Czy jesteś pewien, że chcesz usunąć tego pracownika?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onDeleteClick(workerIdToDelete || 0)}>Zatwierdź</Button>
                    <Button onClick={() => setOpenDeleteWindow(false)}>Anuluj</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}
export default WorkersPage;