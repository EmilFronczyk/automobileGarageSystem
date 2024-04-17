import * as yup from 'yup';

const ClientValidation = () => {
    return yup.object().shape({
        firstName: yup
            .string()
            .min(3, "Za mało liter, użyj minimum 3"),
        lastName: yup
            .string()
            .min(3, "Za mało liter, użyj minimum 3"),
        phoneNumber: yup
            .string()
            .min(8, "Minimalna liczba cyfr to 8")
            .max(9, "Maksymalna liczba cyfr to 9")
            .required("Pole jest wymagane"),
    });
}

export default ClientValidation