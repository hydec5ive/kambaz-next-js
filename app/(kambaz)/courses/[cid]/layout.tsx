"use client";
import { ReactNode, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import { useEffect } from "react";
export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [showNav, setShowNav] = useState(true);
  const isEnrolled = enrollments.some(
    (enrollment: any) => enrollment.user === (currentUser as any)?._id && enrollment.course === cid
  );
  useEffect(() => {
    if (currentUser && !isEnrolled) {
      router.push("/dashboard");
    }
  }, [currentUser, isEnrolled, router]);
  if (currentUser && !isEnrolled) {
    return null;
  }
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" style={{ cursor: "pointer" }}
          onClick={() => setShowNav(!showNav)} />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        {showNav && (
          <div className="d-none d-md-block">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
);}