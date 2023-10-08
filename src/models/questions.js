import axios from "axios";
import { getToken } from "./token";

export const columns = [
    {
        name: "id",
        label: "ID",
    },
    {
        name: "question",
        label: "Pregunta",
    },
    {
        name: "description",
        label: "Descripción",
    }
];

export async function getData(){
    const token = getToken();

    if (!token) {
        return false;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    };

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}sel4c/response/retrieve-forms/`, { headers: headers });
        return response.data;
    } catch (error) {
        console.error('Internal error:', error);
        return false;
    };
};

export function getData() {}
