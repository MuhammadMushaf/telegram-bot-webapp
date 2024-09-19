"use client";

import { getCryptoPrices } from "@/services/tokenPrice";
import { createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const clientId =
  process.env.THIRDWEB_CLIENT_ID || "74a5a29a79fb1fb345c1b7825124355d";

export const RECIPIENT_ADDRESSES: any = {
  BNB: "0xf6f016e4797b8edc74c523da2dbcd3f872feefc9",
  ETH: "0xD5f5e043Af8809e6Cc3e125c3fe837B3Ba406101",
  // SOL: "38SAGZ1vynKzHCUZFzxJGzw3P9bLJMaHyvFPacLy8NRt",
  // BTC: "bc1q7zumqhml49dlllheet6ysqx0k3tlr3j89r73h3"
}

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const wallets = [
  createWallet("io.metamask"),
  createWallet("com.trustwallet.app"),
  createWallet("com.binance"),
];

const chainData: any = {
  BNB: {
    chainId: 56,
    rpcUrl: "https://bsc-dataseed.binance.org/",
    tokenContractAddress: "0xb8c77482e45f1f44de1745f52c74426c631bdd52",
    decimals: 18
  },
  ETH: {
    chainId: 1,
    rpcUrl: "https://mainnet.infura.io/v3/c214edaedfc64787840a06055b761b4c",
    tokenContractAddress: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    decimals: 18
  },
  // SOL: {
  //   rpcUrl: "https://api.mainnet-beta.solana.com",
  //   tokenContractAddress: "0xDE9B56f3Bb816f37b4F1b5081058465ed57826A3",
  //   decimals: 9
  // },
  // BTC: {
  //   rpcUrl: "https://mainnet.infura.io/v3/c214edaedfc64787840a06055b761b4c",
  //   tokenContractAddress: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
  //   decimals: 18
  // }
};

export const chains = {
  ETH: {
    id: 1,
    rpc: "https://mainnet.infura.io/v3/c214edaedfc64787840a06055b761b4c",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorers: [
      {
        name: "Etherscan",
        url: "https://etherscan.io",
      },
    ],
    testnet: false,
    faucets: [],
  },
  BNB: {
    id: 56,
    rpc: "https://bsc-dataseed.binance.org/",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    blockExplorers: [
      {
        name: "BscScan",
        url: "https://bscscan.com",
      },
    ],
    testnet: false,
    faucets: [],
  },
  SOL: {
    id: 101,
    rpc: "https://api.mainnet-beta.solana.com",
    nativeCurrency: {
      name: "Solana",
      symbol: "SOL",
      decimals: 9,
    },
    blockExplorers: [
      {
        name: "Solana Explorer",
        url: "https://explorer.solana.com",
      },
    ],
    testnet: false,
    faucets: [],
  },
  BTC: {
    id: 0, // Placeholder for Bitcoin
    rpc: "", // Bitcoin doesn't use typical RPCs like EVM chains
    nativeCurrency: {
      name: "Bitcoin",
      symbol: "BTC",
      decimals: 8,
    },
    blockExplorers: [
      {
        name: "Blockstream Explorer",
        url: "https://blockstream.info",
      },
    ],
    testnet: false,
    faucets: [],
  }
};


export async function initializeTokenContract(
  walletAddress: string | undefined,
  chainName: string
) {
  if (!walletAddress) return null;

  const chainInfo = chainData[chainName];
  if (!chainInfo) throw new Error("Unsupported chain");

  // const provider = new ethers.providers.JsonRpcProvider(chainInfo.rpcUrl);

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  // Check if the signer is valid
  const tokenContract = new ethers.Contract(
    chainInfo.tokenContractAddress,
    ["function transfer(address to, uint256 amount) returns (bool)"],
    signer
  );

  return tokenContract;
}

export async function transferTokens(
  amountIn: string,
  amountInUSD: number,
  walletAddress: string,
  token: any,
  chainName: string,
  setLoading: (loading: boolean) => void,
  setError: (error: string) => void
) {
  if (!token || !walletAddress) {
    return;
  }

  const chainInfo = chainData[chainName];
  if (!chainInfo) {
    setError("Unsupported chain");
    return;
  }

  setLoading(true);

  let amountInUnits

  try {
    if (amountIn === " USD") {
      const res: any = await getCryptoPrices();
      // const amountInUSD = 4;
      console.log(amountInUSD)
      amountInUnits = ethers.utils.parseUnits(
        (amountInUSD / res[chainName]).toFixed(chainInfo.decimals),
        chainInfo.decimals
      );
    } else {
      amountInUnits = amountInUSD
    }
    console.log(RECIPIENT_ADDRESSES[chainName])

    const tx = await token.transfer(RECIPIENT_ADDRESSES[chainName], amountInUnits);
    console.log("Transaction initiated:", tx);

    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
    return { tx };
  } catch (err: any) {
    setError(err.message);
    console.error("Error transferring tokens:", err);
    toast.error('Error transferring tokens')
  } finally {
    setLoading(false);
  }
}


export async function switchNetwork(newNetwork: string) {
  let chainId = "";

  // Define RPC URLs for your networks
  switch (newNetwork) {
    case "ETH":
      chainId = ethers.utils.hexValue(chainData.ETH.chainId);
      break;
    case "BNB":
      chainId = ethers.utils.hexValue(chainData.BNB.chainId);
      break;
    default:
      throw new Error("Unsupported network");
  }

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const clientId = "74a5a29a79fb1fb345c1b7825124355d";
    const sdk = new ThirdwebSDK(provider, { clientId });

    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();

    const balanceWei = await provider.getBalance(walletAddress);

    // Convert the balance to the chain's native currency (ETH, BNB, MATIC, etc.)
    const balance = ethers.utils.formatEther(balanceWei);

    console.log(`Switched to ${newNetwork} network. Wallet Address: ${walletAddress} with balance of ${balance}`);

    return { walletAddress, balance };
  } catch (error) {
    console.error("Error switching network:", error);
    throw error;
  }
}