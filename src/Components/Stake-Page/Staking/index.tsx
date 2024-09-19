"use client";

import StakeTab from "./stakeTab";

const Staking = () => {


  return (
    <div className="w-full flex flex-col items-center justify-center max-w-[1200px] pb-10 text-black">
      <div className="w-[90%] flex flex-col items-center justify-center gap-2 bg-white rounded-3xl py-4 px-4">
        {/* <div className="border-b pb-6 w-full flex items-center justify-evenly gap-2 whitespace-nowrap max-lg:flex-wrap max-lg:items-start">
          <div className="flex flex-col items-center gap-2 w-fit">
            <p className="text-lg m-0">Your BNB</p>
            <p className="text-xl font-semibold m-0">- BNB</p>
          </div>

          <div className="flex flex-col items-center gap-2 w-fit">
            <p className="text-lg m-0">Your slisBNB</p>
            <p className="text-xl font-semibold m-0">- slisBNB</p>
          </div>

          <div className="flex flex-col items-center gap-2 w-fit">
            <p className="text-lg m-0">Your Withdrawable Amount</p>
            <p className="text-xl font-semibold m-0">- BNB</p>
          </div>

          <div className="flex flex-col items-center gap-2 w-fit">
            <p className="text-lg m-0">Your Unstake Amount</p>
            <p className="text-xl font-semibold m-0">- slisBNB</p>
          </div>
        </div> */}

        <div className="py-10 px-4 w-full flex items-center justify-center gap-2 whitespace-nowrap">
          <div className="flex flex-col gap-4 w-1/3 max-lg:w-1/2 max-md:w-3/4 max-sm:w-full">
            <div className="flex items-center gap-2 w-full rounded-full justify-evenly">
              <button
                className="text-[#5b55e0] text-3xl w-full rounded-full py-2 font-semibold cursor-default"
              >
                Stake
              </button>
            </div>

            <StakeTab />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
