import { partnerType, stakeType, stakingType, swapType, whyType } from './types'

export const carouselData: string[] = ['/slides1.png', '/slides2.png']

export const stakingData: stakingType[] = [{
    name: 'Ethereum',
    shortName: 'ETH',
    tvl: "",
    mcr: "110",
    rate: "0",
    status: "coming-soon",
    img: "/ethereum-logo.svg",
    img_border: "#4b5563",
    img_bg: "#e5e7eb",
    border: true
},
{
    name: 'BNB Chain',
    shortName: 'BNB',
    tvl: "113,059,126",
    mcr: "150",
    rate: "9.50",
    status: "stake",
    img: "/bnb-logo.svg",
    img_border: "none",
    img_bg: "none",
    border: false
},
{
    name: 'BNB Chain',
    shortName: 'BTCB',
    tvl: "113,059,126",
    mcr: "150",
    rate: "9.50",
    status: "stake",
    img: "/btc-logo.svg",
    img_border: "none",
    img_bg: "none",
    border: false
},
{
    name: 'BNB Chain',
    shortName: 'weETH',
    tvl: "113,059,126",
    mcr: "150",
    rate: "9.50",
    status: "stake",
    img: "/weeth-logo.svg",
    img_border: "none",
    img_bg: "none",
    border: false
}
]

export const whyData: whyType[] = [{
    heading: "Security",
    description: "When it comes to DeFi, safety and security are key priorities for SWAPMOON. All our products have undergone thorough audits by leading firms, and we independently manage our own validator node.",
    img: "/why-1.webp"
},
{
    heading: "Seamless UI",
    description: "SWAPMOON prioritizes an intuitive and easy-to-use UI to allow an enjoyable and more accessible experience by all users.",
    img: "/why-2.webp"
},
{
    heading: "Lucrative yield opportunities",
    description: "Mint lisUSD and slisBNB to unlock a variety of attractive, yet sustainable yield opportunities across BNB Chain.",
    img: "/why-3.webp"
},
{
    heading: "Low fees",
    description: "Borrow lisUSD affordably against a wide variety of collateral at little to no fees, depending on the collateral used.",
    img: "/why-4.webp"
}
]

export const investorsData: partnerType[] = [{
    img: "/partners/binance.svg",
    alt: "binance",
    width: 250,
    height: 120
}]

export const partnersData: partnerType[] = [{
    img: "/partners/lido.svg",
    alt: "lido",
    width: 200,
    height: 100
}, {
    img: "/partners/curve.webp",
    alt: "curve",
    width: 200,
    height: 100
}, {
    img: "/partners/uniswap.svg",
    alt: "uniswap",
    width: 200,
    height: 100
}, {
    img: "/partners/frax.svg",
    alt: "frax",
    width: 200,
    height: 100
}, {
    img: "/partners/pancakeswap.svg",
    alt: "pancakeswap",
    width: 200,
    height: 100
}, {
    img: "/partners/stakedao.svg",
    alt: "stakedao",
    width: 200,
    height: 100
}, {
    img: "/partners/pyth.svg",
    alt: "pyth",
    width: 200,
    height: 100
}
]

export const auditData: partnerType[] = [{
    img: "/partners/blocksec.svg",
    alt: "blocksec",
    width: 200,
    height: 100
}, {
    img: "/partners/peckshield.webp",
    alt: "peckshield",
    width: 200,
    height: 100
}, {
    img: "/partners/veridise.svg",
    alt: "veridise",
    width: 200,
    height: 100
}, {
    img: "/partners/certik.svg",
    alt: "certik",
    width: 200,
    height: 100
}]


export const swapData: swapType[] = [{
    //     shortName: 'BTC',
    //     img: "/btc-logo.svg",
    //     width: 25,
    //     height: 25,
    //     name: "bitcoin"
    // }, {
    shortName: 'ETH',
    img: "/ethereum-logo.svg",
    width: 20,
    height: 20,
    name: "ethereum"
},
{
    shortName: 'BNB',
    img: "/bnb-logo.svg",
    width: 25,
    height: 25,
    name: "binancecoin"
},
    // {
    //     shortName: 'SOL',
    //     img: "/solana-logo.svg",
    //     width: 25,
    //     height: 25,
    //     name: "solana"
    // }
]

export const stakeData: stakeType[] = [{
    //     shortName: 'BTC',
    //     img: "/btc-logo.svg",
    //     width: 25,
    //     height: 25,
    //     name: "Bitcoin"
    // }, {
    shortName: 'ETH',
    img: "/ethereum-logo.svg",
    width: 20,
    height: 20,
    name: "Ethereum"
},
{
    shortName: 'BNB',
    img: "/bnb-logo.svg",
    width: 25,
    height: 25,
    name: "Binance Coin"
},
    // {
    //     shortName: 'SOL',
    //     img: "/solana-logo.svg",
    //     width: 25,
    //     height: 25,
    //     name: "Solana"
    // }
]