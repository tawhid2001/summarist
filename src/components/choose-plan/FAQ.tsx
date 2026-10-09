"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "How does the free 7-day trial work?",
    answer:
      "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
  },
  {
    question:
      "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
    answer:
      "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
  },
  {
    question: "What’s included in the Premium plan?",
    answer:
      "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
  },
  {
    question: "Can I cancel during my trial or subscription?",
    answer: "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  }

  return (
    <section className="mx-auto mt-20">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={faq.question} className="border-b border-gray-200">
            <button
              type="button"
              onClick={() => handleToggle(index)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <h3 className="text-primary text-2xl font-medium leading-7">
                {faq.question}
              </h3>

              <FiChevronDown
                className={`text-primary shrink-0 text-2xl transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-secondary-text pb-6 leading-7">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
