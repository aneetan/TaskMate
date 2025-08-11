import axios, { type AxiosResponse } from "axios";
import { API_URL } from "../config/url";
import type { LoginProps, LoginResponse, RegisterProps } from "../types/auth";
import type { TaskProps } from "../types/Tasks";
import { decodeToken } from "../utils/jwtDecode";

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

export const addTask = async (formData: TaskProps): Promise<AxiosResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw Error("Token not valid");

  const {userId} = decodeToken(token) || {};
  if (userId === null || userId !== formData.userId) {
    throw Error("Invalid authorization");
  }
  
  const response = await axios.post(`${API_URL}/task/add-task`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}
