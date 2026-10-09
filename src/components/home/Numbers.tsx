import { BiCrown } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";

const numbersData = [
  {
    id: 1,
    icon: <BiCrown className="h-12 w-12 text-[#0365f2]" />,
    title: "3 Million",
    subtitle: "Downloads on all platforms",
  },
  {
    id: 2,
    icon: (
      <div className="flex items-center gap-1 text-[#0365f2]">
        {Array.from({ length: 4 }).map((_, index) => (
          <BsStarFill key={index} className="h-5 w-5" />
        ))}
        <BsStarHalf className="h-5 w-5" />
      </div>
    ),
    title: "4.5 Stars",
    subtitle: "Average ratings on iOS and Google Play",
  },
  {
    id: 3,
    icon: <RiLeafLine className="h-12 w-12 text-[#0365f2]" />,
    title: "97%",
    subtitle: "Of Summarist members create a better reading habit",
  },
];

export default function Numbers() {
  return (
    <section id="numbers" className="w-full py-10">
      <div className="mx-auto w-full max-w-[1070px] px-6">
        {/* Section title */}
        <h2 className="text-primary mb-8 text-center text-[32px] font-bold max-[768px]:text-2xl">Start Growing with Summarist now</h2>
        {/* Grid */}
        <div className="grid grid-cols-3 gap-10 max-[768px]:grid-cols-1 max-[768px]:gap-6">
          {numbersData.map((item) => (
            <div key={item.id} className="flex flex-col items-center rounded-xl bg-[#d7e9ff] px-6 pt-6 pb-10 text-center">
              {/* Icon */}
              <div className="flex h-[60px] items-center justify-center gap-1">{item.icon}</div>
              {/* Number */}
              <div className="text-primary mb-4 text-[40px] font-semibold max-[768px]:text-[32px]">{item.title}</div>
              {/* Subtitle */}
              <p className="text-secondary-text font-light max-[768px]:text-sm">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
