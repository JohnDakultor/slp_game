
import React from "react";
import { motion } from "framer-motion";

const FlipCard = ({ isFlipped, isPressed, onClick, frontImage, backContent }) => {
  return (
    <motion.div
      className="absolute bottom-3 left-80 z-50"
      whileHover={{ scale: 1.1, y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      animate={{
        x: isPressed ? "calc(50% - 4rem)" : 0, // Adjust for card width
        y: isPressed ? "calc(50% - 4rem)" : 0, // Adjust for card height
        scale: isPressed ? 1.5 : 1,
      }}
    >
      <motion.div
        className="w-24 h-32 sm:w-32 sm:h-40 cursor-pointer"
        style={{
          perspective: "1000px",
        }}
        onClick={onClick}
      >
        <motion.div
          className="w-full h-full relative"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Front of the Card */}
          <div
            className="absolute w-full h-full bg-cover bg-center rounded-lg shadow-lg"
            style={{
              backgroundImage: `url(${frontImage})`,
              backfaceVisibility: "hidden",
            }}
          />
          {/* Back of the Card */}
          <div
            className="absolute w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            {backContent}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;