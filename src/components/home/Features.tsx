"use client";
import { useEffect, useState } from "react";

import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai";

const featuresData = [
  {
    id: 1,
    icon: (
      <AiFillFileText className="h-[60px] w-[60px] max-[768px]:h-12 max-[768px]:w-12" />
    ),
    title: "Read or listen",
    description: "Save time by getting the core ideas from the best books.",
  },
  {
    id: 2,
    icon: (
      <AiFillBulb className="h-[60px] w-[60px] max-[768px]:h-12 max-[768px]:w-12" />
    ),
    title: "Find your next read",
    description: "Explore book lists and personalized recommendations.",
  },
  {
    id: 3,
    icon: (
      <AiFillAudio className="h-[60px] w-[60px] max-[768px]:h-12 max-[768px]:w-12" />
    ),
    title: "Briefcasts",
    description: "Gain valuable insights from briefcasts",
  },
];

const firstHeadings = [
  "Enhance your knowledge",
  "Achieve greater success",
  "Improve your health",
  "Develop better parenting skills",
  "Increase happiness",
  "Be the best version of yourself!",
];

const firstStatistics = [
  {
    number: "93%",
    text: (
      <>
        of Summarist members <b>significantly increase</b> reading frequency.
      </>
    ),
  },
  {
    number: "96%",
    text: (
      <>
        of Summarist members <b>establish better</b> habits.
      </>
    ),
  },
  {
    number: "90%",
    text: (
      <>
        have made <b>significant positive</b> change to their lives.
      </>
    ),
  },
];

const secondHeadings = [
  "Expand your learning",
  "Accomplish your goals",
  "Strengthen your vitality",
  "Become a better caregiver",
  "Improve your mood",
  "Maximize your abilities",
];

const secondStatistics = [
  {
    number: "91%",
    text: (
      <>
        of Summarist members <b>report feeling more productive</b> after
        incorporating the service into their daily routine.
      </>
    ),
  },
  {
    number: "94%",
    text: (
      <>
        of Summarist members have <b>noticed an improvement</b> in their overall
        comprehension and retention of information.
      </>
    ),
  },
  {
    number: "88%",
    text: (
      <>
        of Summarist members <b>feel more informed</b> about current events and
        industry trends since using the platform.
      </>
    ),
  },
];

export default function Features() {
  const [activeHeading, setActiveHeading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeading((prev) => (prev + 1) % 6);
    }, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="features">
      <div className="w-full py-10">
        <div className="mx-auto w-full max-w-[1070px] px-6">
          {/* Section Title */}
          <h2 className="text-primary mb-8 text-center text-[32px] font-bold max-[768px]:text-2xl">
            Understand books in few minutes
          </h2>
          {/* Feature cards */}
          <div className="mb-24 grid grid-cols-3 gap-10 max-[768px]:grid-cols-1">
            {featuresData.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center"
              >
                <div className="text-primary mb-2">{feature.icon}</div>
                <h3 className="text-primary mb-4 text-2xl font-medium max-[768px]:text-xl">
                  {feature.title}
                </h3>
                <p className="text-secondary-text text-lg font-light max-[768px]:text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          {/* First statistic section inside Feature */}
          <div className="mb-24 flex gap-20 max-[768px]:mb-8 max-[768px]:flex-col max-[768px]:gap-8">
            <div className="flex w-full flex-col justify-center">
              {firstHeadings.map((heading, index) => (
                <h3
                  key={heading}
                  className={`mb-1 text-[32px] font-medium transition-colors duration-300 max-[768px]:text-2xl ${activeHeading === index ? "text-accent" : "text-[#6b757b]"}`}
                >
                  {heading}
                </h3>
              ))}
            </div>

            <div className="flex w-full flex-col justify-center gap-6 bg-[#f1f6f4] px-6 py-10">
              {firstStatistics.map((statistic) => (
                <Statistic
                  key={statistic.number}
                  number={statistic.number}
                  text={statistic.text}
                />
              ))}
            </div>
          </div>

          {/* Second statistic section inside Feature */}
          <div className="mb-24 flex gap-20 max-[768px]:mb-8 max-[768px]:flex-col-reverse max-[768px]:gap-8">
            <div className="flex w-full flex-col justify-center gap-6 bg-[#f1f6f4] px-6 py-10">
              {secondStatistics.map((statistic) => (
                <Statistic
                  key={statistic.number}
                  number={statistic.number}
                  text={statistic.text}
                />
              ))}
            </div>

            <div className="flex w-full flex-col justify-center">
              {secondHeadings.map((heading, index) => (
                <h3
                  key={heading}
                  className={`mb-1 text-[32px] font-medium transition-colors duration-300 max-[768px]:text-2xl max-[768px]:text-start text-end ${activeHeading === index ? "text-accent" : "text-[#6b757b]"}`}
                >
                  {heading}
                </h3>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type StatisticProps = {
  number: string;
  text: React.ReactNode;
};

function Statistic({ number, text }: StatisticProps) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 text-xl font-semibold text-[#0365f2]">{number}</div>
      <div className="text-secondary-text text-xl font-light max-[768px]:text-base">
        {text}
      </div>
    </div>
  );
}
