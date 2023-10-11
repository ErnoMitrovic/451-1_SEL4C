import axios from "axios";
import { getToken } from "./token";

export const formResponseColumns = [
    {
        name: "score",
        label: "Puntaje",
    },
    {
        name: "time_minutes",
        label: "Tiempo (min)",
    },
    {
        name: "user",
        label: "Usuario",
    },
    {
        name: "question",
        label: "Pregunta",
    },
];

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
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}sel4c/response/retrieve-forms/`, { headers: headers });
        return response.data;
    } catch (error) {
        throw new Error('Internal error');
    };
};
