"use client";

import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (
    <header className="flex h-22 items-center justify-end border-b border-gray-200 px-8">
      <div className="flex h-10 w-full max-w-[340px] items-center rounded-lg border border-gray-300 bg-[#f1f6f4]">
        <input
          type="text"
          placeholder="Search for books"
          className="h-full flex-1 bg-transparent px-4 outline-none"
        />

        <button className="flex h-full w-10 items-center justify-center border-l border-gray-300">
          <FiSearch className="text-primary text-xl" />
        </button>
      </div>
    </header>
  );
}