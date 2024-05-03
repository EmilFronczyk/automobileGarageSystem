import {RepairData} from "../repairsPage/RepairsPage";
import {Resolver, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import RepairValidation from "../validation/RepairValidation";
import Modal from "@mui/material/Modal";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';

import {
    Box,
    Button, Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select, TextareaAutosize,
    TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, {useEffect, useState} from "react";
import {ClientData} from "../clientsPage/ClientsPage";
import {removeDuplicateCars} from "../../reusableFunctions/ReusableFunctions";
import AddPartsToRepair from "./AddPartsToRepair";

type addEditRepairModalProps = {
    open: boolean,
    onClose: () => void,
    onSubmit: (data: RepairData) => void;
    title: string,
    data?: RepairData | null
}
const AddEditRepairModal = ({open, title, onClose, onSubmit, data}: addEditRepairModalProps) => {

    const {
        register, handleSubmit,
        watch, reset, trigger, setValue, formState: {errors}
    }
        = useForm<RepairData>({resolver: yupResolver(RepairValidation()) as unknown as Resolver<RepairData>});

    const [clients, setClients] = useState<ClientData[]>([]);
    const [clientName, setClientName] = useState<string>("");
    const [car, setCar] = useState<string>("");
    const [registration, setRegistration] = useState<string>("");
    const [openAddParts, setOpenAddParts] = useState(false);
    const url = "http://localhost:8080/api/clients/all";

    const fetchInfo = async () => {
        const res = await fetch(url);
        const d = await res.json();
        return setClients(d);
    }

    useEffect(() => {
        fetchInfo();
        reset();
    }, []);

    useEffect(() => {
        if (clientName !== '') {
            setValue("client", clientName);

        }
    }, [clientName]);



    console.log(clients)

    return(
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form className="addRepairWindow" onSubmit={handleSubmit(onSubmit)}>
                    <div className="modalTitleContainer">
                        <p className="addRepairTextInfo">
                            {title}
                        </p>
                        <IconButton
                            color="inherit"
                            aria-label="Edit"
                            onClick={() => {
                                onClose();
                                reset();
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
                        {data ? <Box className="clientInputEdit" sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <TextField id="client" label="Klient"
                                       variant="standard" InputProps={{
                                disableUnderline: true
                            }} {...register("client")} type="tel" defaultValue={data?.client}
                                       error={!!errors.client}
                                       helperText={errors.client?.message}
                                       disabled={!!data}
                                       required={!!data}
                                       sx={{marginLeft: 1.5}}/>
                        </Box> : <Box className="clientInputAdd"
                                      sx={{display: 'flex'}}>
                            <FormControl className="clientFormInput" required sx={{m: 1, minWidth: 120}}>
                                <InputLabel className="selectInput"
                                            id="demo-simple-select-required-label">Klienci</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    label="Klienci *"
                                    value={clientName}
                                    onChange={(event) => {
                                        setClientName(event.target.value);
                                        setCar("");
                                    }}
                                > {clients.map((client) => (
                                    <MenuItem
                                        key={client?.id}
                                        value={!!client ? client.firstName + " " + client.lastName : ""}
                                    >
                                        {client ? client.firstName + " " + client.lastName : ""}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Box>}

                        {data ? <Box className="carInputEdit" sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <TextField id="car" label="Samochody klienta"
                                       variant="standard" InputProps={{
                                disableUnderline: true
                            }} {...register("vehicle")} type="tel" defaultValue={data?.vehicle}
                                       error={!!errors.vehicle}
                                       helperText={errors.vehicle?.message}
                                       disabled={!!data}
                                       required={!!data}
                                       sx={{marginLeft: 1.5}}/>
                        </Box> : <Box className="carInputAdd"
                                      sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <FormControl className="carFormInput" required sx={{m: 1, minWidth: 120}}>
                                <InputLabel className="selectInput"
                                            id="demo-simple-select-required-label">Samochody klienta</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    label="Samochód klienta*"
                                    value = {car}
                                    disabled={
                                        clientName === ""
                                    }
                                    onChange={(event) => setCar(event.target.value)}
                                > {removeDuplicateCars(clients?.find((client) =>
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
                        </Box>}

                        {data ? <Box className="registrationInputEdit" sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <TextField id="registration" label="Numery rejestracyjne"
                                       variant="standard" InputProps={{
                                disableUnderline: true
                            }} {...register("registration")} defaultValue={data?.registration}
                                       error={!!errors.registration}
                                       helperText={errors.registration?.message}
                                       disabled={!!data}
                                       required={!!data}
                                       sx={{marginLeft: 1.5}}/>
                        </Box> : <Box className="registrationInputAdd"
                                      sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <FormControl className="registrationFormInput" required sx={{m: 1, minWidth: 120}}>
                                <InputLabel className="selectInput"
                                            id="demo-simple-select-required-label">Numery rejestracyjne</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    label="Numer rejestracyjny*"
                                    value = {registration}
                                    disabled={
                                        car === ""
                                    }
                                    onChange={(event) => setRegistration(event.target.value)}
                                > {clients?.find((client) =>
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
                        </Box>}

                        <Box className="repairStatusInput" sx={{display: 'flex', alignItems: 'flex-end', color: '#595858'}}>
                            <FormControlLabel control={<Checkbox defaultChecked={data?.status}/>}
                                              label="W naprawie" {...register("status")}/>
                        </Box>

                        <Box className="descriptionInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <TextareaAutosize className="title" id="title" placeholder="Opis" {...register("title")}  defaultValue={data?.title}/>
                        </Box>

                        <Box className="addPartButton" sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <Button className="submitButton" onClick={() => setOpenAddParts(true)}>
                                Dodaj części</Button>
                        </Box>
                    </div>
                    <div className="addWorkerSubmitButtons">
                        <Button className="cancelButton" onClick={() => {
                            onClose();
                            setClientName("");
                            reset();
                        }}>Anuluj</Button>
                        <Button className="submitButton" onClick={() => trigger()}
                                type="submit">Zatwierdź</Button>
                    </div>
                </form>
            </Modal>
            <AddPartsToRepair open={openAddParts} onClose={() => setOpenAddParts(false)} />
        </>
    );
}

export default AddEditRepairModal