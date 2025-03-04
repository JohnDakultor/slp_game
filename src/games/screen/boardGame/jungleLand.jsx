// import React, { useState } from "react";
// import board from "../../../assets/gameImages/jungleBoard.jpg";
// import character from "../../../assets/gameImages/rabbitCharacter.png";
// import { motion } from "framer-motion";
// import Roulette from "../../gamesComponent/ui/wheelRoulette";

// const targets = ["Articulation", "Fluency", "Language", "Social Communication"];

// const JungleLand = () => {
//     const [selectedTarget, setSelectedTarget] = useState(null);
//     const [showCard, setShowCard] = useState(true);
//     const [position, setPosition] = useState({ x: 50, y: 50 });
//     const [mustSpin, setMustSpin] = useState(false);
//     const [prizeNumber, setPrizeNumber] = useState(0);
//     const [result, setResult] = useState(null);

//     const selectTarget = (target) => {
//         setSelectedTarget(target);
//         setShowCard(false);
//     };

//     const handleSpinClick = () => {
//         if (!mustSpin) {
//             const newPrizeNumber = Math.floor(Math.random() * 6) + 1;
//             setPrizeNumber(newPrizeNumber);
//             setMustSpin(true);
//         }
//     };

//     return (
//         <div className="relative w-full h-screen flex flex-col items-center justify-center bg-green-500">
//             {showCard ? (
//                 <div className="bg-white p-6 shadow-lg rounded-lg text-center">
//                     <h2 className="text-xl font-bold mb-4">Choose a Target</h2>
//                     <div className="grid grid-cols-2 gap-4">
//                         {targets.map((target) => (
//                             <div
//                                 key={target}
//                                 className="cursor-pointer bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:rotate-y-180"
//                                 onClick={() => selectTarget(target)}
//                             >
//                                 {target}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
//                     {/* Roulette Section positioned on the left with high z-index */}
//                     <div className="absolute left-10 top-1/4 flex flex-col items-center z-50">
//                         <div className="w-25 h-25">
//                             <Roulette
//                                 mustSpin={mustSpin}
//                                 prizeNumber={prizeNumber}
//                                 onStopSpinning={() => {
//                                     setMustSpin(false);
//                                     const steps = prizeNumber * 50;
//                                     setPosition((prev) => ({
//                                         x: prev.x + steps,
//                                         y: prev.y + steps
//                                     }));
//                                     setResult(prizeNumber);
//                                 }}
//                             />
//                         </div>
//                         <button
//                             className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm"
//                             onClick={handleSpinClick}
//                         >
//                             {mustSpin ? "Spinning..." : "Spin"}
//                         </button>
//                         <p className="mt-2 text-sm font-bold">
//                             {result !== null ? `Move ${result} steps` : "Spin the wheel"}
//                         </p>
//                     </div>

//                     {/* Game Board */}
//                     <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
//                         <img
//                             src={board}
//                             alt="Game Board"
//                             className="absolute w-full h-full object-contain"
//                         />
//                         <motion.img
//                             src={character}
//                             alt="Character"
//                             className="absolute w-32 h-32 cursor-grab active:cursor-grabbing"
//                             drag
//                             dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
//                             initial={{ x: position.x, y: position.y }}
//                             animate={{ x: position.x, y: position.y }}
//                         />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default JungleLand;

// import React, { useState, useEffect } from "react";
// import board from "../../../assets/gameImages/jungleBoard.jpg";
// import character from "../../../assets/gameImages/rabbitCharacter.png";
// import { motion, AnimatePresence } from "framer-motion";
// import Roulette from "../../gamesComponent/ui/wheelRoulette";
// import cardBG from "../../../assets/gameImages/cardBG.jpg";
// import backgroundMusic from "../../../assets/gameSounds/SuperAce(backgroundmusic).mp3";
// import TargetSelectionModal from "../../gamesComponent/ui/targetComponrnts";

// const targets = ["Articulation", "Fluency", "Language", "Social Communication"];

// const JungleLand = () => {
//   const [selectedTarget, setSelectedTarget] = useState(null);
//   const [showCard, setShowCard] = useState(true);
//   const [position, setPosition] = useState({ x: 50, y: 50 });
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);
//   const [result, setResult] = useState(null);
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
//   const [isCardFlipped, setIsCardFlipped] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [isCardPressed, setIsCardPressed] = useState(false);
//   const [showRoulette, setShowRoulette] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(true);
//   const [selectedTargets, setSelectedTargets] = useState({});

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth < 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const audio = new Audio(backgroundMusic);
//     audio.loop = true;
//     audio.volume = 0.5;

//     const playAudio = () => {
//       audio.play().catch((error) => console.error("Audio play failed:", error));
//       document.removeEventListener("click", playAudio); // Remove listener after first interaction
//     };

//     document.addEventListener("click", playAudio); // Wait for user interaction

//     return () => {
//       audio.pause();
//       audio.currentTime = 0;
//       document.removeEventListener("click", playAudio);
//     };
//   }, []);

//   const selectTarget = (target) => {
//     setSelectedTarget(target);
//     setShowCard(false);
//   };

//   const handleSelectTargets = (targets) => {
//     setSelectedTargets(targets);
//   };

//   const handleSpinClick = () => {
//     if (!mustSpin) {
//       const newPrizeNumber = Math.floor(Math.random() * 10); // 10 options in the roulette
//       setPrizeNumber(newPrizeNumber);
//       setMustSpin(true); // Start spinning
//       console.log("Prize number set:", newPrizeNumber); // Debugging
//     }
//   };

//   const handleCardClick = () => {
//     setIsCardPressed(true);
//     setTimeout(() => {
//       setIsCardFlipped(true);
//       setTimeout(() => {
//         setShowModal(true);
//       }, 100); // Delay to allow flip animation to complete
//     }, 300); // Delay to allow card to move to center
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setIsCardFlipped(false);
//     setIsCardPressed(false);
//   };

//   const toggleRoulette = () => {
//     setShowRoulette(!showRoulette);
//   };

//   // Debugging: Log the result whenever it changes
//   useEffect(() => {
//     console.log("Result updated:", result);
//   }, [result]);

//   return (
//     <div className="relative w-full h-screen flex flex-col items-center justify-center bg-green-500">
//       {showCard ? (
//         <div className="bg-white p-6 shadow-lg rounded-lg text-center">
//           <h2 className="text-xl font-bold mb-4">Choose a Target</h2>
//           <div className="grid grid-cols-2 gap-4">
//             {targets.map((target) => (
//               <div
//                 key={target}
//                 className="cursor-pointer bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:rotate-y-180"
//                 onClick={() => selectTarget(target)}
//               >
//                 {target}
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
//           {/* Roulette Button and Output Box */}
//           <div className="absolute top-4 left-4 flex items-center gap-4 z-50">
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
//               onClick={toggleRoulette}
//             >
//               Roulette
//             </button>
//             <div className="bg-white p-2 rounded-lg shadow-lg">
//               <p className="text-sm font-bold">
//                 {result !== null ? `Move ${result} steps` : "Spin the wheel"}
//               </p>
//             </div>
//           </div>

//           {/* Roulette Section */}
//          {/* Roulette Section */}
// <AnimatePresence>
//   {showRoulette && (
//     <motion.div
//       className="fixed top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center bg-black bg-opacity-50 z-50"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div
//         className="relative bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0 }}
//       >
//         {/* Close Button */}
//         <button
//           className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded-lg text-sm"
//           onClick={toggleRoulette}
//         >
//           X
//         </button>

//         <div className="w-40 h-40">
//           <Roulette
//             mustSpin={mustSpin}
//             prizeNumber={prizeNumber}
//             onStopSpinning={() => {
//               setMustSpin(false);
//               setResult(prizeNumber + 1);
//             }}
//             handleSpinClick={handleSpinClick}
//           />
//         </div>

//         {/* Close Button Below the Roulette */}
//         <button
//           className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
//           onClick={toggleRoulette}
//         >
//           Close
//         </button>
//       </motion.div>
//     </motion.div>
//   )}
// </AnimatePresence>

//           {/* Game Board */}
//           <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
//             <img
//               src={board}
//               alt="Game Board"
//               className="absolute w-full h-full object-contain"
//             />
//             <motion.img
//               src={character}
//               alt="Character"
//               className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 cursor-grab active:cursor-grabbing"
//               drag
//               dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
//               initial={{ x: position.x, y: position.y }}
//               animate={{ x: position.x, y: position.y }}
//             />

//             {/* Card */}
//             <motion.div
//               className="absolute bottom-3 left-80 z-50"
//               whileHover={{ scale: 1.1, y: -10 }}
//               transition={{ type: "spring", stiffness: 300 }}
//               animate={{
//                 x: isCardPressed ? "calc(50% - 4rem)" : 0, // Adjust for card width
//                 y: isCardPressed ? "calc(50% - 4rem)" : 0, // Adjust for card height
//                 scale: isCardPressed ? 1.5 : 1,
//               }}
//             >
//               <motion.div
//                 className="w-24 h-32 sm:w-32 sm:h-40 cursor-pointer"
//                 style={{
//                   perspective: "1000px",
//                 }}
//                 onClick={handleCardClick}
//               >
//                 <motion.div
//                   className="w-full h-full relative"
//                   style={{
//                     transformStyle: "preserve-3d",
//                     transform: isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
//                   }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   {/* Front of the Card */}
//                   <div
//                     className="absolute w-full h-full bg-cover bg-center rounded-lg shadow-lg"
//                     style={{
//                       backgroundImage: `url(${cardBG})`,
//                       backfaceVisibility: "hidden",
//                     }}
//                   />
//                   {/* Back of the Card */}
//                   <div
//                     className="absolute w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center"
//                     style={{
//                       transform: "rotateY(180deg)",
//                       backfaceVisibility: "hidden",
//                     }}
//                   >
//                     <p className="text-sm font-bold text-center">Click to Flip</p>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           </div>
//         </div>
//       )}

//       {/* Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={closeModal}
//           >
//             <motion.div
//               className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h2 className="text-xl font-bold mb-4">{selectedTarget}</h2>
//               <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
//                 <p className="text-sm text-gray-500">Image Holder</p>
//               </div>
//               <p className="text-sm">
//                 This is the content for {selectedTarget}. Add more details here.
//               </p>
//               <button
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
//                 onClick={closeModal}
//               >
//                 Close
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default JungleLand;

import React, { useState, useEffect } from "react";
import board from "../../../assets/gameImages/jungleBoard2.jpg";
import character from "../../../assets/gameImages/rabbitCharacter.png";
import { motion, AnimatePresence } from "framer-motion";
import Roulette from "../../gamesComponent/ui/wheelRoulette";
import cardBG from "../../../assets/gameImages/cardBG.jpg";
import backgroundMusic from "../../../assets/gameSounds/SuperAce(backgroundmusic).mp3";
import TargetSelectionModal from "../../gamesComponent/ui/targetComponrnts";
import FlipCard from "../../gamesComponent/ui/card"; // Import the FlipCard component

import targetContent from "../../gamesComponent/ui/targetContentKids";


const JungleLand = () => {
  const [position, setPosition] = useState({ x: -100, y: -220 });
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [result, setResult] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCardPressed, setIsCardPressed] = useState(false);
  const [showRoulette, setShowRoulette] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedTargets, setSelectedTargets] = useState({});
  const [targetsSelected, setTargetsSelected] = useState(false); // Track if targets are selected
  const [cardContent, setCardContent] = useState([]); // Store content for the FlipCard

  const [targetQueue, setTargetQueue] = useState([]); // Queue of targets
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0); // Index tracker

  const [currentCategory, setCurrentCategory] = useState(""); // Current category being displayed
  const [currentTarget, setCurrentTarget] = useState(""); // Current target name

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.volume = 0.5;

    const playAudio = () => {
      audio.play().catch((error) => console.error("Audio play failed:", error));
      document.removeEventListener("click", playAudio); // Remove listener after first interaction
    };

    document.addEventListener("click", playAudio); // Wait for user interaction

    return () => {
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener("click", playAudio);
    };
  }, []);

  const handleSelectTargets = (targets) => {
    setSelectedTargets(targets);
    setTargetsSelected(true);
    setIsModalOpen(false);

    const queue = [];

    Object.entries(targets).forEach(([category, selected]) => {
      selected.forEach((target) => {
        if (targetContent[category] && targetContent[category][target]) {
          targetContent[category][target].forEach((output) => {
            queue.push({ category, target, output }); // Store full details
          });
        }
      });
    });

    setTargetQueue(queue);
    setCurrentTargetIndex(0);

    if (queue.length > 0) {
      setCurrentCategory(queue[0].category);
      setCurrentTarget(queue[0].target);
    }
  };

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * 10); // 10 options in the roulette
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true); // Start spinning
      console.log("Prize number set:", newPrizeNumber); // Debugging
    }
  };

  const handleCardClick = () => {
    if (targetQueue.length > 0) {
      const nextIndex = (currentTargetIndex + 1) % targetQueue.length;
      setCurrentTargetIndex(nextIndex);

      const nextTarget = targetQueue[nextIndex];
      setCurrentCategory(nextTarget.category);
      setCurrentTarget(nextTarget.target);
      setCardContent([nextTarget.output]); // Display correct output
    }

    setIsCardPressed(true);
    setTimeout(() => {
      setIsCardFlipped(true);
      setTimeout(() => {
        setShowModal(true);
      }, 100);
    }, 300);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsCardFlipped(false);
    setIsCardPressed(false);
  };

  const toggleRoulette = () => {
    setShowRoulette(!showRoulette);
  };

  // Debugging: Log the result whenever it changes
  useEffect(() => {
    console.log("Result updated:", result);
  }, [result]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-green-500">
      {/* Target Selection Modal */}
      <TargetSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectTargets={handleSelectTargets}
      />

      {/* Render Game Content Only After Targets Are Selected */}
      {targetsSelected && (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Roulette Button and Output Box */}
          <div className="absolute top-4 left-4 flex items-center gap-4 z-50">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
              onClick={toggleRoulette}
            >
              Roulette
            </button>
            <div className="bg-white p-2 rounded-lg shadow-lg">
              <p className="text-sm font-bold">
                {result !== null ? `Move ${result} steps` : "Spin the wheel"}
              </p>
            </div>
          </div>

          {/* Roulette Section */}
          <AnimatePresence>
            {showRoulette && (
              <motion.div
                className="fixed top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center bg-black bg-opacity-50 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="relative bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {/* Close Button */}
                  <button
                    className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded-lg text-sm"
                    onClick={toggleRoulette}
                  >
                    X
                  </button>

                  <div className="w-40 h-40">
                    <Roulette
                      mustSpin={mustSpin}
                      prizeNumber={prizeNumber}
                      onStopSpinning={() => {
                        setMustSpin(false);
                        setResult(prizeNumber + 1);
                      }}
                      handleSpinClick={handleSpinClick}
                    />
                  </div>

                  {/* Close Button Below the Roulette */}
                  <button
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
                    onClick={toggleRoulette}
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

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
              className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 cursor-grab active:cursor-grabbing"
              drag
              dragConstraints={{
                left: -400,
                right: 400,
                top: -400,
                bottom: 400,
              }}
              initial={{ x: position.x, y: position.y }}
              animate={{ x: position.x, y: position.y }}
            />

            {/* Card */}
            <FlipCard
              isFlipped={isCardFlipped}
              isPressed={isCardPressed}
              onClick={handleCardClick}
              frontImage={cardBG}
            />
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-green-500 p-6 rounded-lg shadow-lg w-full max-w-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Updated Title */}
              <h2 className="text-xl font-bold mb-4">
                {currentCategory} - {currentTarget}
              </h2>

              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-sm text-gray-500">Image Holder</p>
              </div>

              {/* Show only one target at a time */}
              <p className="text-sm">{cardContent[0]}</p>

              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={closeModal}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JungleLand;
