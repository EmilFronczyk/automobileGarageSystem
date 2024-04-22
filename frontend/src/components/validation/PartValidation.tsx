import * as yup from "yup";

const PartValidation = () => {
    return yup.object().shape({
        partName: yup
            .string()
            .min(3, "Za mało liter, użyj minimum 3"),
        catalogNumber: yup
            .string()
            .min(3, "Za mało liter, użyj minimum 3"),
        amount: yup
            .number()
            .typeError("Pole jest wymagane")
            .min(1, "Ilość nie może być mniejsza niż 1")
            .required("Pole jest wymagane"),
        price: yup
            .number()
            .typeError("Pole jest wymagane")
            .min(0.5, "Cena nie może być poniżej 0")
            .required("Pole jest wymagane"),
    });
}

export default PartValidation