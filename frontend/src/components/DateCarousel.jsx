import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import {
  format,
  subWeeks,
  addWeeks,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay,
} from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DateCarousel({
  selectedDate,
  onChange,
  onMonthChange,
  onWeekChange,
}) {
  const [currentWeek, setCurrentWeek] = useState(selectedDate);

  const start = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const end = endOfWeek(start, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start, end });

  const prevWeek = () => {
    const newWeek = subWeeks(currentWeek, 1);
    setCurrentWeek(newWeek);
    onMonthChange(newWeek); // Met à jour le mois
  };
  const nextWeek = () => {
    const newWeek = addWeeks(currentWeek, 1);
    setCurrentWeek(newWeek);
    onMonthChange(newWeek); // Met à jour le mois
  };

  // Lorsque la date sélectionnée change, déplace le carousel à la semaine correspondante
  useEffect(() => {
    const newStartOfWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
    setCurrentWeek(newStartOfWeek); // Met à jour la semaine sélectionnée
    onMonthChange(newStartOfWeek); // Met également à jour le mois affiché
  }, [selectedDate, onMonthChange]);

  return (
    <div className="flex items-center justify-center p-4 w-full max-w-2xl mx-auto">
      <button onClick={prevWeek} className="p-2 rounded-full hover:bg-gray-200">
        <ChevronLeft size={24} />
      </button>
      <div className="flex space-x-2 mx-4">
        {weekDays.map((day) => (
          <button
            key={day}
            onClick={() => {
              onChange(day); // Change la date sélectionnée
              onWeekChange(day); // Change la semaine en conséquence
            }}
            className={`px-3 py-2 rounded-md font-medium text-sm transition-colors 
                ${
                  isSameDay(day, selectedDate)
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
          >
            {format(day, "EEE dd", { locale: fr })}
          </button>
        ))}
      </div>
      <button onClick={nextWeek} className="p-2 rounded-full hover:bg-gray-200">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

DateCarousel.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onWeekChange: PropTypes.func.isRequired, // Ajout de cette prop
};
