import Image from "next/image";
import { getBookById } from "@/services/books";
import Link from "next/link";
import BookActions from "@/components/books/BookActions";
import LibraryButton from "@/components/books/LibraryButton";
import PremiumLabel from "@/components/books/PremiumLabel";
import BookMeta from "@/components/books/BookMeta";

type BookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = await getBookById(id);

  return (
    <div className="mx-auto w-full max-w-[1070px] px-8 py-10 max-[768px]:px-6">
      <div className="flex flex-col">
        {/* Book image */}
        <div className="mx-auto mb-8 w-[280px] max-[768px]:w-[220px]">
          <Image
            src={book.imageLink}
            alt={book.title}
            width={280}
            height={400}
            className="h-auto w-full"
          />
        </div>

        {/* Book details */}
        <div>
          <h1 className="text-primary mb-2 text-3xl font-semibold">
            {book.title}
            <PremiumLabel subscriptionRequired={book.subscriptionRequired} />
          </h1>

          <p className="text-primary mb-6 font-semibold">{book.author}</p>

          <p className="text-primary mb-6 text-xl">{book.subTitle}</p>

          <hr className="my-6 border-gray-200" />

          {/* Metadata */}
          <BookMeta
            averageRating={book.averageRating}
            totalRating={book.totalRating}
            type={book.type}
            keyIdeas={book.keyIdeas}
            audioLink={book.audioLink}
          />

          <hr className="my-6 border-gray-200" />

          {/* Buttons */}
          <BookActions
            bookId={id}
            subscriptionRequired={book.subscriptionRequired}
          />
          <Link
            href="#"
            className="text-blue-500 flex items-center gap-2 font-semibold mb-10"
          >
            <LibraryButton book={book} />
          </Link>

          {/* Description */}
          <div>
            <h2 className="text-primary mb-4 text-xl font-semibold">
              What&apos;s it about?
            </h2>

            <div className="flex flex-wrap gap-4 mb-4">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#f1f6f4] text-primary rounded px-3 py-3 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-[#032b41] leading-7">{book.bookDescription}</p>

            <div className="mt-4">
              <h2 className="text-primary text-xl font-semibold">
                About the author
              </h2>

              <p className="text-[#032b41] leading-7 mt-2">
                {book.authorDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
