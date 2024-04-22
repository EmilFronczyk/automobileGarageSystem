import {CarData, CarFormData} from "../carsPage/CarsPage";
import {Resolver, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import React, {useEffect, useState} from "react";
import CarValidation from "../validation/CarValidation";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel, FormHelperText,
    IconButton,
    InputLabel, MenuItem, Select,
    Switch,
    TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import {ClientData} from "../clientsPage/ClientsPage";
import "../carsPage/CarsPage.css";

type addEditCarModalProps = {
    open: boolean,
    onClose: () => void,
    onSubmit: (data: CarFormData) => void;
    title: string,
    data?: CarFormData | null
}
const AddEditCarModal = ({open, title, onClose, onSubmit, data}: addEditCarModalProps) => {

    const {
        register, handleSubmit,
        watch, reset, trigger, setValue, formState: {errors}
    }
        = useForm<CarFormData>({resolver: yupResolver(CarValidation()) as unknown as Resolver<CarFormData>});


    console.log(watch("status"))

    const [clients, setClients] = useState<ClientData[]>([]);
    const [clientName, setClientName] = useState<string>("");
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

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form className="addCarWindow" onSubmit={handleSubmit(onSubmit)}>
                <div className="modalTitleContainer">
                    <p className="addCarTextInfo">
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
                <div className="addCarDiv">
                    <Box className="markInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="mark" label="Marka"
                                   variant="standard"
                                   InputProps={{
                                       disableUnderline: true
                                   }} {...register("mark")}
                                   defaultValue={data?.mark}
                                   disabled={!!data}
                                   error={!!errors.mark}
                                   required={!!data}
                                   sx={{marginLeft: 1.5}}
                                   helperText={errors.mark?.message}/>
                    </Box>
                    <Box className="modelInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="model" label="Model"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("model")} defaultValue={data?.model}
                                   disabled={!!data}
                                   sx={{marginLeft: 1.5}}
                                   error={!!errors.model}
                                   required={!!data}
                                   helperText={errors.model?.message}/>
                    </Box>
                    <Box className="registrationInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="registration" label="Nr rejestracyjny"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("registration")} type="tel" defaultValue={data?.registration}
                                   error={!!errors.registration}
                                   helperText={errors.registration?.message}
                                   disabled={!!data}
                                   sx={{marginLeft: 1.5}}/>
                    </Box>
                    <Box className="nr_vinInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="nr_vin" label="Nr VIN"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("nr_vin")} type="tel" defaultValue={data?.nr_vin}
                                   error={!!errors.nr_vin}
                                   disabled={!!data}
                                   required={!!data}
                                   helperText={errors.nr_vin?.message}
                                   sx={{marginLeft: 1.5}}/>
                    </Box>
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
                    </Box> : <Box className="clientInputAdd" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <FormControl className="clientFormInput" required sx={{m: 1, minWidth: 120}}>
                            <InputLabel id="demo-simple-select-required-label">Klienci</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                label="Klienci *"
                                value={clientName}
                                onChange={(event) => setClientName(event.target.value)}
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
                    <Box className="statusInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <FormControlLabel control={<Checkbox defaultChecked={data?.status}/>}
                                          label="W naprawie" {...register("status")}/>
                    </Box>
                </div>
                <div className="addWorkerSubmitButtons">
                    <Button className="cancelButton" onClick={() => {
                        onClose();
                        reset();
                    }}>Anuluj</Button>
                    <Button className="submitButton" onClick={() => trigger()}
                            type="submit">Zatwierdź</Button>
                </div>
            </form>
        </Modal>
    );

}

export default AddEditCarModal