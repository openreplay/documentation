import { FC } from "react";
import React from 'react';

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div className="flex flex-col flex-start">
      <div
        className={`flex items-center bg-neutral-200 text-neutral-900 rounded-2xl px-4 py-2 w-fit`}
        style={{ overflowWrap: "anywhere" }}
      >
        <span className="loading-text">Hang tight, getting your answer right away</span>
      </div>
    </div>
  );
};
