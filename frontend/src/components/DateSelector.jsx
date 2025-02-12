import PropTypes from "prop-types";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { format } from "date-fns";

export default function DateSelector({ selectedDate, onChange }) {
  const [showPicker, setShowPicker] = useState(false);

  const handlePrevDay = () => {
    onChange(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
  };

  const handleNextDay = () => {
    onChange(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
  };

  return (
    <div className="w-full bg-gray-900 text-white flex justify-between items-center p-4 relative shadow-md">
      {/* Date Picker Bouton */}
      <div className="relative">
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg"
          onClick={() => setShowPicker(!showPicker)}
        >
          <span className="text-lg font-semibold">
            {format(selectedDate, "MMMM yyyy")}
          </span>
          <ChevronDown size={20} />
        </button>
        {showPicker && (
          <div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg p-2 z-50">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  onChange(date);
                  setShowPicker(false);
                }
              }}
            />
          </div>
        )}
      </div>

      {/* Navigation par jour */}
      <div className="flex items-center space-x-4">
        <button onClick={handlePrevDay} className="p-2 bg-gray-800 rounded-lg">
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-semibold">
          {format(selectedDate, "dd MMM yyyy")}
        </span>
        <button onClick={handleNextDay} className="p-2 bg-gray-800 rounded-lg">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

DateSelector.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
