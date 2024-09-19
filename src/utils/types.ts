export type stakingType = {
    name: string,
    shortName: string,
    tvl: string,
    mcr: string,
    rate: string,
    status: string,
    img: string,
    img_border: string,
    img_bg: string,
    border: boolean
}

export type whyType = {
    heading: string,
    description: string,
    img: string
}

export type partnerType = {
    img: string,
    alt: string,
    width: number,
    height: number
}

export type swapType = {
    shortName: string,
    img: string,
    width: number,
    height: number
    name: string
}

export type stakeType = {
    shortName: string,
    img: string,
    width: number,
    height: number,
    name: string
}

// Wallet

export interface AccountType {
    address?: string;
    balance?: string;
    chain?: string;
    // network?: string;
}