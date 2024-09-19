'use client'

import { AccountType } from "@/utils/types";
import { useEffect, useRef, useState } from "react";
import WalletPopup from "./WalletPopup";
import { accessToken, selectedChainAtom, userObj, walletInfo } from "@/recoil/authAtom";
import { useRecoilState } from "recoil";
import { toast } from 'react-toastify';
import { faBars, faCaretDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { wallets, chains, client } from "@/utils/thirdweb";
import { ConnectButton, useWalletBalance } from "thirdweb/react";
import Image from "next/image";
import { chain } from "@/app/client";
import { getUser } from "@/services/user";
import Withdraw from "./Withdraw";
import { useRouter } from "next/navigation";

const Header = () => {

    const [walletData, setWalletData] = useRecoilState<AccountType>(walletInfo)

    const [selectedChain, setSelectedChain] = useRecoilState(selectedChainAtom)

    const { data, isLoading, isError } = useWalletBalance({
        chain, address: walletData.address, client,
    });

    const [dropdown, setDropdown] = useState<boolean>(false)

    const [userData, setUserData] = useRecoilState<any>(userObj)

    const divRef = useRef<any>(null);

    const router = useRouter()

    const onWalletConnect = (a: any) => {
        handleSetAccountData('address', a.getAccount().address)
        // console.log(a.getAccount())
        handleSetAccountData('chain', a.getChain().name)
        getUserOnWalletConnect(a.getAccount().address)
        // console.log(a.getChain())
    }

    const formatBalance = (data: {
        decimals: number;
        displayValue: string;
        name: string;
        symbol: string;
        value: bigint;
    }) => {
        const { decimals, value, symbol } = data;
        const valueInUnits = Number(value) / Math.pow(10, decimals);
        return `${valueInUnits.toFixed(4)} ${symbol}`
    };

    const handleSetAccountData = (a: string, b: string) => {
        setWalletData(p => ({
            ...p, [a]: b,
        }))
    }

    const handleClickOutside = (event: any) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setDropdown(false)
        }
    };

    useEffect(() => {
        if (data && !walletData.balance) {
            const balance = formatBalance(data)
            handleSetAccountData('balance', balance)
        }
    }, [walletData, isLoading])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getUserOnWalletConnect = async (walletAddress: any) => {
        if (walletAddress !== "") {
            try {
                const res = await getUser({ walletAddress })
                if (res.message === "Success") {
                    setUserData(res.user)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleShowWalletData = () => {
        console.log(walletData)
    }

    return (
        <>
            <div className="w-full h-20 py-2 fixed flex items-center gap-4 justify-between bg-white px-6 z-10">

                <a className="text-black font-semibold no-underline text-lg cursor-pointer" onClick={() => router.push('/')}>SWAPMOON</a>

                <span className="flex items-center gap-3 justify-end max-[842px]:hidden">

                    {walletData?.address ?
                        <Withdraw />
                        : null
                    }

                    <a className="bg-[#5b55e0] text-white rounded-lg font-semibold py-[12px] w-40 no-underline text-center" href="#stake-hero-bg">Swap</a>

                    {/* <button className="bg-black text-white rounded-full font-semibold py-2 w-48" onClick={() => setDropdown(true)}>Connect Wallet</button> */}
                    {userData?.coinsBalance ?
                        <button className="bg-[#5b55e0] text-white rounded-lg py-[6px] w-40 no-underline text-center text-xs px-2 flex flex-col items-center gap-1">
                            <p className="m-0 font-semibold flex items-center gap-1">
                                {+userData.coinsBalance.toFixed(3)} <Image src='/coin.png' width={16} height={16} alt="tap-doge" />
                            </p>
                            <p className="m-0 flex items-center gap-1">
                                {+userData.coinsBalance.toFixed(3)} <Image src='/coin.png' width={16} height={16} alt="tap-doge" /> = {+(+userData.coinsBalance * 2.25).toFixed(3)} USD
                            </p>
                        </button> : null
                    }

                    <ConnectButton wallets={wallets} chain={chain} client={client} onConnect={(a) => onWalletConnect(a)} />


                </span>

                <div className="flex flex-col" id="mobile-nav">
                    <span id="mobile-nav-control-parent">
                        <label htmlFor="mobile-nav-control" className="text-black text-2xl cursor-pointer">
                            <FontAwesomeIcon icon={faBars} id="menu-open" />
                            <FontAwesomeIcon icon={faXmark} id="menu-close" />
                            <input type="checkbox" name="mobile-nav-control" id="mobile-nav-control" className="hidden"
                                onChange={() => { console.log('checked') }} />
                        </label>
                    </span>

                    <span className="absolute z-[1] left-0 top-20 w-full flex flex-col items-center gap-4 overflow-hidden bg-white"
                        id="mobile-nav-slider">

                        {walletData?.address ?
                            <Withdraw />
                            : null
                        }

                        <a className="bg-[#5b55e0] text-white rounded-lg font-semibold py-[12px] w-40 no-underline text-center" href="#stake-hero-bg" onClick={handleShowWalletData}>Swap</a>

                        {userData?.coinsBalance ?
                            <button className="bg-[#5b55e0] text-white rounded-lg py-[6px] w-40 no-underline text-center text-xs px-2 flex flex-col items-center gap-1">
                                <p className="m-0 font-semibold flex items-center gap-1">
                                    {userData.coinsBalance} <Image src='/coin.png' width={16} height={16} alt="tap-doge" />
                                </p>
                                <p className="m-0 flex items-center gap-1">
                                    {userData.coinsBalance} <Image src='/coin.png' width={16} height={16} alt="tap-doge" /> = {userData.coinsBalance * 2.25} USD
                                </p>
                            </button> : null
                        }

                        <ConnectButton wallets={wallets} chain={chain} client={client} onConnect={(a) => onWalletConnect(a)} />
                    </span>
                </div>

                {
                    dropdown ? <WalletPopup setDropdown={setDropdown} divRef={divRef} /> : null
                }

            </div>
            <div className="relative h-20 -z-10"></div>
        </>
    )
}


export default Header;