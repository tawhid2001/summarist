import { FaCircleNotch } from "react-icons/fa";

export default function PlayerLoading() {
  return (
    <div className="pb-[110px]">
      {/* Body spinner */}
      <div className="flex min-h-[calc(100vh-180px)] w-full items-center justify-center">
        <FaCircleNotch className="text-primary animate-spin text-6xl" />
      </div>

      {/* Audio player skeleton */}
      <div className="bg-primary fixed right-0 bottom-0 left-0 z-[100] p-4 text-white">
        <div className="grid min-h-[76px] w-full grid-cols-[1fr_auto_1fr] items-center gap-8 px-4 max-[768px]:flex max-[768px]:flex-col max-[768px]:gap-4">
          
          {/* Book image + info */}
          <div className="flex items-center gap-4 justify-self-start max-[768px]:w-full">
            <div className="h-[60px] w-[45px] shrink-0 animate-pulse rounded bg-white/20" />

            <div className="flex flex-col gap-2">
              <div className="h-4 w-[180px] animate-pulse rounded bg-white/20" />
              <div className="h-3 w-[120px] animate-pulse rounded bg-white/20" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 justify-self-center">
            <div className="h-7 w-7 animate-pulse rounded-full bg-white/20" />

            <div className="h-12 w-12 animate-pulse rounded-full bg-white/80" />

            <div className="h-7 w-7 animate-pulse rounded-full bg-white/20" />
          </div>

          {/* Progress */}
          <div className="flex w-full max-w-[580px] items-center gap-4 justify-self-end max-[768px]:max-w-none">
            <div className="h-4 w-[45px] animate-pulse rounded bg-white/20" />

            <div className="h-2 flex-1 animate-pulse rounded bg-white/30" />

            <div className="h-4 w-[45px] animate-pulse rounded bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}