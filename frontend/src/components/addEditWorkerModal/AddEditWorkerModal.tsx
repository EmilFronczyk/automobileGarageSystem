import {Box, Button, FormHelperText, IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import React, {useEffect, useState} from "react";
import {Resolver, useForm} from "react-hook-form";
import {WorkerData} from "../workersPage/WorkersPage";
import {yupResolver} from "@hookform/resolvers/yup";
import WorkerValidation from "../validation/WorkerValidation";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type addEditWorkerModalProps = {
    open: boolean,
    onClose: () => void,
    onSubmit: (data: WorkerData) => void,
    title: string,
    data?: WorkerData | null
}

const AddEditWorkerModal = ({open, title, onClose, onSubmit, data}: addEditWorkerModalProps) => {

    const {
        register, handleSubmit,
        watch, reset, formState: {errors}
    }
        = useForm<WorkerData>({resolver: yupResolver(WorkerValidation()) as unknown as Resolver<WorkerData>});

    useEffect(() => {
        reset();
    }, []);

    console.log()

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form className="addWorkerWindow" onSubmit={handleSubmit(onSubmit)}>
                <div className="modalTitleContainer">
                    <p className="addWorkerTextInfo">
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
                <div className="addWorkerDiv">
                    <Box className="firstNameInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="firstName" label="Imie"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("firstName")}
                                   required
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
                        }} {...register("lastName")} required defaultValue={data?.lastName}
                                   disabled={!!data}
                                   sx={{marginLeft: 1.5}}/>
                    </Box>
                    <Box className="positionInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="position" label="Stanowisko"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("position")} required defaultValue={data?.position}
                                   sx={{marginLeft: 1.5}}/>
                    </Box>
                    <Box className="contactInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="contact" label="Kontakt"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("phoneNumber")} required type="tel" defaultValue={data?.phoneNumber}
                                   sx={{marginLeft: 1.5}}/>
                    </Box>
                    <Box className="payRateInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="payRate" label="Stawka"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("payRate")} required type="number" defaultValue={data?.payRate}
                                   sx={{marginLeft: 1.5}}/>
                    </Box>
                    <Box className="hireDateInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="hireDate" label="Data zatrudnienia"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("hireDate")} required defaultValue={data?.hireDate}
                                   sx={{marginLeft: 1.5}}/>
                    </Box>
                </div>
                <div className="addWorkerSubmitButtons">
                    <Button className="cancelButton" onClick={() => {
                        onClose();
                        reset();
                    }}>Anuluj</Button>
                    <Button className="submitButton"
                            type="submit">Zatwierdź</Button>
                </div>
            </form>
        </Modal>
    );

}
export default AddEditWorkerModal;