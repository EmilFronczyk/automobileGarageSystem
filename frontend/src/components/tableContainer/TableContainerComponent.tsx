import React, {JSX, ReactNode} from "react";
import {
    Avatar,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type tableContainerComponentProps = {
    headers: string[],
    children: ReactNode,
    className?: string
}
const TableContainerComponent = ({headers, children, className}: tableContainerComponentProps) => {
    return (
        <TableContainer className={className} component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) =>
                            <TableCell sx={{color: '#40A2D8', fontWeight: 600}} align={index === 0 ? "left" : "right"}>
                                {header}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {children}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableContainerComponent;