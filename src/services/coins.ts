import axios from "axios";
import { toast } from "react-toastify";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const API_URL =
  process.env.BACKEND_URL || "https://telegram-app-be.vercel.app/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Handles Coins Transfer

type coinTransferProps = {
  code: string;
  user: string;
  walletAddress: string
};

export const transferCoins = async (data: coinTransferProps) => {
  try {
    const response = await apiClient.post("/coin/transfer", data);
    return response.data; // or response if you need the full response object
  } catch (error: any) {
    toast.error(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Coins transfer failed");
  }
};
