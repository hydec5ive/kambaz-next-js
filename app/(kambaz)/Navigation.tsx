"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KambazNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Account", path: "/account", icon: FaRegCircleUser },
    { label: "Dashboard", path: "/dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/courses", icon: LiaBookSolid },
    { label: "Calendar", path: "/calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/inbox", icon: FaInbox },
    { label: "Labs", path: "/labs", icon: LiaCogSolid },
  ];
  return (
    <div
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" alt="NEU Logo" />
      </a>
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`list-group-item text-center border-0 bg-black text-white ${
            pathname.includes(link.path) ? "bg-white text-danger" : "text-white"
          }`}
        >
          {link.icon({ className: "fs-1 text-danger" })}
          <br />
          {link.label}
        </Link>
      ))}
    </div>
  );
}
