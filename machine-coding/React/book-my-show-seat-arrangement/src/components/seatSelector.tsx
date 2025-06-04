import React, { useState } from "react";
import "./seatSelector.css";

type SeatStatus = "sold" | "available" | "empty";

interface Seat {
  id: string;
  status: SeatStatus;
}

interface Row {
  id: string;
  seats: Seat[];
}

interface SeatMapProps {
  rows: Row[];
  onSeatSelect: (selectedSeats: string[]) => void;
}

const SeatSelector: React.FC<SeatMapProps> = ({ rows, onSeatSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeatSelection = (seat: Seat) => {
    if (seat.status === "sold" || seat.status === "empty") return;

    const updatedSeats = selectedSeats.includes(seat.id)
      ? selectedSeats.filter((s) => s !== seat.id)
      : [...selectedSeats, seat.id];

    setSelectedSeats(updatedSeats);
    onSeatSelect(updatedSeats);
  };

  return (
    <div className="seat-grid">
      {rows.map((row) => (
        <div key={row.id} className="seat-row">
          <span className="row-label">{row.id}</span>
          {row.seats.map((seat) => (
            <button
              key={seat.id}
              className={`seat ${seat.status} ${selectedSeats.includes(seat.id) ? "selected" : ""}`}
              onClick={() => toggleSeatSelection(seat)}
              disabled={seat.status === "sold"}
              aria-label={`Seat ${seat.id}, ${seat.status}`}
            >
              {seat.status !== "empty" ? seat.id : ""}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatSelector;
