import Image from "next/image";
import { getBookById } from "@/services/books";
import { FaRegStar } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiMicrophone } from "react-icons/pi";
import { LuBookOpenText } from "react-icons/lu";
import { TiMicrophoneOutline } from "react-icons/ti";
import { CiBookmark } from "react-icons/ci";
import Link from "next/link";
import BookActions from "@/components/books/BookActions";

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
            {book.subscriptionRequired && <span> (Premium)</span>}
          </h1>

          <p className="text-primary mb-6 font-semibold">{book.author}</p>

          <p className="text-primary mb-6 text-xl">{book.subTitle}</p>

          <hr className="my-6 border-gray-200" />

          {/* Metadata */}
          <div className="grid max-w-[600px] grid-cols-2 gap-x-16 gap-y-4 max-[600px]:grid-cols-1">
            <div className="text-primary flex items-center gap-3 text-lg font-semibold">
              <FaRegStar className="shrink-0 text-2xl" />
              <span>
                {book.averageRating} ({book.totalRating} ratings)
              </span>
            </div>

            <div className="text-primary flex items-center gap-3 text-lg font-semibold">
              <GoClock className="shrink-0 text-2xl" />
              <span>04:40</span>
            </div>

            <div className="text-primary flex items-center gap-3 text-lg font-semibold">
              <PiMicrophone className="shrink-0 text-2xl" />
              <span>{book.type}</span>
            </div>

            <div className="text-primary flex items-center gap-3 text-lg font-semibold">
              <HiOutlineLightBulb className="shrink-0 text-2xl" />
              <span>{book.keyIdeas} Key ideas</span>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Buttons */}
          <BookActions bookId={id} subscriptionRequired={book.subscriptionRequired} />
          <Link
            href="#"
            className="text-blue-500 flex items-center gap-2 font-semibold mb-10"
          >
            <span>
              <CiBookmark className="text-2xl" />
            </span>
            <span className="font-medium stretch">Add title to My Library</span>
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
