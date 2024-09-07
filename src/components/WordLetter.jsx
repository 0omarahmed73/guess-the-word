import { defaultLetterClass } from "../consts";

function WordLetter({ letter, ...props }) {
  return (
    <button
      className={`${defaultLetterClass} border-black hover:bg-black hover:text-white dark:border-white`}
      {...props}
    >
      {letter}
    </button>
  );
}

export default WordLetter;
