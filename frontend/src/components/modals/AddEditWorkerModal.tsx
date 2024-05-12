import {Box, Button, FormHelperText, IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import React, {useEffect, useMemo, useState} from "react";
import {Resolver, useForm} from "react-hook-form";
import {WorkerData} from "../workersPage/WorkersPage";
import {yupResolver} from "@hookform/resolvers/yup";
import WorkerValidation from "../validation/WorkerValidation";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DateField, LocalizationProvider} from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";

type addEditWorkerModalProps = {
    open: boolean,
    onClose: () => void,
    onSubmit: (data: WorkerData) => void,
    title: string,
    data?: WorkerData | null
}

const AddEditWorkerModal = ({open, title, onClose, onSubmit, data}: addEditWorkerModalProps) => {

    const {
        register, handleSubmit, setValue,
        watch, reset, trigger, formState: {errors}
    }
        = useForm<WorkerData>({resolver: yupResolver(WorkerValidation()) as unknown as Resolver<WorkerData>});

    useEffect(() => {
        reset();
    }, []);

    const [date, setDate] = useState<Dayjs | null>(null);

    useEffect(() => {
        setValue('hireDate', date?.format("DD/MM/YYYY") || '');
    }, [date]);


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
                    <Box className="positionInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="position" label="Stanowisko"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("position")} defaultValue={data?.position} error={!!errors.position}
                                   helperText={errors.position?.message}
                                   sx={{marginLeft: 1.5}}/>
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
                    <Box className="payRateInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="payRate" label="Stawka"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("payRate")} type="number" defaultValue={data?.payRate || 0}
                                   error={!!errors.payRate}
                                   helperText={errors.payRate?.message}
                                   sx={{marginLeft: 1.5}}/>
                    </Box>
                    <Box className="hireDateInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateField']}>
                                <DateField
                                    label="Data zatrudnienia"
                                    value={date}
                                    onChange={(newValue) => setDate(newValue || null)}
                                    format="DD/MM/YYYY"
                                    required
                                />
                            </DemoContainer>
                        </LocalizationProvider>
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
export default AddEditWorkerModal;