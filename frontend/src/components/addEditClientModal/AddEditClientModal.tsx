import {ClientFormData} from "../clientsPage/ClientsPage";
import {Resolver, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import React, {useEffect} from "react";
import ClientValidation from "../validation/ClientValidation";
import {Box, Button, IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

type addEditClientModalProps = {
    open: boolean,
    onClose: () => void,
    onSubmit: (data: ClientFormData) => void,
    title: string,
    data?: ClientFormData | null
}

const AddEditClientModal = ({open, title, onClose, onSubmit, data}: addEditClientModalProps) => {

    const {
        register, handleSubmit,
        watch, reset, trigger, formState: {errors}
    }
        = useForm<ClientFormData>({resolver: yupResolver(ClientValidation()) as unknown as Resolver<ClientFormData>});

    useEffect(() => {
        reset();
    }, []);

    return(
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form className="addClientWindow" onSubmit={handleSubmit(onSubmit)}>
                <div className="modalTitleContainer">
                    <p className="addClientTextInfo">
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
                <div className="addClientDiv">
                    <Box className="firstNameInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="firstName" label="Imie"
                                   variant="standard"
                                   InputProps={{
                                       disableUnderline: true
                                   }} {...register("firstName")}
                                   defaultValue={data?.firstName}
                                   disabled={!!data}
                                   error={!!errors.firstName}
                                   sx={{marginLeft: 1.5}}
                                   helperText={errors.firstName?.message}/>
                    </Box>
                    <Box className="lastNameInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="lastName" label="Nazwisko"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("lastName")} defaultValue={data?.lastName}
                                   disabled={!!data}
                                   sx={{marginLeft: 1.5}}
                                   error={!!errors.lastName}
                                   helperText={errors.lastName?.message}/>
                    </Box>
                    <Box className="contactInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="contact" label="Kontakt"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("phoneNumber")} type="tel" defaultValue={data?.phoneNumber}
                                   error={!!errors.phoneNumber}
                                   helperText={errors.phoneNumber?.message}
                                   sx={{marginLeft: 1.5}}/>
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

export default AddEditClientModal