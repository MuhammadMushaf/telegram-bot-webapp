import Image from "next/image"

const Hero = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-20 max-sm:py-16" >
            <div className="w-full max-w-[1200px] flex flex-col items-center justify-center gap-2">
                <h1 className="text-3xl font-bold text-center max-md:text-2xl">Simultaneously earn Staking and DeFi rewards</h1>
                <p className="text-3xl text-center max-md:text-xl">Now possible within the BNB Smart Chain (BSC) ecosystem.</p>

                <div className="w-[90%] bg-white rounded-3xl flex items-center gap-2 py-4 px-4 mt-20 whitespace-nowrap max-lg:flex-col max-lg:items-start max-md:mt-10">
                    <div className="w-fit flex items-center gap-2 justify-start py-4">
                        <span className="flex items-center justify-center w-20 max-md:w-16">
                            <Image src={`${process.env.BASE_PATH}${'/bnb-logo.svg'}`} width={55} height={55} alt="bnb" />
                        </span>
                        <p className="font-semibold text-xl">BNB Liquid Staking</p>
                    </div>
                    <div className="flex items-center gap-2 w-full justify-evenly py-4 max-lg:justify-between px-4 max-lg:flex-wrap">
                        <div className="flex flex-col items-start gap-2 w-fit">
                            <p className="text-lg m-0">Total BNB Staked</p>
                            <span className="flex gap-2 items-center max-sm:flex-col max-sm:items-start max-sm:gap-0">
                                <p className="text-xl font-semibold m-0">338,433.6256 BNB</p>
                                <p className="text-base m-0">$164,817,683.35</p>
                            </span>
                        </div>

                        <div className="flex flex-col items-start gap-2 w-fit">
                            <p className="text-lg m-0">Exchange Rate</p>
                            <p className="text-xl font-semibold m-0">1 TAP DOGE ≈ 2.25 $</p>
                        </div>

                        <div className="flex flex-col items-start gap-2 w-fit">
                            <p className="text-lg m-0">APR</p>
                            <p className="text-xl font-semibold m-0 text-[#5b55e0]">2.00 %</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero