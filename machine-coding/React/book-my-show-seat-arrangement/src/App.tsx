import SeatSelector from './components/seatSelector';
import './App.css';

type SeatStatus = "sold" | "available" | "empty";

interface Seat {
  id: string;
  status: SeatStatus;
}

interface Row {
  id: string;
  seats: Seat[];
}

const seatData: Row[] = [
  {
    id: "A",
    seats: [
      { id: "A1", status: "available" },
      { id: "A2", status: "sold" },
      { id: "A3", status: "available" },
      { id: "A4", status: "available" },
      { id: "A5", status: "available" },
      { id: "A6", status: "available" },
      { id: "A7", status: "sold" },
      { id: "A8", status: "available" },
      { id: "A9", status: "available" },
      { id: "A10", status: "sold" },
    ],
  },
  {
    id: "B",
    seats: [
      { id: "B1", status: "available" },
      { id: "B2", status: "available" },
      { id: "B3", status: "sold" },
      { id: "B4", status: "available" },
      { id: "B5", status: "empty" },
      { id: "B6", status: "sold" },
      { id: "B7", status: "sold" },
      { id: "B8", status: "available" },
      { id: "B9", status: "sold" },
      { id: "B10", status: "available" },
    ],
  },
  {
    id: "C",
    seats: [
      { id: "C1", status: "empty" },
      { id: "C2", status: "empty" },
      { id: "C3", status: "empty" },
      { id: "C4", status: "empty" },
      { id: "C5", status: "empty" },
      { id: "C6", status: "available" },
      { id: "C7", status: "sold" },
      { id: "C8", status: "sold" },
      { id: "C9", status: "available" },
      { id: "C10", status: "sold" },
    ],
  },
  {
    id: "D",
    seats: [
      { id: "D1", status: "available" },
      { id: "D2", status: "sold" },
      { id: "D3", status: "available" },
      { id: "D4", status: "sold" },
      { id: "D5", status: "empty" },
      { id: "D6", status: "available" },
      { id: "D7", status: "available" },
      { id: "D8", status: "available" },
      { id: "D9", status: "sold" },
      { id: "D10", status: "available" },
    ],
  },
  {
    id: "E",
    seats: [
      { id: "E1", status: "sold" },
      { id: "E2", status: "available" },
      { id: "E3", status: "available" },
      { id: "E4", status: "sold" },
      { id: "E5", status: "empty" },
      { id: "E6", status: "available" },
      { id: "E7", status: "sold" },
      { id: "E8", status: "available" },
      { id: "E9", status: "available" },
      { id: "E10", status: "sold" },
    ],
  },
];


function App() {

  const handleSeatSelection = (selectedSeats: string[]) => {
    console.log("Selected Seats:", selectedSeats);
  };

  return (
    <>
     <h2>Book Your Seats</h2>
     <SeatSelector rows={seatData} onSeatSelect={handleSeatSelection} />
    </>
  )
}

export default App
