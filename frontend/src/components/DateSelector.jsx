import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";

export default function DateSelector({ selectedDate, onChange, displayMonth }) {
  const [showPicker, setShowPicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(displayMonth);

  // 🔥 Met à jour `currentMonth` à chaque changement de `displayMonth`
  useEffect(() => {
    setCurrentMonth(displayMonth);
  }, [displayMonth]);

  return (
    <div className="w-full text-white flex justify-between items-center p-4 relative">
      {/* Date Picker Bouton */}
      <div className="relative">
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg"
          onClick={() => setShowPicker(!showPicker)}
        >
          <span className="text-lg font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <ChevronDown size={20} />
        </button>
        {showPicker && (
          <div className="absolute top-12 left-0 bg-white dark:bg-gray-300 dark:text-black shadow-lg rounded-lg p-2 z-50">
            <DayPicker
              mode="single"
              selected={selectedDate}
              month={currentMonth} // 👈 Toujours synchronisé avec `displayMonth`
              onMonthChange={setCurrentMonth} // Permet de changer manuellement
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
    </div>
  );
}

DateSelector.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  displayMonth: PropTypes.instanceOf(Date).isRequired,
};
