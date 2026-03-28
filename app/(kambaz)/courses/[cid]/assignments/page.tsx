"use client";
import { useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { PiNotePencilBold } from "react-icons/pi";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { setAssignments } from "./reducer";
import { RootState } from "../../../store";
import AssignmentsControls from "./AssignmentsControls";
import LessonControlButtons from "../modules/LessonControlButtons";
import * as client from "../../client";
export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const isFaculty = currentUser && (currentUser as any).role === "FACULTY";
  const fetchAssignments = useCallback(async () => {
    const assignmentsData = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignmentsData));
  }, [cid, dispatch]);
  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);
  const onDeleteAssignment = async (assignmentId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this assignment?");
    if (!confirmDelete) return;
    await client.deleteAssignment(assignmentId);
    dispatch(setAssignments(assignments.filter((a: any) => a._id !== assignmentId)));
  };
  return (
    <div id="wd-assignments">
      {isFaculty && <AssignmentsControls />}
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-assignments-list">
        <ListGroup.Item className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {assignments.map((assignment: any) => (
              <ListGroup.Item key={assignment._id} className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <PiNotePencilBold className="me-2 fs-3 text-success" />
                <div className="flex-grow-1">
                  <Link
                    href={`/courses/${cid}/assignments/${assignment._id}`}
                    className="text-decoration-none text-dark fw-bold"
                  >
                    {assignment.title}
                  </Link>
                  <br />
                  <small>
                    Multiple Modules | Due {assignment.dueDate} | {assignment.points} pts
                  </small>
                </div>
                {isFaculty && (
                  <FaTrash
                    className="text-danger me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => onDeleteAssignment(assignment._id)}
                  />
                )}
                <LessonControlButtons />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}