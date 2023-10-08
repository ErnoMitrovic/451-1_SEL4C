import axios from "axios";
import Cookies from "universal-cookie";

export async function createToken(email, password) {
    const userCredentials = {
        email: email,
        password: password
    }
    let json = JSON.stringify(userCredentials)
    return axios.post(`${process.env.REACT_APP_API_BASE_URL}sel4c/user/token/`, json, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export function getToken() {
    const req = { headers: { cookie: '' } };
    const cookies = new Cookies(req.headers.cookie, { path: '/' });
    return cookies.get('token');
}

export function removeToken() {
    const req = { headers: { cookie: '' } };
    const cookies = new Cookies(req.headers.cookie, { path: '/' });
    cookies.remove('token');
}

export async function isAdmin() {
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

        const userData = response.data;

        if (userData.is_staff === true) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error('Internal error');
    }
}
