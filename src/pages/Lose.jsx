import { Key } from "lucide-react";
import { KeyRound } from "lucide-react";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import Home from "./Home";

const Lose = ({setStartGame}) => {
  return (
    <div className="h-screen w-screen bg-white">
      <div className="container mx-auto flex justify-center items-center h-screen flex-col">
        <div className="max-w-lg mx-auto flex justify-center items-center h-screen flex-col">
          <div className="flex flex-row gap-2 justify-center items-center">
            <h1 className="text-red-500 sm:text-5xl font-bold text-3xl">
              You Lost! 😔
            </h1>
          </div>
          <CustomButton type="success" onClick={() => setStartGame(false)}>
            Try Again?
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Lose;
