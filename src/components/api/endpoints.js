import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000";

export const get_posts = async (page) => {
    try {
        const response = await axios.get(`${BASE_URL}${page}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}

export const get_post = async (id) => {
        try {
        const response = await axios.get(`${BASE_URL}/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}