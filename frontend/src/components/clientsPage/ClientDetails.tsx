import Modal from "@mui/material/Modal";
import {ClientData} from "./ClientsPage";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import "./ClientDetails.css";
import CarRepairIcon from '@mui/icons-material/CarRepair';

type ClientDetailsProps = {
    open: boolean,
    onClose: () => void,
    title: string,
    client: ClientData | null
}

export const checkStatus = (status: boolean): string => {
    if (status) {
        return "W naprawie";
    }
    return "Nie jest w naprawie";
}

const ClientDetails = ({open, client, title, onClose}: ClientDetailsProps) => {

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="clientDetailsModal">
                <div className="modalTitleContainer">
                    <p className="addClientTextInfo">
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
                <div className="clientDetailsDiv">
                    <div className="infoContainer">
                        <p className="title">
                            Imię
                        </p>
                        <p className="text">
                            {client?.firstName}
                        </p>
                    </div>
                    <div className="infoContainer">
                        <p className="title">
                            Nazwisko
                        </p>
                        <p className="text">
                            {client?.lastName}
                        </p>
                    </div>
                    <div className="infoContainer">
                        <p className="title">
                            Kontakt
                        </p>
                        <p className="text">
                            {client?.phoneNumber}
                        </p>
                    </div>
                </div>
                <div className="carsContainer">
                    <p className="title">
                        Samochody
                    </p>
                    {client?.cars.map((car) =>
                        <div className="carDetails">
                            <CarRepairIcon sx={{color: "#729eda", paddingTop: 2, marginRight: 2}}/>
                            <p>
                                {car.mark} {car.model} {car.registration}
                            </p>
                            <p className={car.status ? "carGreen" : "carRed"}>
                                {checkStatus(car.status)}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );

}

export default ClientDetails