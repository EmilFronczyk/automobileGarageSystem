import Modal from "@mui/material/Modal";
import React, {useEffect, useState} from "react";
import {PartData} from "../warehousePage/WarehousePage";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent, TextField
} from "@mui/material";


type AddPartsToRepairProps = {
    open: boolean,
    onClose: () => void
}
const AddPartsToRepair = ({open, onClose}: AddPartsToRepairProps) => {
    const url = "http://localhost:8080/api/parts/all";
    const [data, setData] = useState<PartData[]>([]);

    const [partNames, setPartNames] = useState<string[]>([]);

    let partAmount: number[] = [];

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 'auto',
            },
        },
    };

    const handleChange = (event: SelectChangeEvent<typeof partNames>) => {
        const {
            target: {value},
        } = event;
        setPartNames(
            typeof value === 'string' ? value.split(',') : value,
        );
    }
        const fetchInfo = async () => {
            const res = await fetch(url);
            const d = await res.json();
            return setData(d);
        }

        console.log(data);

        useEffect(() => {
            fetchInfo();
        }, []);
        return (
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className= "addingPartsToOneRepair">
                    <p className="addRepairTextInfo">
                        Wybierz części do dodania
                    </p>
                    <FormControl sx={{m: 1, width: 300}}>
                        <InputLabel id="demo-multiple-checkbox-label">Wybierz część</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={partNames}
                            onChange={handleChange}
                            input={<OutlinedInput label="Wybierz część"/>}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {data.map((part) => (
                                <MenuItem key={part.id} value={part.partName}>
                                    <Checkbox checked={partNames.indexOf(part.partName) > -1}/>
                                    <ListItemText primary={part.partName}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {partNames.map((part, index) =>
                        <div>
                            <p className= "displaySelectedParts">
                                {part}
                            </p>
                            <Box className="amountOfSelectedParts" sx={{display: 'flex', alignItems: 'flex-end'}}>
                                <Button className="minusButtonClass" onClick={() => partAmount[index] = partAmount[index]-1}
                                > - </Button>
                                <TextField id="amount" label="Ilość"
                                           variant="standard" InputProps={{
                                    disableUnderline: true
                                }} defaultValue={1}
                                           value={partAmount[index] || 1} // Ustawienie wartości jako value
                                           onChange={(e) => partAmount[index] = Number(e.target.value)}
                                           sx={{marginLeft: 1.5}}/>
                                <Button className="plusButtonClass" onClick={() => partAmount[index] = partAmount[index]-1}> + </Button>
                            </Box>
                        </div>
                    )}
                </div>
            </Modal>
        );
}


export default AddPartsToRepair