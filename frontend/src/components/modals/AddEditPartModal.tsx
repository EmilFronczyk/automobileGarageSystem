import {PartData} from "../warehousePage/WarehousePage";
import {Resolver, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import React, {useEffect, useState} from "react";
import Modal from "@mui/material/Modal";
import {Box, Button, IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PartValidation from "../validation/PartValidation";


type addEditPartModalProps = {
    open: boolean,
    onClose: () => void,
    onSubmit: (data: PartData) => void,
    title: string,
    data?: PartData | null
}
const AddEditPartModal = ({open, title, onClose, onSubmit, data}: addEditPartModalProps) => {

    const {
        register, handleSubmit,
        watch, reset, trigger, setValue, formState: {errors}
    }
        = useForm<PartData>({resolver: yupResolver(PartValidation()) as unknown as Resolver<PartData>});

    const [amount, setAmount] = useState(data?.amount || 0);


    useEffect(() => {
        reset();
    }, []);

    useEffect(() => {
        if (data?.amount) {
            setAmount(data.amount);
        }
    }, [data]);

    useEffect(() => {
        if (amount) {
            setValue("amount", amount);
        }
    }, [amount]);


    console.log(data);

    console.log(watch("amount"));
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form className="addPartWindow" onSubmit={handleSubmit(onSubmit)}>
                <div className="modalTitleContainer">
                    <p className="addPartTextInfo">
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
                <div className="addPartDiv">
                    <Box className="partNameInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="partName" label="Nazwa"
                                   variant="standard"
                                   InputProps={{
                                       disableUnderline: true
                                   }} {...register("partName")}
                                   defaultValue={data?.partName}
                                   error={!!errors.partName}
                                   sx={{marginLeft: 1.5}}
                                   helperText={errors.partName?.message}/>
                    </Box>
                    <Box className="catalogNumberInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="catalogNumber" label="Numer katalogowy"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("catalogNumber")} defaultValue={data?.catalogNumber}
                                   disabled={!!data}
                                   sx={{marginLeft: 1.5}}
                                   error={!!errors.catalogNumber}
                                   helperText={errors.catalogNumber?.message}/>
                    </Box>
                    <Box className="amountInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <Button className="minusButtonClass" onClick={() => setAmount(amount - 1)}
                        > - </Button>
                        <TextField id="amount" label="Ilość"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("amount")} defaultValue={Number(data?.amount)}
                                   value={amount} // Ustawienie wartości jako value
                                   onChange={(e) => setAmount(Number(e.target.value || 0))}
                                   sx={{marginLeft: 1.5}}
                                   error={!!errors.amount}
                                   helperText={errors.amount?.message}/>
                        <Button className="plusButtonClass" onClick={() => setAmount(amount + 1)}> + </Button>
                    </Box>
                    <Box className="priceInput" sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField id="price" label="Cena"
                                   variant="standard" InputProps={{
                            disableUnderline: true
                        }} {...register("price")} type="number" defaultValue={data?.price}
                                   error={!!errors.price}
                                   helperText={errors.price?.message}
                                   sx={{marginLeft: 1.5}}/>
                    </Box>
                </div>
                <div className="addPartSubmitButtons">
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


export default AddEditPartModal