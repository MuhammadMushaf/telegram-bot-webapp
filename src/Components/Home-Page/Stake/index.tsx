import Image from 'next/image'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { stakingData } from '@/utils/data'
import { useRouter } from 'next/navigation'



const Stake = () => {

    const router = useRouter()

    const navigateToStake = () => {
        router.push('/stake')
    }

    return (
        <div className="w-full flex flex-col px-8 pt-8 pb-14">
            <div className='pt-6 flex flex-col items-center justify-center w-full text-black'>
                <h2 className='py-2 font-bold text-3xl max-sm:text-2xl'>Generate Tap Doge</h2>
                <div className='w-full overflow-x-scroll overflow-y-hidden py-4 flex gap-4 items-center'>
                    {stakingData.map((data, index) => (
                        <div className='flex flex-col items-center gap-4 border rounded-lg px-12 py-4 w-[350px] min-w-[350px] max-sm:min-w-72 max-sm:px-8' key={index}>
                            <div className='w-full flex items-center justify-between gap-4 '>
                                <span className='flex items-center gap-2'><FontAwesomeIcon icon={faCircle} className='text-green-500 w-2 h-2' /> Ethereum</span>
                                <span className={`flex items-center justify-center rounded-full ${data.border ? "border w-20 h-20" : ""}`} style={{ backgroundColor: data.img_bg, borderColor: data.img_border }}>
                                    <Image src={data.img} height={data.border ? 35 : 78} width={data.border ? 35 : 78} alt={data.shortName}/>
                                </span>
                            </div>
 
                            <div className='w-full flex items-start'>
                                <h3 className='font-bold text-3xl max-sm:text-2xl'>{data.shortName}</h3>
                            </div>

                            <div className='w-full flex items-start justify-between'>
                                <h3 className='font-semibold text-2xl max-sm:text-xl'>TVL</h3>
                                <h3 className='font-bold text-2xl tracking-tighter max-sm:text-xl'>{data.tvl ? "$" + data.tvl : "-"}</h3>
                            </div>

                            <div className='w-full flex items-start justify-between'>
                                <h3 className='font-semibold text-2xl max-sm:text-xl'>MCR</h3>
                                <h3 className='font-bold text-2xl tracking-tighter max-sm:text-xl'>{data.mcr ? data.mcr + "%" : "-"}</h3>
                            </div>

                            <div className='w-full flex items-start justify-between'>
                                <h3 className='font-semibold text-2xl max-sm:text-xl'>Rate</h3>
                                <h3 className='font-bold text-2xl tracking-tighter max-sm:text-xl'>{data.rate ? data.rate + "%" : "-"}</h3>
                            </div>
                            {data.status === "stake" ?
                                <button className='w-full text-center py-3 text-white font-semibold rounded-full' id='hero-btn' onClick={navigateToStake}>Stake</button> :
                                data.status === "coming-soon" ?
                                    <button disabled className='w-full text-center py-3 text-[#adadad] bg-[#e7e7e7] font-semibold rounded-full'>Coming Soon</button>
                                    : null
                            }
                        </div>
                    ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Stake