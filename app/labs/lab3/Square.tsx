import { ReactNode } from "react";

export default function Square({ children }: { children: ReactNode }) {
  const num = Number(children);
  return (
    <div>
      <span id="wd-square">{num * num}</span>
    </div>
  );}