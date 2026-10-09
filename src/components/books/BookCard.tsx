import Image from "next/image";
import Link from "next/link";
import { FiClock, FiStar } from "react-icons/fi";
import { Book } from "@/types/book";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="group block w-full max-w-[180px] p-2 relative"
    >
      {/* Premium pill */}
      {book.subscriptionRequired && (
        <span className="absolute top-0 right-0 rounded-full bg-[#032b41] px-2 py-1 text-[10px] font-medium text-white">
          Premium
        </span>
      )}


      {/* Image */}
      <div className=" mb-3">
        <Image
          src={book.imageLink}
          alt={book.title}
          width={180}
          height={250}
          className="h-auto w-full transition-transform mt-6 duration-200 group-hover:scale-[1.02]"
        />
      </div>

      {/* Title */}
      <h3 className="text-primary mb-1 font-semibold">{book.title}</h3>

      {/* Author */}
      <p className="text-secondary-text mb-2 text-sm">{book.author}</p>

      {/* Subtitle */}
      <p className="text-secondary-text mb-2 line-clamp-2 text-sm font-light">
        {book.subTitle}
      </p>

      {/* Bottom info */}
      <div className="text-secondary-text flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <FiClock />
          <span>04:40</span>
        </div>

        <div className="flex items-center gap-1">
          <FiStar />
          <span>{book.averageRating}</span>
        </div>
      </div>
    </Link>
  );
}
