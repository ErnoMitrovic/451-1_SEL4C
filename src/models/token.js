import axios from "axios";

export const API_BASE_URL = "http://localhost:8000";

export async function createToken(email, password) {
    const userCredentials = {
        email: email,
        password: password
    }
    let json = JSON.stringify(userCredentials)
    return axios.post(`${API_BASE_URL}/sel4c/user/token/`, json, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}