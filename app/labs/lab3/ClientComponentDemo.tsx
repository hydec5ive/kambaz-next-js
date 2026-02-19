"use client";
import { usePathname } from "next/navigation";

export default function ClientComponentDemo() {
  const pathname = usePathname();

  return (
    <div>
      <h4>Client Component Demo</h4>
      <p>Current pathname: {pathname}</p>
      <hr />
    </div>
  );
}