import { Key } from "lucide-react";
import { KeyRound } from "lucide-react";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import Home from "./Home";
import Win from "./Win";
import { words } from "../consts";
import { useEffect } from "react";

const PreHome = () => {
  const [score, setNumericScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [youWin, setYouWin] = useState(false);
  const [wordsToMap, setWords] = useState(words);
  console.log(startGame);
  useEffect(() => {
    setWords(words);
  }, [youWin, startGame]);
  if (!startGame) {
    return (
      <div className="h-screen w-screen bg-white">
        <div className="container mx-auto flex justify-center items-center h-screen flex-col">
          <div className="max-w-lg mx-auto flex justify-center items-center h-screen flex-col">
            <div className="flex flex-row gap-2 justify-center items-center">
              <h1 className="text-black sm:text-5xl font-bold text-3xl">
                Quess The Word!
              </h1>
              <Key color="#000" strokeWidth={2} size={42} />
            </div>
            <CustomButton
              type="start"
              onClick={() => {
                setStartGame(true);
                setYouWin(false);
              }}
            >
              Start
            </CustomButton>
          </div>
        </div>
      </div>
    );
  } else if (youWin) {
    return <Win setStartGame={setStartGame} score={score} />;
  } else if (!youWin) {
    return (
      <Home
        score={score}
        setNumericScore={setNumericScore}
        startGame={setStartGame}
        setWords={setWords}
        wordsToMap={wordsToMap}
        youWin={setYouWin}
      />
    );
  }
};

export default PreHome;
