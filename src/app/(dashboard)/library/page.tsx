"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LoginImage from "../../../../public/assets/login.png"
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import { db } from "@/firebase/firebase";
import { RootState } from "@/redux/store";
import { openAuthModal } from "@/redux/features/authModalSlice";
import { Book } from "@/types/book";
import BookCard from "@/components/books/BookCard";
import BookCardSkeleton from "@/components/books/BookCardSkeleton";

export default function LibraryPage() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const authLoading = useSelector((state: RootState) => state.auth.loading);

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
          collection(db, "users", user.uid, "library"),
        );

        const finishedSnapshot = await getDocs(
          collection(db, "users", user.uid, "finished"),
        );

        const saved = savedSnapshot.docs.map(
          (document) => document.data() as Book,
        );

        const finished = finishedSnapshot.docs.map(
          (document) => document.data() as Book,
        );

        setSavedBooks(saved);
        setFinishedBooks(finished);
      } catch (error) {
        console.error("Failed to load library:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      loadLibrary();
    }
  }, [user, authLoading]);

  if (authLoading) {
    return null;
  }

  // Logged-out state
  if (!user) {
    return (
      <div className="mx-auto w-full max-w-[1070px] px-9 py-6 max-[768px]:px-6">
        <h1 className="text-primary text-3xl font-semibold max-[768px]:text-3xl">
          My Library
        </h1>

        <hr className="my-7 border-gray-200" />

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Image
            src={LoginImage}
            alt="Login"
            width={520}
            height={360}
            className="mb-10 h-auto w-full max-w-[520px]"
          />

          <h2 className="text-primary mb-6 text-3xl font-semibold max-[768px]:text-2xl">
            Log in to your account to see your library.
          </h2>

          <button
            type="button"
            onClick={() => dispatch(openAuthModal())}
            className="bg-accent hover:bg-accent-hover text-primary w-full max-w-[180px] rounded-md px-12 py-3 font-normal transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // Library loading state
  if (loading) {
    return (
  <section className="m-5 flex w-full max-w-[1070px] flex-col gap-10">
    {/* Saved Books */}
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-2 h-7 w-[150px] animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-[50px] animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-4 gap-6 max-[1000px]:grid-cols-3 max-[700px]:grid-cols-2">
        {[1, 2, 3].map((item) => (
          <BookCardSkeleton key={item} />
        ))}
      </div>
    </div>

    {/* Finished Books */}
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-2 h-7 w-[100px] animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-[50px] animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-4 gap-6 max-[1000px]:grid-cols-3 max-[700px]:grid-cols-2">
        {[1, 2, 3].map((item) => (
          <BookCardSkeleton key={item} />
        ))}
      </div>
    </div>
  </section>
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
            {savedBooks.length} {savedBooks.length === 1 ? "item" : "items"}
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
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* Finished Books */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-primary mb-2 text-2xl font-semibold">Finished</h2>

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
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
