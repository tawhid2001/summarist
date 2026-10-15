"use client";

import { useEffect, useState } from "react";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { CiBookmark } from "react-icons/ci";
import { BsBookmarkFill } from "react-icons/bs";

import { db } from "@/firebase/firebase";
import { RootState } from "@/redux/store";
import { openAuthModal } from "@/redux/features/authModalSlice";
import { Book } from "@/types/book";

type LibraryButtonProps = {
  book: Book;
};

export default function LibraryButton({
  book,
}: LibraryButtonProps) {
  const dispatch = useDispatch();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkLibrary() {
      if (!user) {
        setIsSaved(false);
        return;
      }

      try {
        const bookRef = doc(
          db,
          "users",
          user.uid,
          "library",
          book.id
        );

        const snapshot = await getDoc(bookRef);

        setIsSaved(snapshot.exists());
      } catch (error) {
        console.error(
          "Failed to check library status:",
          error
        );
      }
    }

    checkLibrary();
  }, [user, book.id]);

  async function handleLibrary() {
    if (!user) {
      dispatch(openAuthModal());
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      const bookRef = doc(
        db,
        "users",
        user.uid,
        "library",
        book.id
      );

      if (isSaved) {
        await deleteDoc(bookRef);
        setIsSaved(false);
      } else {
        await setDoc(bookRef, {
          ...book,
          savedAt: serverTimestamp(),
        });

        setIsSaved(true);
      }
    } catch (error) {
      console.error(
        "Failed to update library:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLibrary}
      disabled={loading}
      className="mb-10 flex items-center gap-3 text-[#0645ad] disabled:cursor-not-allowed"
    >
      {isSaved ? (
        <BsBookmarkFill className="text-xl text-[#0645ad]" />
      ) : (
        <CiBookmark className="text-2xl text-[#0645ad]" />
      )}

      <span className="text-xl font-medium">
        {isSaved
          ? "Saved in My Library"
          : "Add title to My Library"}
      </span>
    </button>
  );
}