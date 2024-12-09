import axios from "axios";
// import { useSession } from "@/contexts/AuthContext";
// const { session, isLoading } = useSession();

// Create an axios instance with base url
const axiosInstance = axios.create({
  baseURL: "https://hobbii-hooks.vercel.app/api",
});

// Dynamically add token if it exists, accepts optional token of type string or null
export const axiosAuth = (endpoint: string, token?: string | null) => {
    return axiosInstance.get(endpoint, {
        headers: {
            // If token was passed, set auth header, otherwise leave undefined
            Authorization: token ? `Bearer ${token}` : undefined
        }
    })
};

