"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { FiMenu, FiSearch } from "react-icons/fi";

import { Book } from "@/types/book";
import { searchBooks } from "@/services/books";

type SearchBarProps = {
  onMenuClick: () => void;
};

export default function SearchBar({ onMenuClick }: SearchBarProps) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search.trim()) return;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const books = await searchBooks(search);

        setResults(books);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <header className="sticky top-0 z-40 flex h-22 items-center justify-end gap-4 border-b border-gray-200 bg-white px-8">
      <div className="relative w-full max-w-[340px]">
        {/* Search input */}
        <div className="flex h-10 w-full items-center rounded-lg border border-gray-300 bg-[#f1f6f4]">
          <input
            type="text"
            value={search}
            onChange={(event) => {
              const value = event.target.value;

              setSearch(value);

              if (!value.trim()) {
                setResults([]);
                setLoading(false);
              }
            }}
            placeholder="Search for books"
            className="h-full min-w-0 flex-1 bg-transparent px-4 outline-none"
          />

          <button
            type="button"
            aria-label="Search"
            className="flex h-full w-10 shrink-0 items-center justify-center border-l border-gray-300"
          >
            <FiSearch className="text-primary text-xl" />
          </button>
        </div>

        {/* Search dropdown */}
        {search.trim() && (
          <div className="absolute top-[46px] right-0 z-50 max-h-[400px] w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
            {loading ? (
              <div className="space-y-3 p-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="flex animate-pulse gap-3">
                    <div className="h-[65px] w-[45px] shrink-0 rounded bg-gray-200" />

                    <div className="flex flex-1 flex-col justify-center gap-2">
                      <div className="h-4 w-3/4 rounded bg-gray-200" />
                      <div className="h-3 w-1/2 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              results.map((book) => (
                <Link
                  key={book.id}
                  href={`/book/${book.id}`}
                  onClick={() => {
                    setSearch("");
                    setResults([]);
                  }}
                  className="flex gap-3 border-b border-gray-100 p-3 hover:bg-gray-50"
                >
                  <Image
                    src={book.imageLink}
                    alt={book.title}
                    width={45}
                    height={65}
                    className="h-[65px] w-[45px] shrink-0 object-cover"
                  />

                  <div className="min-w-0">
                    <p className="text-primary truncate font-semibold">
                      {book.title}
                    </p>

                    <p className="text-secondary-text truncate text-sm">
                      {book.author}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="p-4 text-sm text-gray-500">No books found</p>
            )}
          </div>
        )}
      </div>

      {/* Mobile burger */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="text-primary text-2xl md:hidden"
      >
        <FiMenu />
      </button>
    </header>
  );
}
