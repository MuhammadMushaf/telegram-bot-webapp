import { auditData, investorsData, partnersData } from "@/utils/data"
import Image from "next/image"

const Partners = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-20 px-10 py-20 w-full" id="partners-bg">

            {/* Investors */}
            <div className="w-full max-w-[1200px] flex items-center justify-center flex-col">
                <h2 className='py-2 font-bold text-2xl'>Invested By</h2>
                <div className="pt-6 grid grid-cols-1 text-black">
                    {investorsData.map((data, index) => (
                        <div className="col-span-1 p-2 rounded-3xl bg-white w-60 flex items-center justify-center" key={index}>
                            <Image src={data.img} width={data.width} height={data.height} alt={data.alt} />
                        </div>
                    ))}

                </div>
            </div>

            {/* Partners */}
            <div className="w-full max-w-[1200px] flex items-center justify-center flex-col ">
                <h2 className='py-2 font-bold text-2xl'>Partners</h2>
                <div className="pt-6 grid grid-cols-5 w-full text-black gap-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 max-sm:w-fit">
                    {partnersData.map((data, index) => (
                        <div className="col-span-1 p-2 rounded-3xl bg-white max-sm:w-full flex items-center justify-center" key={index}>
                            <Image src={data.img} width={data.width} height={data.height} alt={data.alt} />
                        </div>
                    ))}
                </div>
            </div>


            {/* Audit */}
            <div className="w-full max-w-[1200px] flex items-center justify-center flex-col ">
                <h2 className='py-2 font-bold text-2xl'>Audit</h2>
                <div className="pt-6 grid grid-cols-3 w-3/5 text-black gap-6 max-lg:grid-cols-2 max-md:w-full max-sm:w-fit">
                    {auditData.map((data, index) => (
                        <div className="col-span-1 p-2 rounded-3xl bg-white max-sm:w-full flex items-center justify-centers" key={index}>
                            <Image src={data.img} width={data.width} height={data.height} alt={data.alt} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Partners