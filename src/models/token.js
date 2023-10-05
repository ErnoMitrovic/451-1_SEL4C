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