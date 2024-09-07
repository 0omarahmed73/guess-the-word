import { useState } from "react";
import { letters, words } from "../consts";
import Letter from "../components/Letter";
import WordLetter from "../components/WordLetter";
import { useEffect } from "react";
import CustomButton from "../components/CustomButton";
import { Modal } from "../components/Modal";
import Lose from "./Lose";
import Win from "./Win";

const Home = ({ startGame, youWin, wordsToMap, setWords , score , setNumericScore}) => {
  /* --------States-------- */
  const [youLose , setYouLose] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentWord, setCurrentWord] = useState(
    wordsToMap[Math.trunc(Math.random() * wordsToMap.length)]
  );
  const [letterArray, setLetterArray] = useState(
    currentWord.word.toUpperCase().split("")
  );
  const addedLetters = letterArray.map(() => {
    return letters[Math.trunc(Math.random() * 25)];
  });
  const [bothLettersWithStatus, setBothLettersWithStatus] = useState(
    [...letterArray, ...addedLetters].sort().map((letter, id) => {
      return {
        letter,
        success: false,
        failed: false,
        id: "letter" + id,
      };
    })
  );
  const [chances, setChances] = useState(15);
  
  const [choosenLetters, setChoosenLetters] = useState(
    Array(letterArray.length).fill("_")
  );
  const [next, setNext] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  /* --------Functions-------- */
  const handleLetterClick = (clickedLetter) => {
    if (chances === 0) {
      return;
    }
    resetFailedLetters();
    setChoosenLetters((prevChoosenLetters) => {
      const newChoosenLetters = [...prevChoosenLetters];
      if (currentIndex < letterArray.length) {
        if (clickedLetter.letter === letterArray[currentIndex]) {
          newChoosenLetters[currentIndex] = clickedLetter.letter;
          setCurrentIndex(currentIndex + 1);
          setSuccessLetters(clickedLetter.id);
        } else {
          setChances(chances - 1);
          setFailedLetters(clickedLetter.id);
          setNumericScore((d) => d - 10);
        }
      }
      return newChoosenLetters;
    });
  };
  const resetFailedLetters = () => {
    setBothLettersWithStatus((prevBothLetters) => {
      return prevBothLetters.map((l) => {
        if (l.failed) {
          return { ...l, failed: false };
        }
        return l;
      });
    });
  };
  const removeSuccessLetters = () => {
    setBothLettersWithStatus((prevBothLetters) => {
      return prevBothLetters.filter((l) => !l.success);
    });
  };
  const setSuccessLetters = (lid) => {
    setBothLettersWithStatus((prevBothLetters) => {
      return prevBothLetters.map((l) => {
        if (l.id === lid) {
          return { ...l, success: true, disabled: true };
        }
        return l;
      });
    });
    return;
  };
  const setFailedLetters = (lid) => {
    setBothLettersWithStatus((prevBothLetters) => {
      return prevBothLetters.map((l) => {
        if (l.id === lid) {
          return { ...l, failed: true };
        }
        return l;
      });
    });
  };
  const setScore = () => {
    if (choosenLetters.join("") === currentWord.word.toUpperCase()) {
      setNext(true);
      setNumericScore(score + 100);
    }
  };
  const nextWord = () => {
    setLoading(true);
    removeSuccessLetters();
    setCurrentIndex(0);
    setNext(false);
    setChances(5);

    // Update the word list, removing the current word
    const filteredWords = wordsToMap.filter(
      (word) => word.word !== currentWord.word
    );
    setWords(filteredWords);
  };

  const initilize = () => {
    // Set initial chosen letters and pick a random word
    if (wordsToMap.length > 0) {
      const randomWord =
        wordsToMap[Math.trunc(Math.random() * wordsToMap.length)];
      setCurrentWord(randomWord);
    }
  };
  useEffect(() => {
    // When currentWord changes, initialize the letter array and both letters with status
    if (currentWord.word) {
      const letterArray = currentWord.word.toUpperCase().split("");
      setLetterArray(letterArray);
      setChoosenLetters(Array(currentWord.word.length).fill("_"));
      const addedLetters = letterArray.map(() => {
        return letters[Math.trunc(Math.random() * 25)];
      });

      setBothLettersWithStatus(
        [...letterArray, ...addedLetters].sort().map((letter, id) => {
          return {
            letter,
            success: false,
            failed: false,
            id: "letter" + id,
          };
        })
      );
    }
  }, [currentWord]);

  /* --------Effects-------- */
  useEffect(() => {
    // Initialize the game when wordsToMap is updated
    initilize();
  }, [wordsToMap]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    setScore();
  }, [choosenLetters]);
  useEffect(() => {
    if (wordsToMap.length === 0 && score > 0) {
      youWin(true);
    }
    else if (score < 0) {
      setYouLose(true);
    }
  }, [wordsToMap]);
  if (loading) {
    return (
      <div className="container m-auto flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  } else if (chances === 0 || youLose) {
    return <Lose setStartGame={startGame} />;
  } else {
    return (
      <div className="container mx-auto">
        <div className="max-w-lg bg-white rounded-lg m-auto flex flex-col justify-center items-center gap-3 min-h-screen px-7">
          <div className="chances w-full flex flex-row justify-between mb-5">
            <p className="text-end font-bold">Chances Left: {chances}</p>
            <p className="text-end font-bold">Score: {score}</p>
          </div>
          <div className="chances w-full">
            <p className="text-center">
              <strong>Hint: </strong>
              {currentWord.hint}
            </p>
          </div>
          <div className="max-w-xl">
            <div className="word flex flex-row flex-wrap gap-3 justify-center w-full my-3">
              {choosenLetters.map((letter, index) => (
                <WordLetter key={index} letter={letter} />
              ))}
            </div>
          </div>
          <div className="max-w-xl">
            <div className="letters flex flex-row flex-wrap gap-3 justify-center w-full">
              {bothLettersWithStatus.map((letter, index) => (
                <Letter
                  key={index}
                  letter={letter}
                  onClick={() => handleLetterClick(letter)} // Pass a function, not a direct invocation
                />
              ))}
            </div>
          </div>
          <div className="chances w-full flex flex-row justify-center mt-5 gap-5">
            <CustomButton type="error" onClick={() => setIsOpen(true)}>
              End Game!
            </CustomButton>
            <CustomButton
              type={`${next ? "success" : "disabled"}`}
              disabled={!next}
              onClick={nextWord}
            >
              Next
            </CustomButton>
          </div>
        </div>
        <Modal setIsOpen={setIsOpen} isOpen={isOpen} />
      </div>
    );
  }
};

export default Home;
