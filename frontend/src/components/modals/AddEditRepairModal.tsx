import {RepairData} from "../repairsPage/RepairsPage";
import {Resolver, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import RepairValidation from "../validation/RepairValidation";

type addEditRepairModalProps = {
    open: boolean,
    onClose: () => void,
    onSubmit: (data: RepairData) => void;
    title: string,
    data?: RepairData | null
}
const AddEditRepairModal = ({open, title, onClose, onSubmit, data}: addEditRepairModalProps) => {

    const {
        register, handleSubmit,
        watch, reset, trigger, setValue, formState: {errors}
    }
        = useForm<RepairData>({resolver: yupResolver(RepairValidation()) as unknown as Resolver<RepairData>});

    return (
        <div></div>
    )
}

export default AddEditRepairModal