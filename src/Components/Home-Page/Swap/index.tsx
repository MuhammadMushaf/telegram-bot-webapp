'use client'
import MarketTab from "./marketTab"


const SwapSec = () => {

    return (
        <div className="w-full flex flex-col items-center justify-center py-10 text-black max-sm:px-4 relative" id="stake-hero-bg">
            <div className="w-96 max-sm:w-full flex flex-col items-center justify-center gap-2 bg-white rounded-3xl py-6 px-4">

                {/* <p className="w-full text-3xl text-center font-semibold max-lg:text-xl max-sm:text-lg">Swap</p> */}

                <div className="pb-4 px-4 w-full flex items-center justify-center gap-2 whitespace-nowrap">
                    <div className="flex flex-col gap-4 w-full">
                        <MarketTab />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SwapSec