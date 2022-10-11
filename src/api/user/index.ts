import axios from "axios";
import { UserData } from "../../features/types";

//TODO: add to .env and change on production
const URL = process.env.NODE_ENV == "development" ? "http://localhost:5000" : "https://eyekontact-server.herokuapp.com";

// const URL = "http://localhost:5000"


export const registerUser = async (data: UserData) => {
    return await axios.post(`${URL}/register`, data);
}

export const subscribeUser = async (email: string) => {
    return await axios.post(`${URL}/subscribe/${email}`);
}

export const contact = async (userData) => {
    return await axios.post(`${URL}/contact`, { userData });
}

export const getSubs = async () => {
    return await axios.get(`${URL}/subscribers`);
}

export const loginUser = async (data: UserData) => {
    return await axios.post(`${URL}/login`, data);
}

export const addUser = async (data: UserData) => {
    return await axios.post(`${URL}/add-user`, data);
}

export const updateUser = async (data: UserData) => {
    return await axios.patch(`${URL}/update-user`, data);
}

export const deleteUser = async (data: UserData) => {
    return await axios.delete(`${URL}/delete-user?email=${data.email}`, data as any);
}

export const getUsers = async () => {
    return await axios.get(`${URL}/get-users`);
}