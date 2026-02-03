import Link from "next/link";
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

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "300px" }}>
          <InputGroupText className="bg-white">
            <FaSearch className="text-secondary" />
          </InputGroupText>
          <FormControl placeholder="Search..." id="wd-search-assignment" />
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
              <FaCaretDown className="me-4" />
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
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <MdOutlineAssignment className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link href="/courses/1234/assignments/123" className="wd-assignment-link text-dark text-decoration-none">
                  <strong>A1</strong>
                </Link>
                <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am |
                </p>
                <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                  <strong>Due</strong> May 13 at 11:59pm | 100 pts
                </p>
              </div>
              <div>
                <FaCheckCircle className="text-success me-2" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <MdOutlineAssignment className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link href="/courses/1234/assignments/124" className="wd-assignment-link text-dark text-decoration-none">
                  <strong>A2</strong>
                </Link>
                <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 13 at 12:00am |
                </p>
                <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                  <strong>Due</strong> May 20 at 11:59pm | 100 pts
                </p>
              </div>
              <div>
                <FaCheckCircle className="text-success me-2" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <MdOutlineAssignment className="me-3 fs-3 text-success" />
              <div className="flex-grow-1">
                <Link href="/courses/1234/assignments/125" className="wd-assignment-link text-dark text-decoration-none">
                  <strong>A3</strong>
                </Link>
                <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00am |
                </p>
                <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                  <strong>Due</strong> May 27 at 11:59pm | 100 pts
                </p>
              </div>
              <div>
                <FaCheckCircle className="text-success me-2" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );}