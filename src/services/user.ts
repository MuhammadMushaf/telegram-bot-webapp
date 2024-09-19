import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://telegram-app-be.vercel.app/api'

// const API_URL = 'http://localhost:5000/api/task';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle Get User

type userType = {
  username?: string,
  walletAddress?: string
}

export const getUser = async (data: userType) => {
  try {
    const response = await apiClient.post('/user/get', data);
    return response.data;
  } catch (error: any) {
    return error.response?.data
  }
};

// Handle Create User

export const createUser = async (data: userType) => {
  try {
    const response = await apiClient.post('/user/create', data);
    return response.data;
  } catch (error: any) {
    return error.response?.data
  }
};