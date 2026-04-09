"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { setEnrollments } from "../enrollments/reducer";
import { RootState } from "../store";
import Link from "next/link";
import { Card, CardBody, CardTitle, CardText, CardImg, Row, Col, FormControl, Button } from "react-bootstrap";
import * as courseClient from "../courses/client";
export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpeg",
    description: "New Description",
  });
  const [showAllCourses, setShowAllCourses] = useState(false);
  const isFaculty = currentUser && (currentUser as any).role === "FACULTY";
  const fetchCourses = useCallback(async () => {
    try {
      const coursesData = await courseClient.fetchAllCourses();
      dispatch(setCourses(coursesData));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);
  const fetchEnrollments = useCallback(async () => {
    try {
      const enrollmentsData = await courseClient.findAllEnrollments();
      dispatch(setEnrollments(enrollmentsData));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);
  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [fetchCourses, fetchEnrollments]);
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) => enrollment.user === (currentUser as any)?._id && enrollment.course === courseId
    );
  };
  const handleEnroll = async (courseId: string) => {
    await courseClient.enrollUserInCourse((currentUser as any)._id, courseId);
    fetchEnrollments();
  };
  const handleUnenroll = async (courseId: string) => {
    await courseClient.unenrollUserFromCourse((currentUser as any)._id, courseId);
    fetchEnrollments();
  };
  const onAddNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };
  const onDeleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };
  const onUpdateCourse = async () => {
    await courseClient.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => (c._id === course._id ? course : c))));
  };
  const toggleEnrollments = () => {
    setShowAllCourses(!showAllCourses);
  };
  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => isEnrolled(c._id));
  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <Button variant="primary" className="float-end" onClick={toggleEnrollments}>
          Enrollments
        </Button>
      </h1>
      <hr />
      {isFaculty && (
        <>
          <h5>
            New Course
            <Button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={onAddNewCourse}>
              Add
            </Button>
            <Button className="btn btn-warning float-end me-2" id="wd-update-course-click" onClick={onUpdateCourse}>
              Update
            </Button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Courses"} ({displayedCourses.length})
      </h2>
      <hr />
      <Row xs={1} md={5} className="g-4" id="wd-dashboard-courses">
        {displayedCourses.map((crs: any) => (
          <Col key={crs._id} className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link href={`/courses/${crs._id}/home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src={crs.image || "/images/reactjs.jpeg"} width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">{crs.name}</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {crs.description}
                  </CardText>
                </CardBody>
              </Link>
              <CardBody>
                <Link href={`/courses/${crs._id}/home`} className="btn btn-primary btn-sm me-2">
                  Go
                </Link>
                {isFaculty && (
                  <>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(crs);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2"
                      id="wd-delete-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        onDeleteCourse(crs._id);
                      }}
                    >
                      Delete
                    </Button>
                  </>
                )}
                {showAllCourses &&
                  (isEnrolled(crs._id) ? (
                    <Button variant="danger" size="sm" onClick={() => handleUnenroll(crs._id)}>
                      Unenroll
                    </Button>
                  ) : (
                    <Button variant="success" size="sm" onClick={() => handleEnroll(crs._id)}>
                      Enroll
                    </Button>
                  ))}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}