import { swapData } from "@/utils/data"
import { swapType } from "@/utils/types"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { MutableRefObject } from "react"

type Props = { divRef: MutableRefObject<any>, handleCoinSelection: (a: swapType) => void, handleCoinDropdown: () => void }

const CoinDropdown = ({ divRef, handleCoinSelection, handleCoinDropdown }: Props) => {
    return (
        <>
            <div className="fixed w-full h-full left-0 top-0 bg-black/50 items-end max-sm:flex hidden">
                <div className=" text-white w-full bg-[#211e1e] overflow-y-scroll h-1/2 py-2 px-6 rounded-t-[50px] pt-10 flex flex-col gap-6" ref={divRef}>

                    <span className="w-full flex items-center justify-between pb-6 border-b">
                        <h1 className="font-semibold text-xl">Select a Token</h1>
                        <FontAwesomeIcon icon={faXmark} className="text-2xl" onClick={handleCoinDropdown} />
                    </span>

                    {
                        swapData.map((data, i) => (
                            <span className="w-full flex items-center justify-between gap-4 text-sm font-semibold" key={i} onClick={() => handleCoinSelection(data)}>
                                <p className="m-0 font-semibold flex items-center gap-2">
                                    <Image src={data.img} width={data.width} height={data.height} alt={data.shortName} />
                                    {data.shortName}
                                </p>
                            </span>
                        ))
                    }
                </div >
            </div>

            <div className="fixed w-full h-full left-0 top-0 bg-black/50 items-center justify-center max-sm:hidden flex">
                <div className=" text-white w-96 bg-[#211e1e] h-1/2 py-2 px-6 rounded-3xl pt-10 flex flex-col gap-6" ref={divRef}>

                    <span className="w-full flex items-center justify-between pb-6 border-b">
                        <h1 className="font-semibold text-xl">Select a Token</h1>
                        <FontAwesomeIcon icon={faXmark} className="text-2xl" onClick={handleCoinDropdown} />
                    </span>

                    {
                        swapData.map((data, i) => (
                            <span className="w-full flex items-center justify-between gap-4 text-sm font-semibold" key={i} onClick={() => handleCoinSelection(data)}>
                                <p className="m-0 font-semibold flex items-center gap-2">
                                    <Image src={data.img} width={data.width} height={data.height} alt={data.shortName} />
                                    {data.shortName}
                                </p>
                            </span>
                        ))
                    }
                </div >
            </div>
        </>
    )
}

export default CoinDropdown