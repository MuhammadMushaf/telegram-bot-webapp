import Hero from "@/Components/Stake-Page/Hero";
import Staking from "@/Components/Stake-Page/Staking";

export default function Stake() {
    return (
        <main className="flex flex-col items-center w-full" id="stake-hero-bg">

            <Hero />

            <Staking />

        </main>
    );
}
