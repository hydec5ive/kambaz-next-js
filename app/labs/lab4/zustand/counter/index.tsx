"use client";
import { useCounterStore } from "./store";
export default function ZustandCounter() {
  const { count, increase, decrease, setCount, reset } = useCounterStore((state) => state);
  return (
    <div id="wd-zustand-counter">
      <h2>Zustand Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => increase(1)} className="btn btn-primary me-2">Increase</button>
      <button onClick={() => decrease(1)} className="btn btn-secondary me-2">Decrease</button>
      <button onClick={() => setCount(10)} className="btn btn-warning me-2">Set to 10</button>
      <button onClick={() => reset()} className="btn btn-danger">Reset</button>
      <hr />
    </div>
);}