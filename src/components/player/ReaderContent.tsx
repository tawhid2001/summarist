"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type ReaderContentProps = {
  summary: string;
};

export default function ReaderContent({
  summary,
}: ReaderContentProps) {
  const fontSize = useSelector(
    (state: RootState) => state.reader.fontSize
  );

  return (
    <div
      className="text-primary whitespace-pre-line leading-[1.7]"
      style={{
        fontSize: `${fontSize}px`,
      }}
    >
      {summary}
    </div>
  );
}