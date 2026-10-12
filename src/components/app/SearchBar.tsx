"use client";

import { FiMenu, FiSearch } from "react-icons/fi";

type SearchBarProps = {
  onMenuClick: () => void;
};

export default function SearchBar({ onMenuClick }: SearchBarProps) {
  return (
    <header className="sticky top-0 z-40  bg-white flex gap-4 h-22 items-center justify-end border-b border-gray-200 px-8">
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
