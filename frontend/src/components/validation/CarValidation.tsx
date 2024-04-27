import * as yup from 'yup';

const CarValidation = () => {
    return yup.object().shape({
        mark: yup
            .string(),
        model: yup
            .string(),
        status: yup
            .boolean()
            .required("Pole jest wymagane"),
        registration: yup
            .string()
            .required("Pole jest wymagane"),
        nr_vin: yup
            .string(),
        client: yup
            .string()
    });
}

export default CarValidation