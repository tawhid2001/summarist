"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type PremiumLabelProps = {
  subscriptionRequired: boolean;
};

export default function PremiumLabel({
  subscriptionRequired,
}: PremiumLabelProps) {
  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const isSubscribed =
    user?.subscriptionStatus === "active" ||
    user?.subscriptionStatus === "trialing";

  if (!subscriptionRequired || isSubscribed) {
    return null;
  }

  return <span> (Premium)</span>;
}