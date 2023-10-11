import axios from "axios";
import { getToken } from "./token";

export const activitiesColumns = [
    {
        name: "user",
        label: "Usuario",
    },
    {
        name: "activity",
        label: "Actividad",
    },
    {
        name: "response_type",
        label: "Tipo de respuesta",
    },
    {
        name: "time_minutes",
        label: "Tiempo (minutos)",
    }
]

export async function getData() {
    const token = getToken();

    if (!token) {
        throw new Error('No token found');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    };

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}sel4c/response/activity/`, { headers: headers });
        return response.data;
    } catch (error) {
        throw new Error('Internal error');
    };
};
