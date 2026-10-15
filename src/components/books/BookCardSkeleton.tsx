export default function BookCardSkeleton() {
  return (
    <div className="block w-full max-w-[180px] p-2">

      {/* Image */}
      <div className="mb-3">
        <div className="mt-1 aspect-[180/250] w-full animate-pulse rounded bg-gray-200" />
      </div>

      {/* Title */}
      <div className="mb-2 h-5 w-4/5 animate-pulse rounded bg-gray-200" />

      {/* Author */}
      <div className="mb-2 h-4 w-2/3 animate-pulse rounded bg-gray-200" />

      {/* Subtitle */}
      <div className="mb-1 h-4 w-full animate-pulse rounded bg-gray-200" />
      <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-gray-200" />

      {/* Bottom info */}
      <div className="flex items-center gap-3">
        <div className="h-3 w-[45px] animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-[35px] animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}