import BookCardSkeleton from "@/components/books/BookCardSkeleton";
import SelectedBookSkeleton from "@/components/books/SelectedBookSkeleton";

export default function ForYouSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-[1070px] flex-col gap-10 px-8 py-10 max-[768px]:px-6">
      {/* Selected */}
      <SelectedBookSkeleton />

      {/* Recommended */}
      <section className="flex flex-col gap-4">
        <div>
          <div className="mb-2 h-7 w-[170px] animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-[260px] animate-pulse rounded bg-gray-200" />
        </div>

        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="shrink-0 basis-[28%] max-[900px]:basis-[38%] max-[600px]:basis-[70%]"
            >
              <BookCardSkeleton />
            </div>
          ))}
        </div>
      </section>

      {/* Suggested */}
      <section className="flex flex-col gap-4">
        <div>
          <div className="mb-2 h-7 w-[150px] animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-[230px] animate-pulse rounded bg-gray-200" />
        </div>

        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="shrink-0 basis-[28%] max-[900px]:basis-[38%] max-[600px]:basis-[70%]"
            >
              <BookCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}