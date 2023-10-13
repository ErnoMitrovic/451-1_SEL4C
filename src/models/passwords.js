import axios from "axios";
import { getToken } from "./token";

// Import base url
const backendURL = process.env.REACT_APP_API_BASE_URL+'/sel4c/user/'
const token = getToken();

// Change password of user
export async function changePassword(oldPassword, newPassword) {
    const userCredentials = {
        old_password: oldPassword,
        new_password: newPassword
    }
    let json = JSON.stringify(userCredentials)
    return axios.post(`${backendURL}password/`, json, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    })
}