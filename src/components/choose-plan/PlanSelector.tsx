"use client";

import { RootState } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

const plans = [
  {
    id: "yearly",
    name: "Premium Plus Yearly",
    price: "$99.99/year",
    description: "7-day free trial included",
    priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
  },
  {
    id: "monthly",
    name: "Premium Monthly",
    price: "$9.99/month",
    description: "No trial included",
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
  },
];

export default function PlanSelector() {
  const [selectedPlan, setSelectedPlan] = useState("yearly");

  const user = useSelector((state: RootState) => state.auth.user);

  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);

  async function handleSubscribe() {
  if (!selectedPlanData?.priceId) return;

  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: selectedPlanData.priceId,
        planId: selectedPlanData.id,
        uid: user?.uid,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to start checkout");
    }

    if (data.url) {
      window.location.href = data.url;
    }
  } catch (error) {
    console.error("Checkout error:", error);
  }
}

  return (
    <section className="mx-auto mt-16 flex flex-col items-center">
      <h2 className="text-primary mb-10 text-center text-3xl font-semibold">
        Choose the plan that fits you
      </h2>

      {plans.map((plan, index) => {
        const isSelected = selectedPlan === plan.id;

        return (
          <div key={plan.id} className="w-full max-w-[750px]">
            <label
              className={`
                flex cursor-pointer items-start gap-8 rounded-md border-[4px]
                bg-[#f1f6f4] px-9 py-9 transition h-[200px]
                ${isSelected ? "border-accent" : "border-[#c5d1d5]"}
              `}
            >
              {/* Hidden real radio */}
              <input
                type="radio"
                name="subscription-plan"
                value={plan.id}
                checked={isSelected}
                onChange={() => setSelectedPlan(plan.id)}
                className="sr-only"
              />

              {/* Custom radio */}
              <div
                className={`
                  mt-1 flex h-9 w-9 shrink-0 items-center justify-center
                  rounded-full border-[3px]
                  ${isSelected ? "border-black" : "border-black"}
                `}
              >
                {isSelected && (
                  <div className="h-3 w-3 rounded-full bg-black" />
                )}
              </div>

              {/* Plan details */}
              <div>
                <h3 className="text-primary mb-3 text-2xl font-semibold">
                  {plan.name}
                </h3>

                <p className="text-primary mb-3 text-4xl font-semibold">
                  {plan.price}
                </p>

                <p className="text-secondary-text text-lg">
                  {plan.description}
                </p>
              </div>
            </label>

            {/* OR divider */}
            {index !== plans.length - 1 && (
              <div className="my-10 flex items-center justify-center gap-4">
                <div className="h-px w-[160px] bg-gray-300" />

                <span className="text-secondary-text">or</span>

                <div className="h-px w-[160px] bg-gray-300" />
              </div>
            )}
          </div>
        );
      })}

      {/* CTA */}
      <div className="mt-12 flex flex-col items-center">
        <button
          type="button"
          onClick={handleSubscribe}
          className="bg-accent hover:bg-accent-hover h-12 w-[360px] rounded-md text-lg font-medium text-primary transition"
        >
          {selectedPlan === "yearly"
            ? "Start your free 7-day trial"
            : "Start your first month"}
        </button>

        <p className="text-secondary-text mt-4 text-center text-sm">
          {selectedPlan === "yearly"
            ? "Cancel your trial at any time before it ends, and you won’t be charged."
            : "30-day money-back guarantee, no questions asked."}
        </p>
      </div>
    </section>
  );
}
