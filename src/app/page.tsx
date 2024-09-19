'use client'

import Carousel from "@/Components/Home-Page/Carousel/index";
import Hero from "@/Components/Home-Page/Hero/index";
import Partners from "@/Components/Home-Page/Partners/index";
import Stake from "@/Components/Home-Page/Stake";
import Why from "@/Components/Home-Page/Why/index";
import SwapSec from "@/Components/Home-Page/Swap"
import { cryptoPricesAtom, walletInfo } from "@/recoil/authAtom";
import { AccountType } from "@/utils/types";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getCryptoPrices } from "@/services/tokenPrice";


export default function Home() {

  const [walletData, setWalletData] = useRecoilState<AccountType>(walletInfo)

  const [cryptoPrices, setCryptoPrices] = useRecoilState<any>(cryptoPricesAtom)

  useEffect(() => {
    if (walletData.address != "") {
      toast.success('Wallet Connected')
    }
  }, [walletData?.address])

  useEffect(() => {
    handleGetCryptoPrices()
  }, [])

  const handleGetCryptoPrices = async () => {
    const res: any = await getCryptoPrices();
    // console.log(res)
    setCryptoPrices(res)
  }

  return (
    <main className="flex flex-col items-center w-full">

      <Hero />

      <Carousel />

      <SwapSec />

      <Stake />

      <Why />

      <Partners />

    </main>
  );
}
