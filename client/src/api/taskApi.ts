import type { AxiosResponse } from "axios";
import type { TaskProps } from "../types/Tasks";
import { decodeToken } from "../utils/jwtDecode";
import axios from "axios";
import { API_URL } from "../utils/url";

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

export const viewTasks = async (userId: number): Promise<AxiosResponse> => {
  const response = await axios.get(`${API_URL}/task/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  return response.data;
}

export const editTask = async (formData: Partial<TaskProps>, taskId: number): Promise<AxiosResponse> => {
  const response = await axios.put(`${API_URL}/task/edit-task/${taskId}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return response.data;
}

export const deleteTask = async (taskId: number): Promise<AxiosResponse> => {
  const response = await axios.delete(`${API_URL}/task/delete-task/${taskId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return response.data.message;
}