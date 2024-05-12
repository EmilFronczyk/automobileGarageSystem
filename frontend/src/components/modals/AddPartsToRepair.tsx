import Modal from "@mui/material/Modal";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {PartData} from "../warehousePage/WarehousePage";
import {
    Box,
    Button,
    Checkbox,
    FormControl, IconButton,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent, TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


type AddPartsToRepairProps = {
    open: boolean,
    onClose: () => void,
    setPartsToSave: Dispatch<SetStateAction<PartData[]>>
    partsToSave?: PartData[];
}
const AddPartsToRepair = ({open, onClose, setPartsToSave, partsToSave}: AddPartsToRepairProps) => {
    const url = "http://localhost:8080/api/parts/all";
    const [data, setData] = useState<PartData[]>([]);

    const [partNames, setPartNames] = useState<string[]>([]);
    const [partNamesWithAmount, setPartNamesWithAmount] = useState<{ name: string, amount: number }[]>([]);

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
        console.log(value)
        setPartNames(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    useEffect(() => {
        if (partsToSave) {
            setPartNames(partsToSave.map((part) => part.partName));
            setPartNamesWithAmount(partsToSave.map((part) => ({name: part.partName, amount: part.amount})))
        }
    }, [partsToSave]);

    useEffect(() => {
        if (partNames.length > 0) {
            setPartNamesWithAmount((prevPartNamesWithAmount) => {
                // Sprawdzenie czy zmieniły się wartości name w tablicy newArray
                const changed = partNames.some((part, index) => part !== prevPartNamesWithAmount[index]?.name);

                // Sprawdzenie czy liczba nazw w tablicy partNames nie jest mniejsza niż liczba w tablicy partNamesWithAmount
                const removed = partNames.length < prevPartNamesWithAmount.length;

                if (changed || removed) {
                    // Jeśli zmieniły się wartości name lub liczba nazw została zmniejszona, aktualizuj tablicę partNamesWithAmount
                    const newPartNamesWithAmount = partNames.map((part) => ({name: part, amount: 1}));

                    if (removed) {
                        // Jeśli liczba nazw w tablicy partNames jest mniejsza, usuń odpowiednią nazwę z tablicy partNamesWithAmount
                        newPartNamesWithAmount.splice(partNames.length, 1);
                    }

                    return newPartNamesWithAmount;
                } else {
                    // Jeśli nie zmieniły się wartości name i liczba nazw nie została zmniejszona, zwróć poprzednią tablicę partNamesWithAmount
                    return prevPartNamesWithAmount;
                }
            });
        }
    }, [partNames]);

    const fetchInfo = async () => {
        const res = await fetch(url);
        const d = await res.json();
        return setData(d);
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const onSave = () => {

        // Utwórz zbiór nazw z drugiej tablicy obiektów dla szybszego sprawdzania
        const namesSet = new Set(partNamesWithAmount.map(obj => obj.name));

        // Filtruj pierwszą tablicę, zwracając tylko obiekty, których name jest zawarte w zbiorze nazw z drugiej tablicy
        let tab = data.filter(obj => namesSet.has(obj.partName));
        console.log(tab)
        let tab2 = tab.map(obj1 => {
            const matchingObject = partNamesWithAmount.find(obj2 => obj2.name === obj1.partName);
            if (matchingObject) {
                return {...obj1, amount: matchingObject.amount};
            } else {
                return obj1;
            }
        });
        setPartsToSave(tab2);

    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="addingPartsToOneRepair">
                <div className="modalTitleContainer">
                    <p className="addRepairTextInfo">
                        Wybierz części do dodania
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
                <FormControl sx={{m: 1, width: 300}} className="partsInRepairForm">
                    <InputLabel id="demo-multiple-checkbox-label" className="selectInput">Wybierz część</InputLabel>
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
                <div className="partsContainer">
                    {partNames.map((part, index) =>
                        <div className="selectedParts">
                            <p className="displaySelectedParts">
                                {part}
                            </p>
                            <Box className="amountOfSelectedParts" sx={{display: 'flex', alignItems: 'flex-end'}}>
                                <Button
                                    className="minusButtonClass"
                                    onClick={() => {
                                        let newArray = [...partNamesWithAmount];
                                        if (
                                            newArray[index].amount - 1 >=
                                            1
                                        ) {
                                            let amount = newArray[index].amount - 1;
                                            newArray[index].amount = amount >= 0 ? amount : 0;
                                            setPartNamesWithAmount(newArray);
                                        }
                                    }}
                                >
                                    -
                                </Button>
                                <TextField
                                    id="amount"
                                    variant="standard"
                                    InputProps={{disableUnderline: true}}
                                    value={partNamesWithAmount[index]?.amount || ""}
                                    onChange={(e) => {
                                        let amount = Number(e.target.value);
                                        let newArray = [...partNamesWithAmount];
                                        newArray[index].amount = isNaN(amount) ? 0 : amount;
                                        setPartNamesWithAmount(newArray);
                                    }}
                                    sx={{marginLeft: 1.5}}
                                />
                                <Button
                                    className="plusButtonClass"
                                    onClick={() => {
                                        let newArray = [...partNamesWithAmount];
                                        if (
                                            newArray[index].amount + 1 <=
                                            (data?.find((d) => d?.partName === newArray[index]?.name)?.amount || 0)
                                        ) {
                                            let amount = newArray[index].amount + 1;
                                            newArray[index].amount = amount;
                                            setPartNamesWithAmount(newArray);
                                        }
                                    }}
                                >
                                    +
                                </Button>
                            </Box>
                        </div>
                    )}
                </div>
                <div className="addPartsToRepairSubmitButtons">
                    <Button className="cancelButton" onClick={() => {
                        onClose();
                        //reset();
                    }}>Anuluj</Button>
                    <Button className="submitButton" onClick={() => {
                        onSave();
                        onClose();
                    }}
                            type="button">Zatwierdź</Button>
                </div>
            </div>
        </Modal>
    );
}


export default AddPartsToRepair