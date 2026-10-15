"use client";

import { useEffect, useState } from "react";

type DurationState = {
  audioLink: string;
  duration: number;
};

export default function useAudioDuration(
  audioLink: string
) {
  const [durationState, setDurationState] =
    useState<DurationState>({
      audioLink: "",
      duration: 0,
    });

  useEffect(() => {
    if (!audioLink) return;

    const audio = new Audio(audioLink);

    function handleLoadedMetadata() {
      if (
        Number.isFinite(audio.duration) &&
        audio.duration > 0
      ) {
        setDurationState({
          audioLink,
          duration: audio.duration,
        });
      }
    }

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    return () => {
      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.src = "";
    };
  }, [audioLink]);

  if (
    !audioLink ||
    durationState.audioLink !== audioLink
  ) {
    return 0;
  }

  return durationState.duration;
}