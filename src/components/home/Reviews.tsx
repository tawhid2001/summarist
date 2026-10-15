'use client';

import { BsStarFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { openAuthModal } from "@/redux/features/authModalSlice";

const reviews = [
  {
    name: "Hanna M.",
    body: (
      <>
        This app has been a <b>game-changer</b> for me! It&apos;s saved me so
        much time and effort in reading and comprehending books. Highly
        recommend it to all book lovers.
      </>
    ),
  },
  {
    name: "David B.",
    body: (
      <>
        I love this app! It provides <b>concise and accurate summaries</b> of
        books in a way that is easy to understand. It&apos;s also very
        user-friendly and intuitive.
      </>
    ),
  },
  {
    name: "Nathan S.",
    body: (
      <>
        This app is a great way to get the main takeaways from a book without
        having to read the entire thing.{" "}
        <b>The summaries are well-written and informative.</b> Definitely worth
        downloading.
      </>
    ),
  },
  {
    name: "Ryan R.",
    body: (
      <>
        If you&apos;re a busy person who{" "}
        <b>loves reading but doesn&apos;t have the time</b> to read every book
        in full, this app is for you! The summaries are thorough and provide a
        great overview of the book&apos;s content.
      </>
    ),
  },
];

export default function Reviews() {
  const dispatch = useDispatch();
  return (
    <section id="reviews">
      <div className="mx-auto w-full max-w-[1070px] px-6">
        <div className="w-full py-10">
          <h2 className="text-primary mb-8 text-center text-[32px] font-bold max-[768px]:text-2xl">
            What our members say
          </h2>
          <div className="mx-auto  max-w-[600px]">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="mb-8 rounded bg-[#fff3d7] p-4 font-light"
              >
                <div className="text-primary mb-2 flex gap-2">
                  <div>{review.name}</div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <BsStarFill
                        key={index}
                        className="h-4 w-4 fill-[#0564f1]"
                      />
                    ))}
                  </div>
                </div>
                <div className="text-secondary-text leading-[1.4] tracking-[0.3px] max-[768px]:text-sm">
                  {review.body}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button onClick={() => dispatch(openAuthModal())} className="bg-accent text-primary hover:bg-accent-hover flex h-10 w-full max-w-[300px] min-w-[180px] items-center justify-center rounded text-base transition-colors duration-200 active:translate-y-px">
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
