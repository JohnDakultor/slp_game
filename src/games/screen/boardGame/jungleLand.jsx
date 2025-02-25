import React, { useState } from "react";
import board from "../../../assets/gameImages/jungleBoard.jpg";
import character from "../../../assets/gameImages/rabbitCharacter.png";
import { motion } from "framer-motion";
import Roulette from "../../gamesComponent/ui/wheelRoulette";

const targets = ["Articulation", "Fluency", "Language", "Social Communication"];

const JungleLand = () => {
    const [selectedTarget, setSelectedTarget] = useState(null);
    const [showCard, setShowCard] = useState(true);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [result, setResult] = useState(null);

    const selectTarget = (target) => {
        setSelectedTarget(target);
        setShowCard(false);
    };

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * 6) + 1;
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center bg-green-500">
            {showCard ? (
                <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                    <h2 className="text-xl font-bold mb-4">Choose a Target</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {targets.map((target) => (
                            <div
                                key={target}
                                className="cursor-pointer bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:rotate-y-180"
                                onClick={() => selectTarget(target)}
                            >
                                {target}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    {/* Roulette Section positioned on the left with high z-index */}
                    <div className="absolute left-10 top-1/4 flex flex-col items-center z-50">
                        <div className="w-25 h-25">
                            <Roulette
                                mustSpin={mustSpin}
                                prizeNumber={prizeNumber}
                                onStopSpinning={() => {
                                    setMustSpin(false);
                                    const steps = prizeNumber * 50;
                                    setPosition((prev) => ({
                                        x: prev.x + steps,
                                        y: prev.y + steps
                                    }));
                                    setResult(prizeNumber);
                                }}
                            />
                        </div>
                        <button
                            className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm"
                            onClick={handleSpinClick}
                        >
                            {mustSpin ? "Spinning..." : "Spin"}
                        </button>
                        <p className="mt-2 text-sm font-bold">
                            {result !== null ? `Move ${result} steps` : "Spin the wheel"}
                        </p>
                    </div>

                    {/* Game Board */}
                    <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
                        <img 
                            src={board} 
                            alt="Game Board" 
                            className="absolute w-full h-full object-contain"
                        />
                        <motion.img 
                            src={character} 
                            alt="Character" 
                            className="absolute w-32 h-32 cursor-grab active:cursor-grabbing"
                            drag
                            dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
                            initial={{ x: position.x, y: position.y }}
                            animate={{ x: position.x, y: position.y }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default JungleLand;
