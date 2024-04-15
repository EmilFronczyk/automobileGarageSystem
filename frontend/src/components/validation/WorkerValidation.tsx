import * as yup from 'yup';

const WorkerValidation = () => {
    return yup.object().shape({
        firstName: yup
            .string()
            .min(3, "Za mało liter, użyj minimum trzech"),
        lastName: yup
            .string()
            .min(3, "Za mało liter, użyj minimum trzech"),
        position: yup
            .string()
            .min(4, "Za mało liter, użyj minimum czterech")
            .required("Pole jest wymagane"),
        payRate: yup
            .number()
            .min(0, "Pracownik musi coś zarabiać")
            .required("Pole jest wymagane"),
        phoneNumber: yup
            .string()
            .min(8, "Minimalna liczba cyfr to osiem")
            .max(9, "Maksymalna liczba cyfr to dziewięć")
            .required("Pole jest wymagane"),
        hireDate: yup
            .string()
            .min(10, "Daty muszą mieć minimum dziesięć znaków")
            .required("Pole jest wymagane"),
    });
}

export default WorkerValidation