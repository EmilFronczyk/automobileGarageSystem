import {CarData, CarToClientData} from "../components/carsPage/CarsPage";

export function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name: string) {
    return {
        sx: {
            width: 32, height: 32,
            bgcolor: stringToColor(name),
            fontSize: 15
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export const removeDuplicateCars = (cars: CarToClientData[] | undefined): CarToClientData[] => {
    const uniqueCarsMap: Map<string, CarToClientData> = new Map();

    cars?.forEach((car) => {
        const key = `${car.mark}-${car.model}`;
        if (!uniqueCarsMap.has(key)) {
            uniqueCarsMap.set(key, car);
        }
    });

    return Array.from(uniqueCarsMap.values());
};