import { Book } from "@/types/book";
import BookCard from "./BookCard";

type BookSectionProps = {
  title: string;
  subtitle: string;
  books: Book[];
};

export default function BookSection({
  title,
  subtitle,
  books,
}: BookSectionProps) {
  return (
    <section className="mt-8">
      <h2 className="text-primary mb-2 text-2xl font-semibold">
        {title}
      </h2>

      <p className="text-secondary-text mb-4">
        {subtitle}
      </p>

      <div className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="
              shrink-0
              snap-start
              basis-[28%]
            "
          >
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </section>
  );
}