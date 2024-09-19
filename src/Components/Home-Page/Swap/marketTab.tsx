import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CoinDropdown from "./coinDropdown";
import { AccountType, swapType } from "@/utils/types";
import {
  client,
  initializeTokenContract,
  switchNetwork,
  transferTokens,
  wallets,
} from "@/utils/thirdweb";
import { cryptoPricesAtom, selectedChainAtom, swapWalletInfo, userObj, walletInfo } from "@/recoil/authAtom";
import { useRecoilState } from "recoil";
import { useConnectModal } from "thirdweb/react";
import { getUser } from "@/services/user";
import ConfirmationModal from "./confirmationModal";
import { toast } from "react-toastify";
import { createSwap } from "@/services/swap";

const MarketTab = () => {
  const [walletData, setWalletData] = useRecoilState<AccountType>(walletInfo);
  const [swapWalletData, setSwapWalletData] = useRecoilState<AccountType>(swapWalletInfo);

  const [selectedChain, setSelectedChain] = useRecoilState(selectedChainAtom)

  const [token, setToken] = useState<any>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useRecoilState<any>(userObj)
  const [openCC, setOpenCC] = useState<boolean>(false);
  const [openConfModal, setOpenConfModal] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<swapType>({
    shortName: 'BNB', img: "/bnb-logo.svg", width: 25, height: 25, name: "binancecoin"
  });
  const divRef = useRef<any>(null);
  const { connect, isConnecting } = useConnectModal();
  const [cryptoPrices, setCryptoPrices] = useRecoilState<any>(cryptoPricesAtom)

  const [convertedAmount, setConvertedAmount] = useState<any>(0)

  const [swapAmount, setSwapAmount] = useState<any>(0)

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

  const setStakeAmountToMax = () => {
    setSwapAmount(+userData.coinsBalance.toFixed(3))
  }

  const handleCoinDropdown = () => {
    setOpenCC(!openCC);
  };

  const handleCoinSelection = (a: swapType) => {
    setSelectedCoin(a);
    setOpenCC(false);
    fetchTokenContract();
  };

  const handleClickOutside = (event: any) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setOpenCC(false);
      setOpenConfModal(false)
    }
  };

  const fetchTokenContract = async () => {
    const tokenContract = await initializeTokenContract(
      walletData?.address,
      "BNB"
    );
    setToken(tokenContract);
  };



  useEffect(() => {
    const price = ((+(+((0.0044 * cryptoPrices.BNB).toFixed(4))).toFixed(4)) / cryptoPrices[selectedCoin.shortName]) * swapAmount
    setConvertedAmount(+price.toFixed(4))
  }, [swapAmount, selectedCoin])

  const handleTransfer = async () => {
    if (walletData?.address) {
      console.log(selectedChain, selectedCoin.shortName)
      const res = await transferTokens("USD", 4, walletData.address, token, "BNB", setLoading, setError);
      handleCreateSwap(res?.tx.hash)
    }
  };

  const handleCreateSwap = async (a: any) => {
    if (selectedChain !== selectedCoin.shortName) {
      const { walletAddress } = await switchNetwork(selectedCoin.shortName);
      setSwapWalletData(p => ({
        ...p, address: walletAddress, chain: selectedCoin.shortName
      }))
      setSelectedChain(selectedCoin.shortName)
    }
    if (walletData.address && selectedCoin.shortName !== "" && swapWalletData.address && selectedChain == selectedCoin.shortName) {
      console.log({
        coins: +swapAmount,
        to: selectedCoin.shortName,
        user_id: userData._id,
        username: userData.username,
        transaction_address: a,
        wallet_address: walletData.address,
        deposit_address: swapWalletData.address
      })
      const res = await createSwap({
        coins: +swapAmount,
        to: selectedCoin.shortName,
        user_id: userData._id,
        username: userData.username,
        transaction_address: a,
        wallet_address: walletData.address,
        deposit_address: swapWalletData.address
      })
      console.log(res)
      toast.success(res.message)
      setOpenConfModal(false)
      switchNetwork("BNB");
      setSelectedChain("BNB")
      const userRes = await getUser({ walletAddress: walletData.address })
      if (res.message === "Success") {
        setUserData(userRes.user)
      } else {
        console.log("Error updating user")
      }
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleOpenConfirmationModal = () => {
    if (swapAmount > +userData.coinsBalance?.toFixed(3)) {
      toast.error('Swap amount cannot exceed coin balance')
      setStakeAmountToMax()
    } else {
      setOpenConfModal(true)
    }
  }

  return (
    <div className="w-full flex flex-col gap-3 pt-6">
      <p className="m-0 text-xl font-semibold">Swap</p>
      <p className="m-0 text-[#535353] text-sm">Trade tokens in an instant</p>

      <div className="w-full flex flex-col gap-3 pt-6 border-t mt-6">
        <span className="w-full flex items-center justify-between gap-2 text-sm font-semibold">
          <p className="m-0 font-semibold flex items-center gap-2">
            <Image src={`${process.env.BASE_PATH}${"/main-coin.png"}`} width={25} height={25} alt="tap doge" />
            TAP DOGE
          </p>
          <p>Balance: {+userData.coinsBalance?.toFixed(3)}</p>
        </span>

        <span className="w-full border-[#5c55e0] border-2 p-1 bg-[#f8f8ff] h-20 flex items-center justify-between rounded-lg flex-col">
          <span className="flex items-center gap-2 justify-between w-full">
            <input
              type="text"
              onChange={(e) => setSwapAmount(e.target.value)}
              value={swapAmount}
              name="stake_amount"
              id="stake_amount"
              className="h-full w-full text-2xl font-semibold bg-inherit px-2 focus:outline-none"
            />
            <button className="text-sm h-full rounded-md bg-[#e0deff] font-bold text-[#5c55e0] px-3" onClick={setStakeAmountToMax}>Max</button>
          </span>
          <span className="text-sm w-full text-start pl-2">{(+(+((0.0044 * cryptoPrices.BNB).toFixed(4))).toFixed(4) * swapAmount).toFixed(4)} USD</span>
        </span>
      </div>

      <div className="w-full flex flex-col gap-3 pt-6 border-t mt-6">
        <span className="w-full flex items-center justify-start gap-2 text-sm font-semibold">
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
          {/* <p>Balance: 0</p> */}
        </span>

        <span className="w-full border-[#5c55e0] border-2 p-1 bg-[#f8f8ff] h-20 flex items-center justify-between rounded-lg flex-col">
          <p className="h-full w-full text-2xl font-semibold bg-inherit px-2 focus:outline-none text-black">{+convertedAmount}</p>
          <span className="text-sm w-full text-start pl-2">{(+(+((0.0044 * cryptoPrices.BNB).toFixed(4))).toFixed(4) * swapAmount).toFixed(4)} USD</span>
        </span>
      </div>

      <div className="w-full flex flex-col">
        <span className="w-full flex items-start gap-3 justify-between">
          <p className="m-0 text-xs">Price</p>
          <p className="flex items-center gap-2 text-sm">1 DOGE ~ {(+((0.0044 * cryptoPrices.BNB).toFixed(4))).toFixed(4)} $</p>
        </span>

        {/* <span className="w-full flex items-start gap-3 justify-between">
          <p className="m-0 text-xs">Slipping Tolerance</p>
          <p className="flex items-center gap-2 text-sm">0.5%</p>
        </span> */}
      </div>
      {
        walletData?.address ?
          <button
            className="w-full rounded-full bg-[#5c55e0] text-center py-3 text-sm font-semibold text-white" onClick={handleOpenConfirmationModal} >Swap</button>
          : <button className="w-full rounded-full bg-black text-center py-3 text-sm font-semibold text-white" onClick={handleConnect}> Connect Wallet </button>
      }

      <div className="w-full flex flex-col pt-4 gap-2">
        {/* <span className="w-full flex items-start gap-3 justify-between">
          <p className="m-0 text-xs">Minimum received</p>
          <p className="flex items-center gap-2 text-sm">0.012313 BNB</p>
        </span> */}

        {/* <span className="w-full flex items-start gap-3 justify-between">
          <p className="m-0 text-xs">Fee Saved</p>
          <p className="flex items-center gap-2 text-sm">
            0.00000123BNB (~$0.00032)
          </p>
        </span> */}

        {/* <span className="w-full flex items-start gap-3 justify-between">
          <p className="m-0 text-xs">Price Impact</p>
          <p className="flex items-center gap-2 text-sm">&lt;0.01%</p>
        </span> */}

        <span className="w-full flex items-start gap-3 justify-between">
          <p className="m-0 text-xs">Service Fee</p>
          <p className="flex items-center gap-2 text-sm">{(4 / cryptoPrices.BNB).toFixed(4)} BNB</p>
        </span>

        {/* <span className="w-full flex items-start gap-3 justify-between">
          <p className="m-0 text-xs">Route</p>
          <p className="flex items-center gap-2 text-sm">CAKE BNB</p>
        </span> */}
      </div>

      {
        openCC ? (
          <CoinDropdown
            divRef={divRef}
            handleCoinSelection={handleCoinSelection}
            handleCoinDropdown={handleCoinDropdown}
          />
        ) : null
      }

      {
        openConfModal ? <ConfirmationModal divRef={divRef} handleTransfer={handleTransfer} swapAmount={swapAmount} convertedAmount={convertedAmount} selectedCoin={selectedCoin} /> : null
      }
    </div >
  );
};

export default MarketTab;
