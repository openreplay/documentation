import { FC } from "react";
import React from 'react';


interface Props {
  onReset: () => void;
}

export const ResetChat: FC<Props> = ({ onReset }) => {
  return (
    <div className="flex flex-row items-center">
      <button
        className="text-2xl"
        onClick={() => onReset()}
      >
         ↻ 
      </button>
    </div>
  );
};
;