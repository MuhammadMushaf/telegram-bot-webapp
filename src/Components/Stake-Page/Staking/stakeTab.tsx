import { selectedChainAtom, swapWalletInfo, userObj, walletInfo } from "@/recoil/authAtom"
import { createStake } from "@/services/stake"
import { getUser } from "@/services/user"
import { client, initializeTokenContract, switchNetwork, transferTokens, wallets } from "@/utils/thirdweb"
import { AccountType, stakeType, swapType } from "@/utils/types"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"
import { useConnectModal } from "thirdweb/react"
import CoinDropdown from "./coinDropdown"
import Image from "next/image"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StakeTab = () => {

    const [walletData, setWalletData] = useRecoilState<AccountType>(walletInfo)
    const [selectedChain, setSelectedChain] = useRecoilState(selectedChainAtom)
    const [swapWalletData, setSwapWalletData] = useRecoilState<AccountType>(swapWalletInfo);
    const [userData, setUserData] = useRecoilState<any>(userObj)
    const [loading, setLoading] = useState(false);
    const [stakeAmount, setStakeAmount] = useState<any>(0)
    const [token, setToken] = useState<any>();
    const [error, setError] = useState("");
    const [openCC, setOpenCC] = useState<boolean>(false);
    const [selectedCoin, setSelectedCoin] = useState<stakeType>({
        shortName: 'BNB', img: "/bnb-logo.svg", width: 25, height: 25, name: "Binance Coin"
    });
    const divRef = useRef<any>(null);

    const { connect, isConnecting } = useConnectModal();

    async function handleConnect() {
        const wallet = await connect({ client, wallets, size: "compact" });
        onWalletConnect(wallet);
    }

    const onWalletConnect = (a: any) => {
        handleSetAccountData('address', a.getAccount().address)
        handleSetAccountData('chain', a.getChain().name)
        getUserOnWalletConnect(a.getAccount().address)
        // console.log(a.getChain())
        // console.log(a.getAccount())
        // console.log(a.getAccount().address)
    }

    const handleSetAccountData = (a: string, b: string) => {
        setWalletData(p => ({
            ...p, [a]: b,
        }))
    }

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

    const fetchTokenContract = async () => {
        const tokenContract = await initializeTokenContract(
            walletData?.address,
            selectedCoin.shortName
        );
        setToken(tokenContract);
    };

    const handleTransfer = async () => {
        if (swapWalletData.balance) {
            if (stakeAmount > +swapWalletData?.balance) {
                setStakeAmount(+swapWalletData.balance)
                toast.error("Amount cannot exceed the coins balance")
            } else if (walletData?.address && selectedCoin.shortName !== "" && swapWalletData.address && selectedChain === selectedCoin.shortName) {
                const res = await transferTokens(selectedCoin.shortName, stakeAmount, swapWalletData.address, token, selectedCoin.shortName, setLoading, setError);
                handleCreateStake(res?.tx.hash)
            }
        }
    }

    const handleCreateStake = async (a: any) => {
        console.log({
            coins: stakeAmount,
            wallet_address: swapWalletData.address,
            username: userData.username,
            user_id: userData._id,
            transaction_address: a,
            tokenName: selectedCoin.shortName
        })
        if (walletData.address && selectedCoin.name !== "" && swapWalletData.address) {
            const res = await createStake({
                coins: stakeAmount,
                wallet_address: (selectedChain !== selectedCoin.shortName ? swapWalletData.address : walletData.address),
                username: userData.username,
                user_id: userData._id,
                transaction_address: a,
                tokenName: selectedCoin.shortName
            })
            console.log(res)
            toast.success(res.message)
            switchNetwork("BNB");
            setSelectedChain("BNB")
        }
    }

    const setStakeAmountToMax = () => {
        setStakeAmount((swapWalletData?.balance ? +swapWalletData?.balance : 0))
    }

    const handleCoinDropdown = () => {
        setOpenCC(!openCC);
    }

    const handleCoinSelection = async (a: stakeType) => {
        setSelectedCoin(a);
        setOpenCC(false);
        if (selectedChain !== selectedCoin.shortName) {
            const { walletAddress, balance } = await switchNetwork(selectedCoin.shortName);
            setSwapWalletData(p => ({
                ...p, address: walletAddress, chain: selectedCoin.shortName, balance
            }))
            setSelectedChain(selectedCoin.shortName)
        } else {
            setSwapWalletData(walletData)
        }
        fetchTokenContract();
    };

    const handleClickOutside = (event: any) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setOpenCC(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    return (
        <div className="w-full flex flex-col gap-3 pt-10">
            <span className="w-full flex items-center justify-between gap-2 text-sm font-semibold">
                {/* <p className="m-0">Available Amount</p>
                <p>- BNB</p> */}
                <span className="w-full flex items-center justify-between gap-2 text-sm font-semibold">
                    <span
                        className="m-0 font-semibold flex items-center gap-2"
                        onClick={handleCoinDropdown}
                    >
                        {selectedCoin?.img ? (
                            <Image
                                src={selectedCoin?.img}
                                width={selectedCoin?.width}
                                height={selectedCoin?.height}
                                alt={selectedCoin?.shortName}
                            />
                        ) : null}
                        {selectedCoin?.shortName}
                        <FontAwesomeIcon icon={faCaretDown} className="cursor-pointer" />
                    </span>
                    <p>Balance: {swapWalletData?.balance}</p>
                </span>
            </span>

            <span className="w-full border-[#5c55e0] border-2 p-1 bg-[#f8f8ff] h-12 flex items-center justify-between rounded-lg">
                <input type="text" value={stakeAmount} max={userData.coinsBalance} min="0" onChange={(e) => (setStakeAmount(e.target.value))} name="stake_amount" id="stake_amount" className="h-full w-full text-2xl font-semibold bg-inherit px-2 focus:outline-none" />
                <button className="text-sm h-full rounded-md bg-[#e0deff] font-bold text-[#5c55e0] px-3" onClick={setStakeAmountToMax}>Max</button>
            </span>

            <div className="w-full flex flex-col">
                <span className="w-full flex items-start gap-3 justify-between">
                    <p className="m-0">You will receive</p>
                    <p>{(stakeAmount * 0.0023).toFixed(4)}</p>
                </span>

            </div>
            {walletData?.address ? <button className="w-full rounded-full bg-[#5c55e0] text-center py-3 text-sm font-semibold text-white" onClick={handleTransfer}>Stake</button> :
                <button className="w-full rounded-full bg-black text-center py-3 text-sm font-semibold text-white" onClick={handleConnect}>Connect Wallet</button>}

            <span className="w-full flex items-start gap-3 justify-between text-sm">
                <p className="m-0">Reward</p>
                <p>0.0023 $ / $</p>
            </span>
            <span className="w-full flex items-start gap-3 justify-between text-sm">
                <p className="m-0">Reward Period</p>
                <p>Every 7 days</p>
            </span>


            {openCC ? (
                <CoinDropdown
                    divRef={divRef}
                    handleCoinSelection={handleCoinSelection}
                    handleCoinDropdown={handleCoinDropdown}
                />
            ) : null}

        </div>
    )
}

export default StakeTab