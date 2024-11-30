import { useEffect, useRef, useState } from "react";
import ProgressBar from './components/ProgressBar';
import './App.css'

const totalMs = 15 * 1000;
const interval = 1 * 1000;
const totalCycles = totalMs / interval;
const progressMade = (interval / totalMs) * 100;

function App() {
  const [progress, setProgress] = useState(0);
  const timer = useRef(0);
  const cyclesCompleted = useRef(0);
  useEffect(() => {
    timer.current = setInterval(() => {
      setProgress((prevProgress) => prevProgress + progressMade);
      cyclesCompleted.current += 1;
      if (cyclesCompleted.current === totalCycles) clearInterval(timer.current);
    }, interval);

    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <>
    <h1>Progress Bar</h1>
    <ProgressBar progress={progress} />
    </>
  );
}

export default App
