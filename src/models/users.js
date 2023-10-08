import axios from "axios";
import { getToken } from "./token";
import CustomBodyCell from "../components/Admin/CustomBodyCell";

export const columns = [
    {
        name: "name",
        label: "Nombre",
    },
    {
        name: "email",
        label: "Correo",
    },
    {
        name: "is_active",
        label: "Activo",
        options: {
            customBodyRender: value => <CustomBodyCell value={!value} />,
            sort: false
        }
    },
];

export async function getMe() {
    const token = getToken();

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}sel4c/user/me/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw new Error('Internal error');
    }
}

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
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}sel4c/user/admin/info/all/`, { headers: headers });
        return response.data;
    } catch (error) {
        throw new Error('Internal error');
    };

};

export async function deleteData(id) {
    const token = getToken();

    if (!token) {
        throw new Error('No token found');
    }

    const headers = {
        'Authorization': `Token ${token}`
    };

    try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}sel4c/user/deactivate/${id}/`, { headers: headers });
        return;
    } catch (error) {
        throw new Error('Internal error');
    };

};
