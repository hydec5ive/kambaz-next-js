"use client";
import { ReactNode, useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setCourses } from "../../courses/reducer";
import { setEnrollments } from "../../enrollments/reducer";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import * as client from "../client";
export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [showNav, setShowNav] = useState(true);
  const fetchData = useCallback(async () => {
    if (courses.length === 0) {
      const coursesData = await client.fetchAllCourses();
      dispatch(setCourses(coursesData));
    }
    if (enrollments.length === 0) {
      const enrollmentsData = await client.findAllEnrollments();
      dispatch(setEnrollments(enrollmentsData));
    }
  }, [courses.length, enrollments.length, dispatch]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const isEnrolled = enrollments.some(
    (enrollment: any) => enrollment.user === (currentUser as any)?._id && enrollment.course === cid
  );
  useEffect(() => {
    if (currentUser && enrollments.length > 0 && !isEnrolled) {
      router.push("/dashboard");
    }
  }, [currentUser, isEnrolled, enrollments.length, router]);
  if (!course) {
    return <div>Loading...</div>;
  }
  if (currentUser && enrollments.length > 0 && !isEnrolled) {
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
  );
}