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
    return axios.patch(`${backendURL}change-password/`, json, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    })
}

const BASE_URL_FORGOT_PASSWORD = process.env.REACT_APP_API_BASE_URL+'sel4c/user/reset-password/'

// Reset password
export async function resetPassword(email){
    const userCredentials = {
        email: email
    }
    let json = JSON.stringify(userCredentials)
    return axios.post(BASE_URL_FORGOT_PASSWORD, json, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

// Check if it is a valid token
export async function checkToken(token){
    const userCredentials = {
        token: token
    }
    let json = JSON.stringify(userCredentials)
    return axios.post(`${BASE_URL_FORGOT_PASSWORD}validate_token/`, json, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

// Reset password
export async function resetPasswordConfirm(token, password){
    const userCredentials = {
        token: token,
        password: password
    }
    let json = JSON.stringify(userCredentials)
    return axios.post(`${BASE_URL_FORGOT_PASSWORD}confirm/`, json, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}