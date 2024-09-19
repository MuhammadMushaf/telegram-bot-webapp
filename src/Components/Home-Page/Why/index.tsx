import Image from "next/image"
import { whyData } from "@/utils/data"

const Why = () => {
    return (
        <div className="w-full px-10 py-20 flex flex-col items-center justify-center" id="why-bg">
            <div className="w-full max-w-[1200px] flex items-center justify-center flex-col">
                <h2 className='py-2 font-bold text-3xl max-sm:text-2xl'>Why SwapMoon</h2>
                <div className="w-full pt-6 grid grid-cols-2 gap-6 max-md:grid-cols-1 text-black">
                    {whyData.map((data, index) => (
                        <div className="col-span-1 w-full flex gap-3 items-start my-4 max-sm:items-start" key={index}>
                            <Image src={`${process.env.BASE_PATH}${data.img}`} width={100} height={100} alt={data.heading} className="max-sm:h-16" />
                            <div className="flex flex-col items-start gap-1">
                                <h2 className="font-bold text-xl max-sm:text-base">{data.heading}</h2>
                                <p className="font-semibold max-sm:text-xs">{data.description}</p>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Why