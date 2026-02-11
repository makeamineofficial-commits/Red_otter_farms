import Hero from "@/components/user/home/hero";
import Trending from "@/components/user/home/trending";
import OtterN from "@/components/user/home/otterN";
import Testimony from "@/components/user/home/testimony";
import FAQ from "@/components/user/home/faq";
import Working from "@/components/user/home/working";
import Social from "@/components/user/home/social";
import Compare from "@/components/user/home/compare";
import Explore from "@/components/user/home/explore";
import Process from "@/components/user/home/process";
import Press from "@/components/user/home/press";
import CurtainLoader from "@/components/user/home/loader";
export default function page() {
  return (
    <>
      <CurtainLoader />
      <Hero></Hero>
      <Explore></Explore>
      <Process></Process>
      <Trending></Trending>
      <Working></Working>
      <Compare></Compare>
      <Social></Social>
      <Testimony></Testimony>
      <FAQ></FAQ>
      <OtterN></OtterN>
      <Press></Press>
    </>
  );
}
