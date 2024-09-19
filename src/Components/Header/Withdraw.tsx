import { userObj, walletInfo } from "@/recoil/authAtom";
import { transferCoins } from "@/services/coins";
import { AccountType } from "@/utils/types";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";


const Withdraw = () => {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userData, setUserData] = useRecoilState<any>(userObj);
  const [walletData, setWalletData] = useRecoilState<AccountType>(walletInfo)
  const divRef = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsOpen(false)
      setError(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTransfer = () => {
    const withdrawCode = code.slice(-10);
    const username = code.slice(0, -11);

    console.log(username)
    console.log(withdrawCode)
    console.log(withdrawCode.length)

    if (withdrawCode.length != 10) {
      setError(true);
      console.log("Error");
    } else {
      handleTransferCoins({ code: withdrawCode, username, walletAddress: walletData.address });
      console.log("API Called");
      setCode("");
    }
  };

  const handleTransferCoins = async (data: any) => {
    let response = await transferCoins(data);
    if (response.message === "Success") {
      toast.success("Coins Tranferred !");
      setUserData(response.user);
      setIsOpen(false)
      setError(false)
    } else {
      toast.error("Coins Transfer Error !");
    }
  };

  return (
    <div className="w-fit flex items-center justify-center relative">
      <button className="bg-[#5b55e0] text-white rounded-lg font-semibold py-[12px] px-4 no-underline text-center max-[842px]:w-40" onClick={() => setIsOpen(!isOpen)}>Withdraw Coins</button>
      {isOpen ? (
        <span className="flex flex-col items-center bg-white rounded-md w-60 px-6 py-4 gap-3 absolute -left-[42%] top-[140%] max-[842px]:top-full max-[842px]:-left-[25%] z-20 max-[842px]:border" ref={divRef}>
          <input
            type="text"
            placeholder="Enter Code"
            className="border border-black rounded-md px-2 py-1 w-full"
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
          {error ? (
            <p className="text-xs text-red-500">
              Code must be 10 characters long
            </p>
          ) : null}
          <button
            className="bg-[#5b55e0] px-2 py-2 rounded-md text-white text-sm"
            onClick={handleTransfer}
          >
            Withdraw Coins
          </button>

        </span>
      ) : null
      }
    </div>
  );
};

export default Withdraw;
