"use client"

import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { Book } from "@/types/book";
import useAudioDuration from "@/hooks/useAudioDuration";

type SelectedBookProps = {
  book: Book;
};

export default function SelectedBook({ book }: SelectedBookProps) {
  const duration = useAudioDuration(book.audioLink);

  function formatSelectedDuration(time: number) {
  if (!Number.isFinite(time) || time <= 0) {
    return "0 mins 0 seconds";
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes} mins ${seconds} seconds`;
}

  return (
    <section>
      <h2 className="text-primary mb-6 text-2xl font-semibold">
        Selected just for you
      </h2>

      <div
        className="
          flex max-w-[680px] items-center rounded-md bg-[#fff3d7] p-6

          max-[768px]:grid
          max-[768px]:max-w-none
          max-[768px]:grid-cols-[180px_1fr]
          max-[768px]:gap-x-8
          max-[768px]:gap-y-6

          max-[576px]:grid-cols-[140px_1fr]
          max-[576px]:gap-x-5
          max-[576px]:p-4
        "
      >
        {/* Subtitle */}
        <div
          className="
            w-[42%] pr-6

            max-[768px]:col-span-2
            max-[768px]:row-start-1
            max-[768px]:w-full
            max-[768px]:pr-0
          "
        >
          <p className="text-primary text-lg leading-6 max-[576px]:text-base">
            {book.subTitle}
          </p>
        </div>

        {/* Desktop divider */}
        <div className="h-[140px] w-px bg-gray-300 max-[768px]:hidden" />

        {/* Book image */}
        <div
          className="
            flex w-full md:w-[28%] justify-center px-6

            max-[768px]:col-start-1
            max-[768px]:row-start-2
            max-[768px]:w-full
            max-[768px]:justify-start
            max-[768px]:px-0
          "
        >
          <div className="w-full max-w-[115px] max-[768px]:max-w-[170px] max-[576px]:max-w-[140px]">
            <Image
              src={book.imageLink}
              alt={book.title}
              width={170}
              height={240}
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* Book information */}
        <div
          className="
            w-[30%]

            max-[768px]:col-start-2
            max-[768px]:row-start-2
            max-[768px]:w-full
            max-[768px]:self-center
          "
        >
          <div className="flex flex-col gap-0">
            <h3 className="text-primary mb-2 text-lg font-semibold">
              {book.title}
            </h3>

            <p className="text-secondary-text mb-5">{book.author}</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white"
              >
                <FaPlay className="ml-0.5 text-sm" />
              </button>

              <span className="text-primary text-sm font-medium max-[576px]:text-xs">
                {formatSelectedDuration(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
