"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const { cid } = useParams();
  const pathname = usePathname();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          href={`/courses/${cid}/${link === "People" ? "people/table" : link.toLowerCase()}`}
          id={`wd-course-${link.toLowerCase()}-link`}
          className={`list-group-item border-0 ${
            pathname.includes(link.toLowerCase()) ? "active" : "text-danger"
          }`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}