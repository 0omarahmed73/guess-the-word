import { Key } from "lucide-react";
import { KeyRound } from "lucide-react";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import Home from "./Home";

const Win = ({ setStartGame, score }) => {
  return (
    <div className="h-screen w-screen bg-white">
      <div className="container mx-auto flex justify-center items-center h-screen flex-col">
        <div className="max-w-lg mx-auto flex justify-center items-center h-screen flex-col">
          <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="text-green-500 text-center sm:text-5xl font-bold text-3xl">
              Congratulations You Won! 🎉
            </h1>
            <p className="text-green-500 text-center sm:text-2xl font-bold">
              Your Score is {score}
            </p>
          </div>
          <CustomButton type="success" onClick={() => setStartGame(false)}>
            Try Again?
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Win;
