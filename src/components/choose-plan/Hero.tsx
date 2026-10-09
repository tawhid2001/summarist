import Image from "next/image";
import PricingImg from "../../../public/assets/pricing-top.png";

export default function Hero() {
    return (
        <>
        <section className="text-center h-dvh bg-primary pt-10 border-none md:rounded-b-[12rem]">
                <h1 className="text-white mx-auto max-w-[700px] text-4xl font-semibold leading-tight">
                  Get unlimited access to many amazing <br />
                  books to read
                </h1>
        
                <p className="text-white mt-4 text-lg">
                  Turn ordinary moments into amazing learning opportunities
                </p>
        
                <div className="mx-auto mt-10 max-w-[368px]">
                  <Image
                    src={PricingImg}
                    alt="Summarist pricing"
                    width={700}
                    height={600}
                    className="h-auto w-full rounded-t-full object-contain"
                  />
                </div>
              </section>
        </>
    )
}