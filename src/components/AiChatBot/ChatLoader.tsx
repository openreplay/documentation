import { FC } from "react";
import React from 'react';

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div className="flex flex-col flex-start">
      <div
        className={`flex items-center bg-gradient-to-r from-teal-50 bg-indgo-50 text-neutral-900 rounded-xl px-4 py-2 w-fit`}
        style={{ overflowWrap: "anywhere" }}
      >
        <span className="loading-text flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/><animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur=".75s" repeatCount="indefinite"/></svg>
        Hang tight, getting your answer right away...</span>
      </div>
    </div>
  );
};
