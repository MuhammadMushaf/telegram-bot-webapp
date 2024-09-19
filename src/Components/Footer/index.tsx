import { faDiscord, faMedium, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Footer = () => {
    return (
        <div className="bg-black w-full flex flex-col items-center justify-center px-14 py-10 text-white max-sm:px-6">
            <div className="w-full max-w-[1200px] flex items-start justify-between max-sm:flex-col max-sm:gap-10 ">
                <div className="flex flex-col items-start max-sm:w-full">
                    <h2 >SWAPMOON</h2>
                    <p>BD Mod: parnterships@swapmoon.or</p>
                    <div className="flex items-center gap-6 pt-14 w-full">
                        <span className="bg-[#808080] flex items-center justify-center rounded-full p-[6px]">
                            <FontAwesomeIcon icon={faTwitter} className=" text-black w-5 h-5" />
                        </span>
                        <span className="bg-[#808080] flex items-center justify-center rounded-full p-[6px]">
                            <FontAwesomeIcon icon={faDiscord} className=" text-black w-5 h-5" />
                        </span>
                        <span className="bg-[#808080] flex items-center justify-center rounded-full p-[6px]">
                            <FontAwesomeIcon icon={faTelegram} className=" text-black w-5 h-5" />
                        </span>
                        <span className="bg-[#808080] flex items-center justify-center rounded-full p-[6px]">
                            <FontAwesomeIcon icon={faMedium} className=" text-black w-5 h-5" />
                        </span>
                    </div>

                </div>

                <div className="flex items-start gap-6 text-sm whitespace-nowrap max-sm:w-full">
                    <div className="flex flex-col items-start gap-1">
                        <p className="font-semibold">Sources</p>
                        <a href="#" className="text-white no-underline max-sm:text-xs">Documentation</a>
                        <a href="#" className="text-white no-underline max-sm:text-xs">Audit</a>
                        <a href="#" className="text-white no-underline max-sm:text-xs">Github</a>
                        <a href="#" className="text-white no-underline max-sm:text-xs">Dune</a>
                    </div>

                    <div className="flex flex-col items-start gap-1">
                        <p className="font-semibold">Info</p>
                        <a href="#" className="text-white no-underline max-sm:text-xs">CoinMarketCap</a>
                        <a href="#" className="text-white no-underline max-sm:text-xs">CoinGecko</a>
                    </div>

                    <div className="flex flex-col items-start gap-1">
                        <p className="font-semibold">About</p>
                        <a href="#" className="text-white no-underline max-sm:text-xs">FAQ</a>
                        <a href="#" className="text-white no-underline max-sm:whitespace-break-spaces max-sm:text-xs">Legal Disclaimer</a>
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center justify-center pt-6">
                <p className="text-[#aeadad] text-sm">© 2024 SWAPMOON  All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer