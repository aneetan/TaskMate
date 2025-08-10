import axios, { type AxiosResponse } from "axios";
import { API_URL } from "../config/url";
import type { RegisterProps } from "../pages/Register";
import type { LoginProps } from "../pages/Login";


interface LoginResponse {
    accessToken: string;
    message: string;
}

export const registerUser = async (formData: RegisterProps): Promise<AxiosResponse> => {
  const response = await axios.post(`${API_URL}/auth/register`, formData);
  return response.data;
};

export const loginUser = async(formData: LoginProps): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/auth/login`, formData);
  return response.data;
}

export const refreshTokenAPI = async (userId: number): Promise<string> => {
  const response = await axios.post<{ accessToken: string }>(
    `${API_URL}/auth/refresh`,
    { userId }
  );
  return response.data.accessToken;
};