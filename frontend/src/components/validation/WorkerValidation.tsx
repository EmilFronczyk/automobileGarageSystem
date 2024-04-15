import * as yup from 'yup';

const WorkerValidation = () => {
    return yup.object().shape({
        firstName: yup
            .string()
            .min(3, "Za mało liter, użyj minimum 3"),
        lastName: yup
            .string()
            .min(3, "Za mało liter, użyj minimum 3"),
        position: yup
            .string()
            .min(4, "Za mało liter, użyj minimum 4")
            .required("Pole jest wymagane"),
        payRate: yup
            .number()
            .typeError("Pole jest wymagane")
            .min(1, "Pracownik musi coś zarabiać")
            .required("Pole jest wymagane"),
        phoneNumber: yup
            .string()
            .min(8, "Minimalna liczba cyfr to 8")
            .max(9, "Maksymalna liczba cyfr to 9")
            .required("Pole jest wymagane"),
        hireDate: yup
            .string()
            .required("Pole jest wymagane"),
    });
}

export default WorkerValidation