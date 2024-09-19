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

type createSwapType = {
    user_id: string,
    coins: number,
    wallet_address: string,
    username: string,
    transaction_address: string,
    to: string,
    deposit_address: string
};

export const createSwap = async (data: createSwapType) => {
    try {
        const response = await apiClient.post("/swap/create", data);
        return response.data;
    } catch (error: any) {
        toast.error(error.response?.data?.message);
        throw new Error(error.response?.data?.message || "Coins transfer failed");
    }
};
