import axios from "axios";
import { OrderData } from "../../features/types";

const URL = process.env.NODE_ENV == "development" ? "http://localhost:5000" : "https://eyekontact-server.herokuapp.com";

// const URL = "http://localhost:5000"

export const addOrder = async (data: OrderData) => {
    return await axios.post(`${URL}/add-order`, data);
}

export const getOrders = async () => {
    return await axios.get(`${URL}/get-orders`);
}

export const updateOrder = async (data: OrderData) => {
    return await axios.patch(`${URL}/update-order`, data);
}

export const deleteOrder = async (data: OrderData) => {
    return await axios.delete(`${URL}/delete-order?orderid=${data.orderid}`);
}
