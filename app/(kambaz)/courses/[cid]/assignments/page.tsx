"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { RootState } from "../../../store";
import Link from "next/link";
import { ListGroup, ListGroupItem, Button, FormControl, Modal } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaTrash, FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdAssignment } from "react-icons/md";
export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);
  const handleClose = () => setShow(false);
  const handleShow = (assignment: any) => {
    setAssignmentToDelete(assignment);
    setShow(true);
  };
  const handleDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete._id));
    }
    handleClose();
  };
  const isFaculty = currentUser && (currentUser as any).role === "FACULTY";
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between mb-3">
        <FormControl type="text" placeholder="Search for Assignments" className="w-50" />
        {isFaculty && (
          <div>
            <Button variant="secondary" className="me-2">+ Group</Button>
            <Link href={`/courses/${cid}/assignments/new`} className="btn btn-danger">+ Assignment</Link>
          </div>
        )}
      </div>
      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              <b>ASSIGNMENTS</b>
            </div>
            <div>
              <span className="badge bg-secondary text-dark border rounded-pill me-2">40% of Total</span>
              <FaPlus className="me-2" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ListGroup className="rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
              <ListGroupItem key={assignment._id} className="p-3 ps-1 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdAssignment className="me-2 fs-3 text-success" />
                  <div>
                    <Link href={`/courses/${cid}/assignments/${assignment._id}`} className="fw-bold text-decoration-none text-dark">
                      {assignment.title}
                    </Link>
                    <p className="mb-0 small text-muted">
                      <span className="text-danger">Multiple Modules</span> | 
                      <b> Not available until</b> {assignment.availableFrom || "N/A"} |
                      <b> Due</b> {assignment.dueDate || "N/A"} | {assignment.points || 100} pts
                    </p>
                  </div>
                </div>
                <div>
                  {isFaculty && (
                    <FaTrash className="text-danger me-3" style={{ cursor: "pointer" }}
                      onClick={() => handleShow(assignment)} />
                  )}
                  <FaCheckCircle className="text-success me-2" />
                  <IoEllipsisVertical className="fs-4" />
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove "{assignmentToDelete?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
);}