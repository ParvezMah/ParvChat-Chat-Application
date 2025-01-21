import axios from "axios";

// custom configuration is to streamline the use of Axios across your application
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api", // This ensures all requests made using axiosInstance automatically prepend the base URL,
    withCredentials: true, // This ensures that cookies, such as session tokens or CSRF tokens, are sent with every request.
})