"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { openAuthModal } from "@/redux/features/authModalSlice";
import { RootState } from "@/redux/store";

type BookActionsProps = {
  bookId: string;
  subscriptionRequired: boolean;
};

export default function BookActions({
  bookId,
  subscriptionRequired,
}: BookActionsProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  console.log("Redux user:", user);
  
  const isSubscribed =
  user?.subscriptionStatus === "active" ||
  user?.subscriptionStatus === "trialing";
  
  console.log("isSubscribed: ", isSubscribed);


  function handleAction() {
    if (!user) {
      dispatch(openAuthModal());
      return;
    }

    if (subscriptionRequired && !isSubscribed) {
      router.push("/choose-plan");
      return;
    }

    router.push(`/player/${bookId}`);
  }

  return (
    <div className="mb-10 flex gap-4">
      <button
        type="button"
        onClick={handleAction}
        className="bg-primary rounded-md px-7 py-3 font-semibold text-white w-full max-w-[160px]"
      >
        Read
      </button>
      <button
        type="button"
        onClick={handleAction}
        className="bg-primary rounded-md px-7 py-3 font-semibold text-white w-full max-w-[160px]"
      >
        Listen
      </button>
    </div>
  );
}
