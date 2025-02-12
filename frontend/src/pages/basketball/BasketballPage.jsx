import { useState } from "react";
import DateSelector from "../../components/DateSelector";

export default function BasketballPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="w-full p-4">
      <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />
      <div className="mt-4">Matchs du {selectedDate.toLocaleDateString()}</div>
    </div>
  );
}
