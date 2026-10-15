"use client";

import { FaRegStar } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { PiMicrophone } from "react-icons/pi";
import { HiOutlineLightBulb } from "react-icons/hi";

import useAudioDuration from "@/hooks/useAudioDuration";
import formatDuration from "@/utils/formatDuration";

type BookMetaProps = {
  averageRating: number;
  totalRating: number;
  type: string;
  keyIdeas: number;
  audioLink: string;
};

export default function BookMeta({
  averageRating,
  totalRating,
  type,
  keyIdeas,
  audioLink,
}: BookMetaProps) {
  const duration = useAudioDuration(audioLink);

  return (
    <div className="grid max-w-[600px] grid-cols-2 gap-x-16 gap-y-4 max-[600px]:grid-cols-1">
      <div className="text-primary flex items-center gap-3 text-lg font-semibold">
        <FaRegStar className="shrink-0 text-2xl" />

        <span>
          {averageRating} ({totalRating} ratings)
        </span>
      </div>

      <div className="text-primary flex items-center gap-3 text-lg font-semibold">
        <GoClock className="shrink-0 text-2xl" />

        <span>
          {formatDuration(duration)}
        </span>
      </div>

      <div className="text-primary flex items-center gap-3 text-lg font-semibold">
        <PiMicrophone className="shrink-0 text-2xl" />

        <span>{type}</span>
      </div>

      <div className="text-primary flex items-center gap-3 text-lg font-semibold">
        <HiOutlineLightBulb className="shrink-0 text-2xl" />

        <span>{keyIdeas} Key ideas</span>
      </div>
    </div>
  );
}