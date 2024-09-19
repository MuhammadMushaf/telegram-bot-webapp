import { AccountType } from "@/utils/types";
import { atom } from "recoil";
import { ChainOptions } from "thirdweb/chains";

export const userObj = atom({
    key: 'User',
    default: {}
});

export const accessToken = atom({
    key: 'token',
    default: "",
});

export const walletInfo = atom<AccountType>({
    key: "walletInfo",
    default: {}
})

export const swapWalletInfo = atom<AccountType>({
    key: "swapWalletInfo",
    default: {}
})

export const cryptoPricesAtom = atom({
    key: "cryptoPrices",
    default: {}
})

export const selectedChainAtom = atom({
    key: "chainAtom",
    default: "BNB"
})