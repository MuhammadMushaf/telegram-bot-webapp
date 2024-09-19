import axios from 'axios';
import { toast } from 'react-toastify';

export const getCryptoPrices = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "bitcoin,ethereum,binancecoin,solana",  // Add crypto IDs here
          vs_currencies: "usd",
        },
      }
    );

    const prices = {
      BTC: response.data?.bitcoin?.usd,
      ETH: response.data?.ethereum?.usd,
      BNB: response.data?.binancecoin?.usd,
      SOL: response.data?.solana?.usd,
    };

    console.log(prices); // Log all prices
    return prices; // Return the prices object
  } catch (error: any) {
    toast.error(error.response?.data?.message);
    throw new Error(
      error.response?.data?.message || "Getting crypto prices failed"
    );
  }
};
