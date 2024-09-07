import { useState } from "react";
import { defaultLetterClass } from "../consts";
import { useCallback } from "react";
import { useEffect } from "react";

function Letter({ letter, ...props }) {
  return (
    <button
      className={`${defaultLetterClass} ${!letter.success && !letter.failed ? 'border-indigo-500 hover:bg-indigo-500' : ''} hover:text-white ${
        letter.success ? "bg-green-500 border-green-500 text-white pointer-events-none" : ""
      } ${letter.failed ? "bg-red-500 border-red-500 hover:bg-red-500 text-white" : ""}`}
      {...props}
    >
      {letter.letter}
    </button>
  );
}

export default Letter;
