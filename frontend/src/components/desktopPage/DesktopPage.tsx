import React, {useEffect, useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import BadgeIcon from '@mui/icons-material/Badge';
import "./DesktopPage.css";
import SavingsIcon from '@mui/icons-material/Savings';
import PaidIcon from '@mui/icons-material/Paid';
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {stringAvatar, stringToColor} from "../../reusableFunctions/ReusableFunctions";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {CarData} from "../carsPage/CarsPage";
import {ClientData} from "../clientsPage/ClientsPage";
import {WorkerData} from "../workersPage/WorkersPage";
import {useNavigate} from "react-router-dom";
import {PartData} from "../warehousePage/WarehousePage";
import {RepairData} from "../repairsPage/RepairsPage";

const DesktopPage = () => {

    const [dense, setDense] = React.useState(false);
    const clientsUrl = "http://localhost:8080/api/clients/all";
    const workersUrl = "http://localhost:8080/api/workers/all";
    const occupiedWorkersUrl = "http://localhost:8080/api/workers/allOccupied";
    const carsUrl = "http://localhost:8080/api/cars/all";
    const partsUrl = "http://localhost:8080/api/parts/all";
    const repairsUrl = "http://localhost:8080/api/repairs/all";

    const [clientData, setClientData] = useState<ClientData[]>([]);
    const [workersData, setWorkersData] = useState<WorkerData[]>([]);
    const [occupiedWorkersData, setOccupiedWorkersData] = useState<WorkerData[]>([]);
    const [carsData, setCarsData] = useState<CarData[]>([]);
    const [partsData, setPartsData] = useState<PartData[]>([]);
    const [repairsData, setRepairsData] = useState<RepairData[]>([]);

    const navigate = useNavigate();

    const fetchClientsInfo = async () => {
        const res = await fetch(clientsUrl);
        const d = await res.json();
        return setClientData(d);
    }

    const fetchWorkersInfo = async () => {
        const res = await fetch(workersUrl);
        const d = await res.json();
        return setWorkersData(d);
    }

    const fetchOccupiedWorkersInfo = async () => {
        const res = await fetch(occupiedWorkersUrl);
        const d = await res.json();
        return setOccupiedWorkersData(d);
    }

    const fetchCarsInfo = async () => {
        const res = await fetch(carsUrl);
        const d = await res.json();
        return setCarsData(d);
    }

    const fetchPartsInfo = async () => {
        const res = await fetch(partsUrl);
        const d = await res.json();
        return setPartsData(d);
    }
    const fetchRepairsInfo = async () => {
        const res = await fetch(repairsUrl);
        const d = await res.json();
        return setRepairsData(d);
    }

    useEffect(() => {
        fetchClientsInfo();
        fetchWorkersInfo();
        fetchOccupiedWorkersInfo();
        fetchCarsInfo();
        fetchPartsInfo();
        fetchRepairsInfo();
    }, []);

    console.log(repairsData);
    const getExpenseInCurrentMonth = () => {
        let sum = 0;
        let date = new Date();
        repairsData.forEach((repair) => {
            const parts = repair.date.split("/"); // Dzielimy string po "/"
            const day = parseInt(parts[0], 10); // Parsujemy dzień na liczbę całkowitą
            const month = parseInt(parts[1], 10) - 1; // Parsujemy miesiąc na liczbę całkowitą (odejmujemy 1, ponieważ miesiące w JavaScript są indeksowane od 0)
            const year = parseInt(parts[2], 10); // Parsujemy rok na liczbę całkowitą
            const repairDate = new Date(year, month, day);
            if (repairDate.getMonth() === date.getMonth() && repairDate.getFullYear() === date.getFullYear()) {
                sum += repair.spending;
            }
        })
        return sum;

    }

    const getIncomeInCurrentMonth = () => {
        let sum = 0;
        let date = new Date();
        repairsData.forEach((repair) => {
            const parts = repair.date.split("/"); // Dzielimy string po "/"
            const day = parseInt(parts[0], 10); // Parsujemy dzień na liczbę całkowitą
            const month = parseInt(parts[1], 10) - 1; // Parsujemy miesiąc na liczbę całkowitą (odejmujemy 1, ponieważ miesiące w JavaScript są indeksowane od 0)
            const year = parseInt(parts[2], 10); // Parsujemy rok na liczbę całkowitą
            const repairDate = new Date(year, month, day);
            if (repairDate.getMonth() === date.getMonth() && repairDate.getFullYear() === date.getFullYear()) {
                sum += repair.income;
            }
        })
        return sum;

    }

    return (
        <div className="desktopMainContainer">
            <h1>STRONA GŁÓWNA</h1>
            <div className="mainInfoContainer">
                <div className="mainStatisticsContainer">
                    <CarRepairIcon sx={{
                        width: 70,
                        height: 70,
                        color: '#86B6F6',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        marginLeft: 2,
                        backgroundColor: '#86B6F630',
                        borderRadius: '10px',
                        padding: '5px'
                    }}/>
                    <div className="counterContainer">
                        <p className="title">Liczba wszystkich samochodów w naprawie</p>
                        <p className="counter">
                            {carsData.filter(row => row.status).length}
                        </p>
                    </div>
                </div>
                <div className="mainStatisticsContainer">
                    <PersonIcon sx={{
                        width: 70,
                        height: 70,
                        color: '#59B4C3',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        marginLeft: 2,
                        backgroundColor: '#59B4C330',
                        borderRadius: '10px',
                        padding: '5px'
                    }}/>
                    <div className="counterContainer">
                        <p className="title">Liczba wszystkich klientów</p>
                        <p className="counter">
                            {clientData.length}
                        </p>
                    </div>
                </div>
                <div className="mainStatisticsContainer">
                    <BadgeIcon sx={{
                        width: 70,
                        height: 70,
                        color: '#9195F6',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        marginLeft: 2,
                        backgroundColor: '#9195F630',
                        borderRadius: '10px',
                        padding: '5px'
                    }}/>
                    <div className="counterContainer">
                        <p className="title">Liczba wszystkich pracowników</p>
                        <p className="counter">
                            {workersData.length}
                        </p>
                    </div>
                </div>
            </div>
            <h1>AKTUALIZACJE</h1>
            <div className="moneyInfoContainer">
                <div className="moneyStatisticContainer">
                    <SavingsIcon sx={{
                        width: 70,
                        height: 70,
                        color: '#90D26D',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        marginLeft: 2,
                        backgroundColor: '#90D26D30',
                        borderRadius: '10px',
                        padding: '5px'
                    }}/>
                    <div className="counterContainer">
                        <p className="title">Zarobki
                            - {new Date().toLocaleString('default', {month: 'long'}).toUpperCase()}</p>
                        <p className="counter">
                            {getIncomeInCurrentMonth()} zł
                        </p>
                    </div>
                </div>
                <div className="moneyStatisticContainer">
                    <PaidIcon sx={{
                        width: 70,
                        height: 70,
                        color: '#F5DD61',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        marginLeft: 2,
                        backgroundColor: '#F5DD6130',
                        borderRadius: '10px',
                        padding: '5px'
                    }}/>
                    <div className="counterContainer">
                        <p className="title">Wydatki
                            - {new Date().toLocaleString('default', {month: 'long'}).toUpperCase()}</p>
                        <p className="counter">
                            {getExpenseInCurrentMonth()} zł
                        </p>
                    </div>
                </div>
            </div>
            <div className="carContainer">
                <div className="carInfoContainer">
                    <h2>Samochody w naprawie</h2>
                    <List dense={dense}>
                        {carsData.filter(row => row.status).map((row) =>
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <ArrowCircleRightIcon
                                            sx={{
                                                color: stringToColor(row.mark + " " + row.model)
                                            }}
                                            onClick={() => {
                                                navigate("/cars");
                                            }}/>
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        {...stringAvatar(row.mark + " " + row.model)}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={row.mark + " " + row.model}
                                />
                            </ListItem>
                        )}
                    </List>
                </div>
                <div className="occupiedWorkerInfoContainer">
                    <h2>Zajęci pracownicy</h2>
                    <List dense={dense}>
                        {occupiedWorkersData.map((row) =>
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <ArrowCircleRightIcon
                                            sx={{
                                                color: stringToColor(row.firstName + " " + row.lastName)
                                            }}
                                            onClick={() => {
                                                navigate("/workers");
                                            }}/>
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        {...stringAvatar(row.firstName + " " + row.lastName)}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={row.firstName + " " + row.lastName}
                                />
                            </ListItem>
                        )}
                    </List>
                </div>
                <div className="partsInfoContainer">
                    <h2>Lista kończących się części</h2>
                    <List dense={dense}>
                        {partsData.filter(row => row.amount <= 3).map((row) =>
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <ArrowCircleRightIcon
                                            sx={{
                                                color: stringToColor(row.partName)
                                            }}
                                            onClick={() => {
                                                navigate("/warehouse");
                                            }}/>
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={row.partName}
                                />
                            </ListItem>
                        )}
                    </List>
                </div>
            </div>
        </div>
    )

}

export default DesktopPage;