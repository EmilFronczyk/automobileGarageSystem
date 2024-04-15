import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import {TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";

type customDialogProps = {
    open: boolean,
    onClose: () => void,
    onSubmit: () => void,
    title: string,
    text: string,
    className?: string
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const CustomDialog = ({open, onClose, className, text, onSubmit, title}: customDialogProps) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
            className={className}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description"> {text} </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button className="cancelButton" onClick={onClose}>Anuluj</Button>
                <Button className="submitButton"
                        onClick={onSubmit}>Zatwierdź</Button>
            </DialogActions>
        </Dialog>
    );

}

export default CustomDialog;