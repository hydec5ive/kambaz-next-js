"use client";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { RootState } from "../../../store";
import Link from "next/link";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaTrash, FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const dispatch = useDispatch();
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between mb-3">
        <input type="text" className="form-control w-50" placeholder="Search for Assignments" />
        <div>
          <Button variant="secondary" className="me-2">+ Group</Button>
          <Link href={`/courses/${cid}/assignments/new`} className="btn btn-danger">+ Assignment</Link>
        </div>
      </div>
      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS
            </div>
            <div>
              <span className="badge bg-secondary text-dark border rounded-pill me-2">40% of Total</span>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ListGroup className="wd-assignments rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
              <ListGroupItem key={assignment._id} className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdAssignment className="me-2 fs-3 text-success" />
                  <div>
                    <Link href={`/courses/${cid}/assignments/${assignment._id}`} className="fw-bold text-decoration-none text-dark">
                      {assignment.title}
                    </Link>
                    <p className="mb-0 small text-muted">
                      <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> {assignment.availableFrom} |
                    </p>
                    <p className="mb-0 small text-muted">
                      <b>Due</b> {assignment.dueDate} | {assignment.points} pts
                    </p>
                  </div>
                </div>
                <div>
                  <FaPencil className="text-primary me-3" />
                  <FaTrash className="text-danger me-3" onClick={() => {
                    if (confirm("Are you sure you want to delete this assignment?")) {
                      dispatch(deleteAssignment(assignment._id));
                    }
                  }} />
                  <FaCheckCircle className="text-success me-2" />
                  <IoEllipsisVertical className="fs-4" />
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
);}