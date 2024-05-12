import {RepairData} from "./RepairsPage";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import Modal from "@mui/material/Modal";
import React from "react";
import {checkStatus} from "../carsPage/CarsDetails";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import './RepairDetail.css';

type RepairDetailProps = {
    open: boolean,
    onClose: () => void,
    title: string,
    repair: RepairData | null
}
const RepairDetail = ({open, repair, title, onClose}: RepairDetailProps) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="repairDetailsModal">
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
                    <div className="repairDetailsDiv">
                        <div className="infoContainer">
                            <p className="title">
                                Klient
                            </p>
                            <p className="text">
                                {repair?.client}
                            </p>
                        </div>
                        <div className="infoContainer">
                            <p className="title">
                                Marka i model
                            </p>
                            <p className="text">
                                {repair?.vehicle}
                            </p>
                        </div>
                        <div className="infoContainer">
                            <p className="title">
                                Numer rejestracyjny
                            </p>
                            <p className="text">
                                {repair?.registration}
                            </p>
                        </div>
                        <div className="infoContainer">
                            <p className="title">
                                Pracownik
                            </p>
                            <p className="text">
                                {repair?.worker}
                            </p>
                        </div>
                        <div className="infoContainer">
                            <p className="title">
                                Dochód
                            </p>
                            <p className="text">
                                {repair?.income.toFixed(2)} zł
                            </p>
                        </div>
                        <div className="infoContainer">
                            <p className="title">
                                Wydatki
                            </p>
                            <p className="text">
                                {repair?.spending.toFixed(2)} zł
                            </p>
                        </div>
                        <div className="infoContainer">
                            <p className="title">
                                Koszt naprawy
                            </p>
                            <p className="text">
                                {repair?.costOfRepair.toFixed(2)} zł
                            </p>
                        </div>
                        <div className="infoContainer">
                            <p className="title">
                                Status naprawy
                            </p>
                            <div className="statusContainer">
                                <p className={repair?.status ? "repairGreen" : "repairRed"}>
                                    {checkStatus(repair?.status || false)}
                                </p>
                                {repair?.status ? <CheckCircleIcon sx={{color: repair?.status ? "green" : "darkred"}}
                                                                   className="statusIcon"/> :
                                    <CancelIcon sx={{color: repair?.status ? "green" : "darkred"}}
                                                className="statusIcon"/>}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default RepairDetail