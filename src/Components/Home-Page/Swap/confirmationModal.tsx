import { cryptoPricesAtom } from "@/recoil/authAtom"
import { swapType } from "@/utils/types"
import { MutableRefObject } from "react"
import { useRecoilState } from "recoil"

type Props = { divRef: MutableRefObject<any>, handleTransfer: () => Promise<void>, swapAmount: any, convertedAmount: any, selectedCoin: swapType }

const ConfirmationModal = ({ divRef, swapAmount, convertedAmount, selectedCoin, handleTransfer }: Props) => {

    const [cryptoPrices, setCryptoPrices] = useRecoilState<any>(cryptoPricesAtom)

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/60 flex items-center justify-center z-20">
            <div className=" text-black w-96 bg-white h-fit pb-6 px-8 rounded-3xl pt-10 flex flex-col gap-6" ref={divRef}>
                <p className="w-full text-center font-semibold text-2xl pb-4">Confirm Tokens Swap</p>

                <span className="w-full flex items-center justify-between gap-2 px-8 text-lg font-semibold">
                    <p>TAP DOGE Coin</p>
                    <p className="">{swapAmount}</p>
                </span>

                <p className="w-full text-center px-8 text-xl font-bold">To</p>

                <span className="w-full flex items-center justify-between gap-2 px-8 text-lg font-semibold">
                    <p>{selectedCoin?.shortName}</p>
                    <p className="">{+convertedAmount}</p>
                </span>

                <p className="w-full text-red-600 whitespace-pre-wrap font-semibold">Service Fee of 0.00078 BNB will be deducted fron your wallet</p>

                <button className="bg-[#5c55e0] text-white px-10 py-2 rounded-md font-semibold" onClick={handleTransfer}>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmationModal