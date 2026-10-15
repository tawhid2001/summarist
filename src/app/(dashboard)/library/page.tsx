"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

import { db } from "@/firebase/firebase";
import { RootState } from "@/redux/store";
import { Book } from "@/types/book";
import BookCard from "@/components/books/BookCard";


export default function LibraryPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [finishedBooks, setFinishedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLibrary() {
      if (!user) {
        setSavedBooks([]);
        setFinishedBooks([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const savedSnapshot = await getDocs(
          collection(db, "users", user.uid, "library")
        );

        const finishedSnapshot = await getDocs(
          collection(db, "users", user.uid, "finished")
        );

        const saved = savedSnapshot.docs.map(
          (document) => document.data() as Book
        );

        const finished = finishedSnapshot.docs.map(
          (document) => document.data() as Book
        );

        setSavedBooks(saved);
        setFinishedBooks(finished);
      } catch (error) {
        console.error("Failed to load library:", error);
      } finally {
        setLoading(false);
      }
    }

    loadLibrary();
  }, [user]);

  if (loading) {
    return (
      <div className="m-5 w-full max-w-[1070px]">
        <p className="text-secondary-text">
          Loading library...
        </p>
      </div>
    );
  }

  return (
    <div className="m-5 flex w-full max-w-[1070px] flex-col gap-10">
      {/* Saved Books */}
      <section className="flex flex-col gap-4">
        <div>
          <h1 className="text-primary mb-2 text-2xl font-semibold">
            Saved Books
          </h1>

          <p className="text-secondary-text">
            {savedBooks.length}{" "}
            {savedBooks.length === 1 ? "item" : "items"}
          </p>
        </div>

        {savedBooks.length === 0 ? (
          <div className="mx-auto w-full max-w-[360px] rounded-xl bg-[#f1f6f4] p-8">
            <h2 className="text-primary mb-2 text-center text-xl font-semibold">
              Save your favorite books!
            </h2>

            <p className="text-secondary-text text-center font-light">
              When you save a book, it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6 max-[1000px]:grid-cols-3 max-[700px]:grid-cols-2">
            {savedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))}
          </div>
        )}
      </section>

      {/* Finished Books */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-primary mb-2 text-2xl font-semibold">
            Finished
          </h2>

          <p className="text-secondary-text">
            {finishedBooks.length}{" "}
            {finishedBooks.length === 1 ? "item" : "items"}
          </p>
        </div>

        {finishedBooks.length === 0 ? (
          <div className="mx-auto w-full max-w-[360px] rounded-xl bg-[#f1f6f4] p-8">
            <h2 className="text-primary mb-2 text-center text-xl font-semibold">
              Your finished books!
            </h2>

            <p className="text-secondary-text text-center font-light">
              When you finish a book, it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6 max-[1000px]:grid-cols-3 max-[700px]:grid-cols-2">
            {finishedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}