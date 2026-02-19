"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaPlus, FaCheckCircle, FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import FormControl from "react-bootstrap/esm/FormControl";
import InputGroup from "react-bootstrap/esm/InputGroup";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import * as db from "../../../database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "300px" }}>
          <InputGroupText className="bg-white">
            <FaSearch className="text-secondary" />
          </InputGroupText>
          <FormControl placeholder="Search for Assignments" id="wd-search-assignment" />
        </InputGroup>
        <div>
          <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-2" />
            Group
          </Button>
          <Button variant="danger" size="lg" id="wd-add-assignment">
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0 mb-5" id="wd-assignment-list">
        <ListGroupItem className="p-0 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-2" />
              <strong>ASSIGNMENTS</strong>
            </div>
            <div>
              <span className="border rounded-pill px-2 py-1 me-2" style={{ fontSize: "14px" }}>
                40% of Total
              </span>
              <FaPlus className="me-2" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ListGroup className="rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroupItem
                  key={assignment._id}
                  className="wd-lesson p-3 ps-1 d-flex align-items-center"
                >
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment className="me-3 fs-3 text-success" />
                  <div className="flex-grow-1">
                    <Link
                      href={`/courses/${cid}/assignments/${assignment._id}`}
                      className="wd-assignment-link text-dark text-decoration-none"
                    >
                      <strong>{assignment.title}</strong>
                    </Link>
                    <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <strong>Not available until</strong> {assignment.availableFrom} |
                    </p>
                    <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                      <strong>Due</strong> {assignment.dueDate} | {assignment.points} pts
                    </p>
                  </div>
                  <div>
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