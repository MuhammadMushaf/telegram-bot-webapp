import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <div
      className="w-full flex flex-col items-center justify-center pb-16 relative"
      id="hero-bg"
    >
      {/* {userData.username ? (
        <ConversionAndWithdraw
          coins={userData.coinsBalance}
          handleTransferCoins={handleTransferCoins}
          userId={userData._id}
        />
      ) : null} */}
      <video autoPlay loop muted id="home-bg-video">
        <source src="/home-hero-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="w-full max-w-[1200px] flex flex-col items-center justify-center gap-6 px-10 pt-20 max-sm:px-2 z-[1] text-white">
        <h1 className="text-8xl font-bold max-lg:text-5xl max-sm:text-4xl text-center">
          Making DeFi Easier
        </h1>
        <p className="w-2/3 text-3xl text-center max-lg:text-xl max-sm:text-lg">
          Enjoy secure, simple and permissionless liquid staking and stablecoin
          lending solutions
        </p>
        <div className="flex items-center gap-4 pt-8 max-lg:pt-4 max-sm:flex-col max-sm:gap-6">
          {/* <button className="font-semibold text-white whitespace-nowrap w-72 py-4 rounded-full text-4xl max-lg:text-2xl max-lg:w-56 max-md:w-52 max-md:text-xl max-sm:w-40 max-sm:text-lg" id="hero-btn" onClick={navigateToSwap}>Swap</button> */}
          <button
            className="font-semibold text-white whitespace-nowrap w-72 py-4 rounded-full text-4xl max-lg:text-2xl max-lg:w-56 max-md:w-52 max-md:text-xl max-sm:w-40 max-sm:text-lg"
            id="hero-btn"
            onClick={() => router.push('/stake')}
          >
            Stake BNB
          </button>
        </div>
        <span className="flex gap-2 items-center text-[#5b55e0] text-4xl max-lg:text-2xl max-md:text-xl max-sm:text-lg">
          Cosmic Adventure Challenge{" "}
          <FontAwesomeIcon className="h-8 max-md:h-6" icon={faArrowRight} />
        </span>

        <div className="grid grid-cols-4 pt-8 max-[870px]:grid-cols-2 max-sm:grid-cols-2">
          <span className="col-span-1 w-fit flex flex-col gap-2 items-center my-4 max-[870px]:w-72 max-sm:w-full">
            <p className="m-0 text-2xl font-semibold max-lg:text-xl max-sm:text-base">
              Total Value Locked
            </p>
            <p className="m-0 text-3xl tracking-tighter max-lg:text-2xl font-extrabold max-sm:text-xl">
              $ 413,925,343
            </p>
          </span>

          <span className="col-span-1 w-fit flex flex-col gap-2 items-center my-4 max-[870px]:w-72 max-sm:w-full">
            <p className="m-0 text-2xl font-semibold max-lg:text-xl max-sm:text-base">
              Collateral Value
            </p>
            <p className="m-0 text-3xl tracking-tighter max-lg:text-2xl font-extrabold max-sm:text-xl">
              $ 239,859,424
            </p>
          </span>

          <span className="col-span-1 w-fit flex flex-col gap-2 items-center my-4 max-[870px]:w-72 max-sm:w-full">
            <p className="m-0 text-2xl font-semibold max-lg:text-xl max-sm:text-base">
              Liquid Staked
            </p>
            <p className="m-0 text-3xl tracking-tighter max-lg:text-2xl font-extrabold max-sm:text-xl">
              $ 174,233,343
            </p>
          </span>

          <span className="col-span-1 w-fit flex flex-col gap-2 items-center my-4 max-[870px]:w-72 max-sm:w-full">
            <p className="m-0 text-2xl font-semibold max-lg:text-xl max-sm:text-base ">
              Total TD Borrowed
            </p>
            <p className="m-0 text-3xl tracking-tighter max-lg:text-2xl font-extrabold max-sm:text-xl">
              $ 413,925,343
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
