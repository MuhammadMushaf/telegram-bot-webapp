import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, MutableRefObject, SetStateAction } from "react"

type Props = {
    setDropdown: Dispatch<SetStateAction<boolean>>,
    divRef: MutableRefObject<any>
}

const WalletPopup = ({ setDropdown, divRef }: Props) => {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 w-screen h-screen" id="dropdown-bg">
            <div className="w-1/3 max-lg:w-1/2 max-sm:w-3/4 flex flex-col items-start gap-4 bg-white py-4 rounded-xl" ref={divRef}>
                <span className="w-full gap-4 flex items-center justify-center relative">
                    <p className="font-semibold">Connect Wallet</p>
                    <button className="absolute top-0 right-2 text-xl" onClick={() => setDropdown(false)}>
                        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                    </button>
                </span>

                <button className="w-full flex items-center gap-2 py-2 bg-[#00000005] px-4 cursor-pointer">
                    <img src="/metamask.webp" alt="metamask" className="w-12 h-12" />
                    <p className="">MetaMask</p>
                </button>

                <button className="w-full flex items-center gap-2 py-2 bg-[#00000005] px-4 cursor-pointer" >
                    <img src="/binance.webp" alt="metamask" className="w-12 h-12" />
                    <p className="">Binance Web3 Wallet</p>
                </button>

                <button className="w-full flex items-center gap-2 py-2 bg-[#00000005] px-4 cursor-pointer" >
                    <img src="/trust.webp" alt="metamask" className="w-12 h-12" />
                    <p className="">Trust Wallet</p>
                </button>
            </div>
        </div>
    )
}

export default WalletPopup