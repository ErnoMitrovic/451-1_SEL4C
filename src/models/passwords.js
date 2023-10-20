import axios from "axios";
import { getToken } from "./token";

// Import base url
const backendURL = process.env.REACT_APP_API_BASE_URL+'sel4c/user/'

// Change password of user
export async function changePassword(newPassword) {
    const token = getToken();
    console.log("TOKEN FOR CHANGE PASSWORD: " + token);
    const userCredentials = {
        password: newPassword
    }
    let json = JSON.stringify(userCredentials)
    return axios.patch(`${backendURL}me/`, json, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    })
}