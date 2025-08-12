import axios, { type AxiosResponse } from "axios";
import type { LoginProps, LoginResponse, RegisterProps } from "../types/auth";
import { API_URL } from "../utils/vars";

export const registerUser = async (formData: RegisterProps): Promise<AxiosResponse> => {
  const response = await axios.post(`${API_URL}/api/auth/register`, formData);
  return response.data;
};

export const loginUser = async(formData: LoginProps): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/api/auth/login`, formData);
  return response.data;
}

export const refreshTokenAPI = async (userId: number): Promise<string> => {
  const response = await axios.post<{ accessToken: string }>(
    `${API_URL}/api/auth/refresh`,
    { userId }
  );
  return response.data.accessToken;
};

