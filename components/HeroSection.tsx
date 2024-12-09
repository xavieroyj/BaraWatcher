import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import LottieAnimation from "@/app/components/lottie";
import baraAnimation from "@/app/images/bara.json";

export default function HeroSection() {
  return (
    <section className="mx-auto px-4 py-20 text-center bg-slate-100">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl fade-in">
        <span>CombatMalfoy</span>
      </h1>
      <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto fade-in">
        A decentralized platform for identifying and combating scams through
        community-driven peer reviews and trust scores.
      </p>
      <div className="relative my-5 flex justify-center items-center">
        <div className="flex max-w-[55%] w-full h-[60px] rounded-full border border-gray-300">
          <Input
            className="flex-grow h-full rounded-l-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none shadow-none"
            placeholder="Search for a company"
          />
          <div className="flex justify-center items-center p-1">
            <Button className="h-[50px] w-[50px] rounded-full bg-blue-300 hover:bg-blue-600">
              <SearchIcon />
            </Button>
          </div>
        </div>
        <div className="releative flex justify-start items-center">
          <div className="absolute w-[25%]">
            <LottieAnimation animationdata={baraAnimation} />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Link href="/dashboard">
          <Button size="lg" className="mr-4 rounded-full">
            Get Started
          </Button>
        </Link>
        <Link href="/dashboard/settings">
          <Button variant="outline" size="lg" className="rounded-full">
            Connect Wallet
          </Button>
        </Link>
      </div>
    </section>
  );
}
