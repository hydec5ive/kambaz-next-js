"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { RootState } from "../store";
import Link from "next/link";
import { Card, CardBody, CardTitle, CardText, CardImg, Row, Col, FormControl, Button } from "react-bootstrap";
import * as db from "../database";
export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = db;
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });
  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>New Course
        <Button className="btn btn-primary float-end" id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}>Add</Button>
        <Button className="btn btn-warning float-end me-2" id="wd-update-course-click"
          onClick={() => dispatch(updateCourse(course))}>Update</Button>
      </h5>
      <br />
      <FormControl value={course.name} className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
      <FormControl as="textarea" value={course.description} rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })} />
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <Row xs={1} md={5} className="g-4" id="wd-dashboard-courses">
        {courses
          .filter((c: any) => {
            if (!currentUser) return true;
            return enrollments.some(
              (enrollment: any) => enrollment.user === (currentUser as any)._id && enrollment.course === c._id
            );
          })
          .map((crs: any) => (
          <Col key={crs._id} className="wd-dashboard-course" style={{ width: "250px" }}>
            <Card>
              <Link href={`/courses/${crs._id}/home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src={crs.image || "/images/reactjs.jpg"} width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {crs.name}</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {crs.description}</CardText>
                </CardBody>
              </Link>
              <CardBody>
                <Link href={`/courses/${crs._id}/home`} className="btn btn-primary btn-sm me-5">Go</Link>
                <Button variant="warning" size="sm" className="me-2" id="wd-edit-course-click"
                  onClick={(event) => {
                    event.preventDefault();
                    setCourse(crs);
                  }}>Edit</Button>
                <Button variant="danger" size="sm" id="wd-delete-course-click"
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(deleteCourse(crs._id));
                  }}>Delete</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
);}