// import React, { useState } from "react";
// import { Wheel } from "react-custom-roulette";

// const data = [
//   { option: "1" },
//   { option: "2" },
//   { option: "3" },
//   { option: "4" },
//   { option: "5" },
//   { option: "6" },
//   { option: "7" },
//   { option: "8" },
//   { option: "9" },
//   { option: "10" }
// ];

// export default function Roulette() {
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);
//   const [result, setResult] = useState(null);

//   const handleSpinClick = () => {
//     if (!mustSpin) {
//       const newPrizeNumber = Math.floor(Math.random() * data.length);
//       setPrizeNumber(newPrizeNumber);
//       setMustSpin(true);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <Wheel
//         mustStartSpinning={mustSpin}
//         prizeNumber={prizeNumber}
//         data={data}
//         outerBorderColor="#f2f2f2"
//         outerBorderWidth={10}
//         innerBorderColor="#f2f2f2"
//         radiusLineColor="#dedede"
//         radiusLineWidth={1}
//         fontSize={15}
//         textColors={["#ffffff"]}
//         backgroundColors={[
//           "#F22B35",
//           "#F99533",
//           "#24CA69",
//           "#514E50",
//           "#46AEFF",
//           "#9145B7"
//         ]}
//         onStopSpinning={() => {
//           setMustSpin(false);
//           setResult(data[prizeNumber].option);
//         }}
//       />
//       <button
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
//         onClick={handleSpinClick}
//         disabled={mustSpin}
//       >
//         {mustSpin ? "Spinning..." : "SPIN"}
//       </button>
//       <p className="mt-2 text-lg font-bold">
//         Result: {result !== null ? result : "Spin the wheel"}
//       </p>
//     </div>
//   );
// }
import React from "react";
import { Wheel } from "react-custom-roulette";

const data = [
  { option: "1" },
  { option: "2" },
  { option: "3" },
  { option: "4" },
  { option: "5" },
  { option: "6" },
  { option: "7" },
  { option: "8" },
  { option: "9" },
  { option: "10" }
];

export default function Roulette({ mustSpin, prizeNumber, onStopSpinning, handleSpinClick }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        outerBorderColor="#f2f2f2"
        outerBorderWidth={10}
        innerBorderColor="#f2f2f2"
        radiusLineColor="#dedede"
        radiusLineWidth={1}
        fontSize={15}
        textColors={["#ffffff"]}
        backgroundColors={[
          "#F22B35",
          "#F99533",
          "#24CA69",
          "#514E50",
          "#46AEFF",
          "#9145B7"
        ]}
        onStopSpinning={() => {
          onStopSpinning(); // Notify the parent that spinning has stopped
        }}
      />
      <button
        className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={handleSpinClick}
        disabled={mustSpin} // Disable the button while spinning
      >
        {mustSpin ? "Spinning..." : "Spin"}
      </button>
      
    </div>
  );
}