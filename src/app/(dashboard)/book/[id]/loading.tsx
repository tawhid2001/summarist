export default function BookDetailsLoading() {
  return (
    <div className="mx-auto w-full max-w-[1070px] animate-pulse px-8 py-10 max-[768px]:px-6">
      {/* Book image */}
      <div className="mx-auto mb-8 h-[400px] w-[280px] rounded bg-gray-200 max-[768px]:h-[315px] max-[768px]:w-[220px]" />

      {/* Title */}
      <div className="mb-3 h-8 w-full max-w-[420px] rounded bg-gray-200" />

      {/* Author */}
      <div className="mb-6 h-5 w-[180px] rounded bg-gray-200" />

      {/* Subtitle */}
      <div className="mb-3 h-5 w-full max-w-[520px] rounded bg-gray-200" />
      <div className="mb-6 h-5 w-full max-w-[380px] rounded bg-gray-200" />

      <hr className="my-6 border-gray-200" />

      {/* Metadata */}
      <div className="grid max-w-[600px] grid-cols-2 gap-x-16 gap-y-5 max-[600px]:grid-cols-1">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-gray-200" />
            <div className="h-5 w-[150px] rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Read / Listen */}
      <div className="mb-6 flex gap-5">
        <div className="h-[72px] w-[215px] rounded bg-gray-200" />
        <div className="h-[72px] w-[215px] rounded bg-gray-200" />
      </div>

      {/* Library */}
      <div className="mb-10 h-6 w-[220px] rounded bg-gray-200" />

      {/* Description */}
      <div className="mb-5 h-6 w-[180px] rounded bg-gray-200" />

      <div className="mb-5 flex gap-3">
        <div className="h-10 w-[90px] rounded bg-gray-200" />
        <div className="h-10 w-[110px] rounded bg-gray-200" />
        <div className="h-10 w-[80px] rounded bg-gray-200" />
      </div>

      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-11/12 rounded bg-gray-200" />
        <div className="h-4 w-4/5 rounded bg-gray-200" />
      </div>

      <div className="mt-8 mb-4 h-6 w-[180px] rounded bg-gray-200" />

      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-11/12 rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
      </div>
    </div>
  );
}