import Modal from "@mui/material/Modal";
import {bool} from "yup";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import "./CarDetails.css";
import BuildIcon from '@mui/icons-material/Build';
import {CarData} from "./CarsPage";

type CarDetailsProps = {
    open: boolean,
    onClose: () => void,
    title: string,
    car: CarData | null
}

export const checkStatus = (status: boolean): string => {
    if (status) {
        return "W naprawie";
    }
    return "Nie jest w naprawie";
}
const CarDetails = ({open, car, title, onClose}: CarDetailsProps) => {

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="carDetailsModal">
                <div className="modalTitleContainer">
                    <p className="addCarTextInfo">
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
                <div className="carDetailsDiv">
                    <div className="infoContainer">
                        <p className="title">
                            Marka
                        </p>
                        <p className="text">
                            {car?.mark}
                        </p>
                    </div>
                    <div className="infoContainer">
                        <p className="title">
                            Model
                        </p>
                        <p className="text">
                            {car?.model}
                        </p>
                    </div>
                    <div className="infoContainer">
                        <p className="title">
                            Nr rejestracyjny
                        </p>
                        <p className="text">
                            {car?.registration}
                        </p>
                    </div>
                    <div className="infoContainer">
                        <p className="title">
                            Nr vin
                        </p>
                        <p className="text">
                            {car?.nr_vin}
                        </p>
                    </div>
                    <div className="infoContainer">
                        <p className="title">
                            Status
                        </p>
                        <p className={car?.status ? "carGreen text" : "carRed text"}>
                            {checkStatus(car?.status || false)}
                        </p>
                    </div>
                </div>
                <div className="carsContainer">
                    <p className="title">
                        Historia napraw
                    </p>
                    {car?.repairs.map((repair) =>
                        <div className="carDetails">
                            <BuildIcon sx={{color: "#729eda", paddingTop: 2, marginRight: 2}}/>
                            <p>
                                {repair.date} {repair.title}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );

}

export default CarDetails