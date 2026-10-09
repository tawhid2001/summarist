import { FaFileAlt, FaHandshake } from "react-icons/fa";
import { RiPlantFill } from "react-icons/ri";

const benefits = [
  {
    icon: FaFileAlt,
    text: (
      <p className="text-primary max-w-[220px] text-base font-base leading-7">
        <span className="font-semibold">Key ideas in few minutes</span> with
        many books to read
      </p>
    ),
  },
  {
    icon: RiPlantFill,
    text: (
      <p className="text-primary max-w-[220px] text-base font-base leading-7">
        <span className="font-semibold">3 million</span> people growing with
        Summarist everyday
      </p>
    ),
  },
  {
    icon: FaHandshake,
    text: (
      <p className="text-primary max-w-[220px] text-base font-base leading-7">
        <span className="font-semibold">Precise recommendations</span>{" "}
        collections curated by experts
      </p>
    ),
  },
];

export default function Benefits() {
  return (
    <>
      <section className="mx-auto mt-12 grid max-w-[850px] grid-cols-3 gap-8 text-center max-[768px]:grid-cols-1">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;

          return (
            <div key={index} className="flex flex-col items-center">
              <div className="text-primary mb-4 text-6xl">
                <Icon />
              </div>
              {benefit.text}
            </div>
          );
        })}
      </section>
    </>
  );
}
