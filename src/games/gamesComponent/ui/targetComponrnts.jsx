import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jungleFrame from "../../../assets/gameImages/jungleFrame.jpg"; // Import a jungle-themed frame image

const targetCategories = {
  Articulation: ["Sound Production", "Minimal Pairs", "Word Positions", "Sentence-Level Practice", "Phonological Awareness"],
  Fluency: ["Easy Onset", "Stretching Sounds", "Pausing & Phrasing", "Breathing Techniques"],
  Language: ["Vocabulary Development", "Sentence Building", "Storytelling & Sequencing", "Grammar Skills"],
  "Social Communication": ["Turn-Taking", "Understanding Emotions", "Topic Maintenance", "Perspective-Taking"]
};

const TargetSelectionModal = ({ isOpen, onClose, onSelectTargets }) => {
  const [selectedTargets, setSelectedTargets] = useState({});
  const [activeTab, setActiveTab] = useState(Object.keys(targetCategories)[0]); // Set the first tab as active by default

  const handleCheckboxChange = (category, target) => {
    setSelectedTargets((prev) => {
      const updatedCategory = prev[category] ? [...prev[category]] : [];
      if (updatedCategory.includes(target)) {
        return { ...prev, [category]: updatedCategory.filter((t) => t !== target) };
      } else {
        return { ...prev, [category]: [...updatedCategory, target] };
      }
    });
  };

  const handleSubmit = () => {
    onSelectTargets(selectedTargets);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Jungle-Themed Frame */}
          <div
            className="relative"
            style={{
              backgroundImage: `url(${jungleFrame})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "700px",
              height: "600px", 
              padding: "20px", 
              borderRadius: "15px"
            }}
          >
            {/* Modal Content */}
            <motion.div
              className="bg-green-400 p-6 rounded-lg shadow-lg w-full h-full relative z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ overflow: "hidden" }} // Ensure the modal content doesn't overflow
            >
              <h2 className="text-xl font-bold mb-4 text-green-900">Select Your Targets</h2>

              {/* Tabs for Categories */}
              <div className="flex space-x-4 mb-4 border-b">
                {Object.keys(targetCategories).map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === category
                        ? "border-b-2 border-green-500 text-green-500"
                        : "text-gray-500 hover:text-green-500"
                    }`}
                    onClick={() => setActiveTab(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Targets for Active Tab */}
              <div className="max-h-64 overflow-y-auto pb-16"> {/* Add padding-bottom to avoid overlap with the button */}
                {targetCategories[activeTab].map((target) => (
                  <label key={target} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedTargets[activeTab]?.includes(target) || false}
                      onChange={() => handleCheckboxChange(activeTab, target)}
                    />
                    <span className="text-green-900">{target}</span>
                  </label>
                ))}
              </div>

              {/* Confirm Button */}
              <div className="absolute bottom-4 right-4"> {/* Position the button at the bottom-right */}
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={handleSubmit}
                >
                  Confirm Selection
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TargetSelectionModal;