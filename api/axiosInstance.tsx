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
export const axiosPost = (endpoint: string, formData: object, token?: string | null) => {
    return axiosInstance.post(endpoint, formData, {
        headers: {
            // If token was passed, set auth header, otherwise leave undefined
            Authorization: token ? `Bearer ${token}` : undefined,
            'content-type': 'multipart/form-data'
        }
    })
};

export const axiosPut = (endpoint: string, formData: object, token?: string | null) => {
    return axiosInstance.put(endpoint, formData, {
        headers: {
            // If token was passed, set auth header, otherwise leave undefined
            Authorization: token ? `Bearer ${token}` : undefined,
            'content-type': 'multipart/form-data'
        }
    })
};

export const axiosDelete = (endpoint: string, token?: string | null | undefined) => {
    return axiosInstance.delete(endpoint, {
        headers: {
            // If token was passed, set auth header, otherwise leave undefined
            Authorization: token ? `Bearer ${token}` : undefined
        }
    })
};


