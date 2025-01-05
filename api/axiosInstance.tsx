import axios from "axios";
import { API_URL } from "@/config";

// Create an axios instance with base url
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Dynamically add token if it exists, accepts optional token of type string or null
export const axiosAuthGet = (endpoint: string, token?: string | null) => {
  try {
    const response = axiosInstance.get(endpoint, {
      headers: {
        // If token was passed, set auth header, otherwise leave undefined
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
  // return axiosInstance.get(endpoint, {
  //   headers: {
  //     // If token was passed, set auth header, otherwise leave undefined
  //     Authorization: token ? `Bearer ${token}` : undefined,
  //   },
  // });
};

export const axiosPost = async (
  endpoint: string,
  formData?: object,
  token?: string | null | undefined
) => {
  try {
    const response = await axiosInstance.post(endpoint, formData, {
      headers: {
        // If token was passed, set auth header, otherwise leave undefined
        Authorization: token ? `Bearer ${token}` : undefined,
        "content-type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return await Promise.reject(error.response?.data || error.message);
      // return await Promise.reject(error.response || error.message);
    } else {
      return await Promise.reject(error);
    }
  }
};

export const axiosPostFav = (
  endpoint: string,
  token?: string | null | undefined
) => {
  return axiosInstance.post(
    endpoint,
    {},
    {
      headers: {
        // If token was passed, set auth header, otherwise leave undefined
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    }
  );
};

export const axiosPut = async (
  endpoint: string,
  formData: object,
  token?: string | null
) => {
  try {
    const response = await axiosInstance.put(endpoint, formData, {
      headers: {
        // If token was passed, set auth header, otherwise leave undefined
        Authorization: token ? `Bearer ${token}` : undefined,
        "content-type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return await Promise.reject(error.response?.data || error.message);
      // return await Promise.reject(error.response || error.message);
    } else {
      return await Promise.reject(error);
    }
  }
};

export const axiosDelete = (
  endpoint: string,
  token?: string | null | undefined
) => {
  return axiosInstance.delete(endpoint, {
    headers: {
      // If token was passed, set auth header, otherwise leave undefined
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export const axiosRestore = (
  endpoint: string,
  token?: string | null | undefined
) => {
  return axiosInstance.patch(endpoint, {
    headers: {
      // If token was passed, set auth header, otherwise leave undefined
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};
