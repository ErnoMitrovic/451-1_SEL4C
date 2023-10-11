import axios from "axios";
import { getToken } from "./token";
import CustomBodyCell from "../components/Admin/CustomBodyCell";

export const adminColumns = [
    {
        name: "name",
        label: "Nombre",
        options: {
            filterType: 'textField',
        }
    },
    {
        name: "email",
        label: "Correo",
        options: {
            filterType: 'textField',
        }
    },
    {
        name: "is_active",
        label: "Activo",
        options: {
            customBodyRender: value => <CustomBodyCell value={!value} />,
            sort: false,
            filter: false,
        }
    },
];

export const usersColumns = [
    {
        name: "full_name",
        label: "Nombre",
        options: {
            filterType: 'textField',
        }
    },
    {
        name: "email",
        label: "Correo",
        options: {
            filterType: 'textField',
        }
    },
    {
        name: "academic_degree",
        label: "Grado Académico",
    },
    {
        name: "institution",
        label: "Institución",
    },
    {
        name: "gender",
        label: "Género",
    },
    {
        name: "age",
        label: "Edad",
        options: {
            filterType: 'textField',
        }
    },
    {
        name: "country",
        label: "País",
    },
    {
        name: "is_active",
        label: "Activo",
        options: {
            customBodyRender: value => <CustomBodyCell value={!value} />,
            sort: false,
            filter: false,
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

// fetch raw charts data.
export async function getUsers() {
    const token = getToken();

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}sel4c/user/info/all/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw Error('Internal error');
    }
}

export async function getAdmins() {
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
