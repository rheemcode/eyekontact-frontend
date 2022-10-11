import axios from "axios";
import { ProductData } from "../../features/types";

const URL = process.env.NODE_ENV == "development" ? "http://localhost:5000" : "https://eyekontact-server.herokuapp.com";

// const URL = "http://localhost:5000"

export const addProduct = async (data: ProductData) => {
    return await axios.post(`${URL}/add-product`, data);
}


export const getProducts = async () => {
    return await axios.get(`${URL}/get-products`);
}

export const updateProduct = async (data: { product: ProductData, productOld: ProductData }) => {
    return await axios.patch(`${URL}/update-product`, data);
}

export const deleteProduct = async (data: ProductData) => {
    console.log(data);
    return await axios.delete(`${URL}/delete-product/${data.productid}`);
}
