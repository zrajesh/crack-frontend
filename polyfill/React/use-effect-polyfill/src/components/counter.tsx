import { useState } from "react";
import useCustomEffect from "../hooks/use-custom-effect";

function Counter() {
  const [count, setCount] = useState(0);

  useCustomEffect(() => {
    console.log("EFFECT TRIGGERED: ", count);
    return () => {
      console.log("CLEANUP");
    }
  }, [count])

  console.log("RENDERED");
  

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default Counter;
