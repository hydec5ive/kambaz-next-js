"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { updateAssignment } from "../reducer";
import { RootState } from "../../../../store";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const existingAssignment = assignments.find((a: any) => a._id === aid);
  const [assignment, setAssignment] = useState<any>(existingAssignment || {
    title: "New Assignment",
    description: "New Assignment Description",
    points: 100,
    dueDate: "2024-05-13",
    availableFrom: "2024-05-06",
    availableUntil: "2024-05-20",
    course: cid,
  });
  const isFaculty = currentUser && (currentUser as any).role === "FACULTY";
  const handleSave = () => {
    dispatch(updateAssignment(assignment));
    router.push(`/courses/${cid}/assignments`);
  };
  return (
    <div id="wd-assignments-editor">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input id="wd-name" className="form-control" value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          disabled={!isFaculty} />
      </div>
      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">Description</label>
        <textarea id="wd-description" className="form-control" rows={5} value={assignment.description}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
          disabled={!isFaculty} />
      </div>
      <Row className="mb-3">
        <Col sm={3} className="text-end">
          <label htmlFor="wd-points" className="col-form-label">Points</label>
        </Col>
        <Col sm={9}>
          <input id="wd-points" className="form-control" type="number" value={assignment.points}
            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })}
            disabled={!isFaculty} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="text-end">
          <label htmlFor="wd-group" className="col-form-label">Assignment Group</label>
        </Col>
        <Col sm={9}>
          <select id="wd-group" className="form-control" defaultValue="ASSIGNMENTS" disabled={!isFaculty}>
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
          </select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="text-end">
          <label htmlFor="wd-display-grade-as" className="col-form-label">Display Grade as</label>
        </Col>
        <Col sm={9}>
          <select id="wd-display-grade-as" className="form-control" defaultValue="PERCENTAGE" disabled={!isFaculty}>
            <option value="PERCENTAGE">Percentage</option>
            <option value="POINTS">Points</option>
            <option value="LETTER">Letter Grade</option>
          </select>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="text-end">
          <label htmlFor="wd-submission-type" className="col-form-label">Submission Type</label>
        </Col>
        <Col sm={9}>
          <div className="border rounded p-3">
            <select id="wd-submission-type" className="form-control mb-3" defaultValue="ONLINE" disabled={!isFaculty}>
              <option value="ONLINE">Online</option>
              <option value="PAPER">On Paper</option>
              <option value="EXTERNAL">External Tool</option>
            </select>
            <label className="fw-bold mb-2">Online Entry Options</label>
            <div className="form-check">
              <input type="checkbox" id="wd-text-entry" className="form-check-input" disabled={!isFaculty} />
              <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
            </div>
            <div className="form-check">
              <input type="checkbox" id="wd-website-url" className="form-check-input" defaultChecked disabled={!isFaculty} />
              <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
            </div>
            <div className="form-check">
              <input type="checkbox" id="wd-media-recordings" className="form-check-input" disabled={!isFaculty} />
              <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
            </div>
            <div className="form-check">
              <input type="checkbox" id="wd-student-annotation" className="form-check-input" disabled={!isFaculty} />
              <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
            </div>
            <div className="form-check">
              <input type="checkbox" id="wd-file-upload" className="form-check-input" disabled={!isFaculty} />
              <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="text-end">
          <label className="col-form-label">Assign</label>
        </Col>
        <Col sm={9}>
          <div className="border rounded p-3">
            <div className="mb-3">
              <label htmlFor="wd-assign-to" className="fw-bold">Assign to</label>
              <input id="wd-assign-to" className="form-control" defaultValue="Everyone" disabled={!isFaculty} />
            </div>
            <div className="mb-3">
              <label htmlFor="wd-due-date" className="fw-bold">Due</label>
              <input type="date" id="wd-due-date" className="form-control" value={assignment.dueDate}
                onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                disabled={!isFaculty} />
            </div>
            <Row>
              <Col sm={6}>
                <div className="mb-3">
                  <label htmlFor="wd-available-from" className="fw-bold">Available from</label>
                  <input type="date" id="wd-available-from" className="form-control" value={assignment.availableFrom}
                    onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })}
                    disabled={!isFaculty} />
                </div>
              </Col>
              <Col sm={6}>
                <div className="mb-3">
                  <label htmlFor="wd-available-until" className="fw-bold">Until</label>
                  <input type="date" id="wd-available-until" className="form-control" value={assignment.availableUntil}
                    onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
                    disabled={!isFaculty} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <hr />
      <div className="d-flex justify-content-end">
        <Link href={`/courses/${cid}/assignments`}>
          <Button variant="secondary" className="me-2">Cancel</Button>
        </Link>
        {isFaculty && (
          <Button variant="danger" onClick={handleSave}>Save</Button>
        )}
      </div>
    </div>
);}