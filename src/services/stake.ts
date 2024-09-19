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

// Handles Create Stake

type createStakeType = {
    user_id: string,
    coins: string,
    wallet_address: string,
    username: string,
    transaction_address: string
    tokenName: string,
};

export const createStake = async (data: createStakeType) => {
    try {
        const response = await apiClient.post("/stake/create", data);
        return response.data;
    } catch (error: any) {
        toast.error(error.response?.data?.message);
        throw new Error(error.response?.data?.message || "Coins transfer failed");
    }
};
