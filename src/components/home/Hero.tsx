import Image from "next/image";
import LandingImg from "../../../public/assets/landing.png"

export default function Hero() {
  return (
    <section>
      <div className="w-full py-10">
        <div className="mx-auto w-full max-w-[1070px] px-6">
          <div className="flex">
            <div className="w-full max-[768px]:mx-auto max-[768px]:flex max-[768px]:max-w-[540px] max-[768px]:flex-col max-[768px]:items-center max-[768px]:text-center">
              <h1 className="mb-6 text-[40px] font-bold text-primary max-[768px]:text-2xl">
                Gain more knowledge
                <br className="max-[768px]:hidden" />
                in less time
              </h1>
              <p className="text-secondary-text mb-6 text-xl font-light leading-[1.5]">
                Great summaries for busy people,
                <br className="max-[768px]:hidden" />
                individuals who barely have time to read,
                <br className="max-[768px]:hidden" />
                and even people who don&apos;t like to read.
              </p>

              <button className="bg-accent text-primary hover:bg-accent-hover flex h-10 w-full max-w-[300px] min-w-[180px] items-center justify-center rounded text-base transition-colors duration-200 active:translate-y-px">
                Login
              </button>
            </div>
            <figure className="flex w-full justify-end max-[768px]:hidden">
                <Image src={LandingImg} alt="summarist landing illustration" className="h-auto w-full max-w-[400px]" loading="eager" fetchPriority="high"/>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
