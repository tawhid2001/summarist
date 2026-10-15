"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import {
  FaPause,
  FaPlay,
  FaRotateLeft,
  FaRotateRight,
} from "react-icons/fa6";

import { db } from "@/firebase/firebase";
import { RootState } from "@/redux/store";
import { Book } from "@/types/book";

type AudioPlayerProps = {
  book: Book;
};

export default function AudioPlayer({
  book,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(
    null
  );

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  function formatTime(time: number) {
    if (!Number.isFinite(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  function syncDuration() {
    const audio = audioRef.current;

    if (!audio) return;

    const audioDuration = audio.duration;

    if (
      Number.isFinite(audioDuration) &&
      audioDuration > 0
    ) {
      setDuration(audioDuration);
    }
  }

  async function togglePlay() {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error(
          "Audio playback failed:",
          error
        );
      }
    } else {
      audio.pause();
    }
  }

  function skipBackward() {
    const audio = audioRef.current;

    if (!audio) return;

    const newTime = Math.max(
      0,
      audio.currentTime - 10
    );

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function skipForward() {
    const audio = audioRef.current;

    if (!audio) return;

    const audioDuration =
      Number.isFinite(audio.duration) &&
      audio.duration > 0
        ? audio.duration
        : duration;

    if (audioDuration <= 0) return;

    const newTime = Math.min(
      audioDuration,
      audio.currentTime + 10
    );

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function handleSeek(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const audio = audioRef.current;

    if (!audio) return;

    const newTime = Number(
      event.target.value
    );

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }

  async function markBookAsFinished() {
    if (!user) return;

    try {
      const finishedBookRef = doc(
        db,
        "users",
        user.uid,
        "finished",
        book.id
      );

      await setDoc(
        finishedBookRef,
        {
          ...book,
          finishedAt: serverTimestamp(),
        },
        {
          merge: true,
        }
      );
    } catch (error) {
      console.error(
        "Failed to mark book as finished:",
        error
      );
    }
  }

  async function handleAudioEnded() {
    setIsPlaying(false);
    setCurrentTime(0);

    await markBookAsFinished();
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={book.audioLink}
        preload="metadata"
        onLoadedMetadata={syncDuration}
        onDurationChange={syncDuration}
        onCanPlay={syncDuration}
        onTimeUpdate={() => {
          const audio = audioRef.current;

          if (!audio) return;

          setCurrentTime(audio.currentTime);

          if (
            duration === 0 &&
            Number.isFinite(audio.duration) &&
            audio.duration > 0
          ) {
            setDuration(audio.duration);
          }
        }}
        onPlay={() => {
          setIsPlaying(true);
          syncDuration();
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
        onEnded={handleAudioEnded}
      />

      <div className="bg-primary fixed right-0 bottom-0 left-0 z-[100] h-auto p-4 text-white">
        <div className="flex h-full flex-col items-center justify-center gap-4 px-10 max-[768px]:px-4 md:flex-row">
          {/* Book information */}
          <div className="flex w-[320px] shrink-0 items-center gap-4 max-[900px]:w-[240px]">
            <Image
              src={book.imageLink}
              alt={book.title}
              width={50}
              height={65}
              className="h-[60px] w-auto"
            />

            <div className="min-w-0">
              <p className="truncate font-semibold">
                {book.title}
              </p>

              <p className="truncate text-sm text-gray-300">
                {book.author}
              </p>
            </div>
          </div>

          {/* Audio controls */}
          <div className="flex shrink-0 items-center justify-center gap-7 max-[768px]:gap-5">
            <button
              type="button"
              onClick={skipBackward}
              aria-label="Skip backward 10 seconds"
              className="relative text-2xl"
            >
              <FaRotateLeft />

              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">
                10
              </span>
            </button>

            <button
              type="button"
              onClick={togglePlay}
              aria-label={
                isPlaying ? "Pause" : "Play"
              }
              className="text-primary flex h-12 w-12 items-center justify-center rounded-full bg-white"
            >
              {isPlaying ? (
                <FaPause />
              ) : (
                <FaPlay className="ml-1" />
              )}
            </button>

            <button
              type="button"
              onClick={skipForward}
              aria-label="Skip forward 10 seconds"
              className="relative text-2xl"
            >
              <FaRotateRight />

              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">
                10
              </span>
            </button>
          </div>

          {/* Progress */}
          <div className="mx-auto flex w-full min-w-0 flex-1 items-center justify-center gap-4">
            <span className="w-[42px] shrink-0 text-right text-sm">
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              min={0}
              max={duration > 0 ? duration : 1}
              step={0.1}
              value={
                duration > 0
                  ? Math.min(
                      currentTime,
                      duration
                    )
                  : 0
              }
              onChange={handleSeek}
              disabled={duration === 0}
              aria-label="Audio progress"
              className="w-full max-w-[500px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 max-[1100px]:max-w-[350px]"
            />

            <span className="w-[42px] shrink-0 text-sm">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}