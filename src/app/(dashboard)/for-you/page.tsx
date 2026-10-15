import SelectedBook from "@/components/books/SelectedBook";
import BookSection from "@/components/books/BookSection";

import {
  getSelectedBook,
  getRecommendedBooks,
  getSuggestedBooks,
} from "@/services/books";

export default async function ForYouPage() {
  const selectedBook = await getSelectedBook();
  const recommendedBooks = await getRecommendedBooks();
  const suggestedBooks = await getSuggestedBooks();

  return (
    <div className="mx-auto w-full max-w-[1070px] py-10 px-4 max-[768px]:px-6">
      <SelectedBook book={selectedBook} />

      <BookSection
        title="Recommended For You"
        subtitle="We think you'll like these"
        books={recommendedBooks}
      />

      <BookSection
        title="Suggested Books"
        subtitle="Browse more books you might enjoy"
        books={suggestedBooks}
      />
    </div>
  );
}