import { getBookById } from "@/services/books";
import AudioPlayer from "@/components/player/AudioPlayer";
import ReaderContent from "@/components/player/ReaderContent";

type PlayerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PlayerPage({ params }: PlayerPageProps) {
  const { id } = await params;

  const book = await getBookById(id);

  return (
    <div className="pb-[92px]">
      {/* Reading content */}
      <main className="mx-auto w-full max-w-[900px] px-8 py-8 max-[768px]:px-6">
        <h1 className="text-primary mb-6 text-3xl font-semibold">
          {book.title}
        </h1>

        <hr className="mb-8 border-gray-200" />

        <div className="text-primary whitespace-pre-line text-lg leading-8">
          <ReaderContent summary={book.summary} />
        </div>
      </main>

      {/* Bottom player */}
      <AudioPlayer book={book} />
    </div>
  );
}
