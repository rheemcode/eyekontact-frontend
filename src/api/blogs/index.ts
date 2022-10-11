import axios from "axios";
import { BlogData } from "../../features/types";
import { APPURL } from "../../Utils";


//TODO: add .env
const URL = process.env.NODE_ENV == "development" ? "http://localhost:5000" : "https://eyekontact-server.herokuapp.com";
// const URL = "http://localhost:5000"


export const addBlog = async (data: BlogData) => {
    return await axios.post(`${APPURL}/add-blog`, data);
}

export const getBlogs = async () => {
    return await axios.get(`${APPURL}/get-blogs`);
}

export const updateBlog = async (data: BlogData) => {
    return await axios.patch(`${APPURL}/update-blog`, data);
}

export const deleteBlog = async (data: BlogData) => {
    return await axios.delete(`${APPURL}/delete-blog?blogid=${data.blogid}`);
}
