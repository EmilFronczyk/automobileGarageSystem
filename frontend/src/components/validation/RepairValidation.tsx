import * as yup from "yup";

const RepairValidation = () => {
    return yup.object().shape({
        client: yup
            .string()
            .min(3, "Za mało liter, użyj minimum 3"),
        vehicle: yup
            .string()
            .min(3, "Za mało liter, użyj minimum 3"),
        registration: yup
            .string()
            .required("Pole jest wymagane"),
        status: yup
            .boolean()
            .required("Pole jest wymagane"),
        title: yup
            .string()
            .required("Pole jest wymagane"),
        date: yup
            .string()
            .required("Pole jest wymagane"),
    });
}

export default RepairValidation