import {RepairData} from "../repairsPage/RepairsPage";
import {Resolver, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import RepairValidation from "../validation/RepairValidation";
import Modal from "@mui/material/Modal";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, {useEffect, useState} from "react";
import {ClientData} from "../clientsPage/ClientsPage";
import {removeDuplicateCars} from "../../reusableFunctions/ReusableFunctions";
import AddPartsToRepair from "./AddPartsToRepair";
import {PartData} from "../warehousePage/WarehousePage";
import {WorkerData} from "../workersPage/WorkersPage";
import {Simulate} from "react-dom/test-utils";
import {DateField, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";

type addEditRepairModalProps = {
    open: boolean,
    onClose: () => void,
    title: string,
    data?: RepairData | null,
    onAdd?: (data: RepairData) => void;
    onEdit?: (data: RepairData) => void;
}

const AddEditRepairModal = ({open, title, onClose, data, onAdd, onEdit}: addEditRepairModalProps) => {

    const {
        register,
        handleSubmit,
        trigger,
        reset,
        setValue,
        watch,
        formState: {errors}
    } = useForm<RepairData>({resolver: yupResolver(RepairValidation()) as unknown as Resolver<RepairData>});

    const [clients, setClients] = useState<ClientData[]>([]);
    const [workers, setWorkers] = useState<WorkerData[]>([]);
    const [clientName, setClientName] = useState<string>("");
    const [workerName, setWorkerName] = useState<string>("");
    const [car, setCar] = useState<string>("");
    const [registration, setRegistration] = useState<string>("");
    const [openAddParts, setOpenAddParts] = useState(false);
    const clientsUrl = "http://localhost:8080/api/clients/all";
    const workersUrl = "http://localhost:8080/api/workers/all";
    const [partsToSave, setPartsToSave] = useState<PartData[]>([]);
    const [date, setDate] = useState<Dayjs | null>(null);

    const fetchClientsInfo = async () => {
        const res = await fetch(clientsUrl);
        const d = await res.json();
        return setClients(d);
    }

    const fetchWorkersInfo = async () => {
        const res = await fetch(workersUrl);
        const d = await res.json();
        return setWorkers(d);
    }

    useEffect(() => {
        fetchClientsInfo();
        fetchWorkersInfo();
    }, []);

    const onAddRepairSubmit = (formData: RepairData) => {
        console.log({...formData, parts: partsToSave});
        if (!!data) {
            if (onEdit) {
                onEdit({...formData, parts: partsToSave})
            }
        } else {
            if (onAdd) {
                onAdd({...formData, parts: partsToSave});
            }
        }
    }

    useEffect(() => {
        if (!!data) {
            setClientName(data.client);
            setWorkerName(data.worker);
            setRegistration(data.registration);
            setCar(data.vehicle);
            setPartsToSave(data.parts);
            setDate(dayjs(data.date, "DD/MM/YYYY"))
            setValue('registration', data.registration);
            setValue('client', data.client);
            setValue('vehicle', data.vehicle);
            setValue('worker', data.worker);
            setValue('date', data.date);
        }
    }, [data]);

    const clearFields = () => {
        setCar('');
        setRegistration('');
        setWorkerName('');
        setClientName('');
        setDate(null);
        setPartsToSave([]);
        reset();
    }

    useEffect(() => {
        setValue('registration', registration);
        setValue('client', clientName);
        setValue('vehicle', car);
        setValue('worker', workerName);
        setValue('date', date?.format("DD/MM/YYYY") || '')
    }, [clientName, workerName, car, registration]);

    console.log(data)

    return (
        <>
            <Modal
                open={open}
                onClose={() => {
                    onClose();
                    clearFields();
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form className="addRepairWindow" onSubmit={handleSubmit(onAddRepairSubmit)}>
                    <div className="modalTitleContainer">
                        <p className="addRepairTextInfo">
                            {title}
                        </p>
                        <IconButton
                            color="inherit"
                            aria-label="Edit"
                            onClick={() => {
                                onClose();
                            }}
                            edge="start"
                            sx={{marginLeft: 2, padding: 0}}
                            size="medium"
                            className="iconButton"
                        >
                            {<CloseIcon/>}
                        </IconButton>
                    </div>
                    <div className="addRepairDiv">
                        <Box className="clientInputAddRepair" sx={{display: 'flex'}}>
                            <FormControl className="clientFormInput" required sx={{m: 1, minWidth: 120}}>
                                <InputLabel className="selectInput"
                                            id="demo-simple-select-required-label">Klient</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    label="Klienci *"
                                    value={clientName}
                                    disabled={!!data}
                                    required
                                    onChange={(event) => {
                                        if (event.target.value) {
                                            setClientName(event.target.value);
                                        }
                                    }}
                                >
                                    {clients.map((client) => (
                                        <MenuItem
                                            key={client?.id}
                                            value={!!client ? client.firstName + " " + client.lastName : ""}
                                        >
                                            {client ? client.firstName + " " + client.lastName : ""}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box className="carInputAddRepair" sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <FormControl className="carFormInput" required sx={{m: 1, minWidth: 120}}>
                                <InputLabel className="selectInput" id="demo-simple-select-required-label">Samochód
                                    klienta</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    label="Samochód klienta*"
                                    value={car}
                                    disabled={clientName === "" || !!data}
                                    required
                                    onChange={(event) => {
                                        if (event.target.value) {
                                            setCar(event.target.value);

                                        }
                                    }}
                                >
                                    {removeDuplicateCars(clients?.find((client) =>
                                        client?.firstName + " " + client?.lastName === clientName)?.cars)?.map((car) => (
                                        <MenuItem
                                            key={car?.id}
                                            value={!!car ? car.mark + " " + car.model : ""}
                                        >
                                            {car ? car.mark + " " + car.model : ""}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box className="registrationInputAddRepair" sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <FormControl className="registrationFormInput" required sx={{m: 1, minWidth: 120}}>
                                <InputLabel className="selectInput" id="demo-simple-select-required-label">Numer
                                    rejestracyjny</InputLabel>
                                <Select
                                    id="demo-simple-select-required"
                                    label="Numer rejestracyjny*"
                                    value={registration}
                                    disabled={car === "" || !!data}
                                    required
                                    onChange={(event) => {
                                        if (event.target.value) {
                                            setRegistration(event.target.value);
                                            setValue('registration', event.target.value);
                                        }
                                    }}
                                >
                                    {clients?.find((client) =>
                                        client?.firstName + " " + client?.lastName === clientName)?.cars
                                        .filter((clientsCar) => clientsCar.mark + " " + clientsCar.model === car)
                                        .map((car) => (
                                            <MenuItem
                                                key={car?.id}
                                                value={!!car ? car.registration : ""}
                                            >
                                                {car ? car.registration : ""}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box className="workerInputAddRepair" sx={{display: 'flex'}}>
                            <FormControl className="workerFormInput" required sx={{m: 1, minWidth: 120}}>
                                <InputLabel className="selectInput"
                                            id="demo-simple-select-required-label">Pracownik</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    label="Pracownik *"
                                    value={workerName}
                                    disabled={!!data}
                                    required
                                    onChange={(event) => {
                                        if (event.target.value) {
                                            setWorkerName(event.target.value);
                                        }
                                    }}
                                >
                                    {workers.map((worker) => (
                                        <MenuItem
                                            key={worker?.id}
                                            value={!!worker ? worker.firstName + " " + worker.lastName : ""}
                                        >
                                            {worker ? worker.firstName + " " + worker.lastName : ""}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className="dateInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateField']}>
                                    <DateField
                                        label="Data naprawy"
                                        value={date}
                                        onChange={(newValue) => setDate(newValue || null)}
                                        format="DD/MM/YYYY"
                                        required
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                        <Box className="repairStatusInput"
                             sx={{display: 'flex', alignItems: 'flex-end', color: '#595858'}}>
                            <FormControlLabel control={<Checkbox defaultChecked={data?.status}/>}
                                              label="W naprawie" {...register("status")} />
                        </Box>
                        <Box className="descriptionRepairInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <TextField multiline label="Opis" id="outlined-multiline-flexible" maxRows={4}
                                       variant="standard" InputProps={{disableUnderline: true}}
                                       {...register("title")} defaultValue={data?.title} error={!!errors.title}
                                       helperText={errors.title?.message}
                                       sx={{marginLeft: 1.5, resize: 'vertical', maxHeight: '200px'}}/>
                        </Box>
                        <Box className="addPartButton" sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <Button className="submitButton" onClick={() => setOpenAddParts(true)}>
                                Dodaj części</Button>
                        </Box>
                    </div>
                    <div className="addRepairSubmitButtons">
                        <Button className="cancelButton" onClick={() => {
                            onClose();
                            clearFields();
                        }}>Anuluj</Button>
                        <Button className="submitButton" onClick={() => trigger()} type="submit">Zatwierdź</Button>
                    </div>
                </form>
            </Modal>
            <AddPartsToRepair open={openAddParts} onClose={() => setOpenAddParts(false)}
                              setPartsToSave={setPartsToSave} partsToSave={partsToSave}/>
        </>
    );
}

export default AddEditRepairModal;
