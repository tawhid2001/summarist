"use client";

import Image from "next/image";
import LoginImage from "../../../../public/assets/login.png"
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { openAuthModal } from "@/redux/features/authModalSlice";

export default function SettingsPage() {
  const dispatch = useDispatch();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const authLoading = useSelector(
    (state: RootState) => state.auth.loading
  );

  if (authLoading) {
    return null;
  }

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-[1070px] px-9 py-6 max-[768px]:px-6">
        <h1 className="text-primary text-5xl font-semibold max-[768px]:text-3xl">
          Settings
        </h1>

        <hr className="my-7 border-gray-200" />

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Image
            src={LoginImage}
            alt="Login"
            width={520}
            height={360}
            className="mb-10 h-auto w-full max-w-[520px]"
          />

          <h2 className="text-primary mb-6 text-3xl font-semibold max-[768px]:text-2xl">
            Log in to your account to see your details.
          </h2>

          <button
            type="button"
            onClick={() => dispatch(openAuthModal())}
            className="bg-accent hover:bg-accent-hover rounded-md px-12 py-3 w-full max-w-[180px] h-auto font-normal text-primary transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const isSubscribed =
    user.subscriptionStatus === "active" ||
    user.subscriptionStatus === "trialing";

  const subscriptionLabel = isSubscribed
    && user.subscriptionPlan === "yearly"
      ? "premium-plus"
      : "premium";

  return (
    <div className="mx-auto w-full max-w-[1070px] px-9 py-6 max-[768px]:px-6">
      <h1 className="text-primary text-3xl font-semibold max-[768px]:text-3xl">
        Settings
      </h1>

      <hr className="my-7 border-gray-200" />

      <section className="py-5">
        <h2 className="text-primary mb-2 text-xl font-semibold">
          Your Subscription plan
        </h2>

        <p className="text-primary text-base">
          {subscriptionLabel}
        </p>
      </section>

      <hr className="my-5 border-gray-200" />

      <section className="py-5">
        <h2 className="text-primary mb-2 text-xl font-semibold">
          Email
        </h2>

        <p className="text-primary text-base">
          {user.email ?? "Not available"}
        </p>
      </section>
    </div>
  );
}