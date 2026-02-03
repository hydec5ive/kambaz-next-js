import Link from "next/link";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input id="wd-name" className="form-control" defaultValue="A1 - ENV + HTML" />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">Description</label>
        <textarea 
          id="wd-description" 
          className="form-control" 
          rows={5} 
          defaultValue="The assignment is available online..."
        />

      </div>
      <Row className="mb-3">
        <Col sm={3} className="text-end">
          <label htmlFor="wd-points" className="col-form-label">Points</label>
        </Col>
        <Col sm={9}>
          <input id="wd-points" className="form-control" type="number" defaultValue={100} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={3} className="text-end">
          <label htmlFor="wd-group" className="col-form-label">Assignment Group</label>
        </Col>
        <Col sm={9}>
          <select id="wd-group" className="form-control" defaultValue="ASSIGNMENTS">
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
          <select id="wd-display-grade-as" className="form-control" defaultValue="PERCENTAGE">
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
            <select id="wd-submission-type" className="form-control mb-3" defaultValue="ONLINE">
              <option value="ONLINE">Online</option>
              <option value="PAPER">On Paper</option>
              <option value="EXTERNAL">External Tool</option>
            </select>

            <label className="fw-bold mb-2">Online Entry Options</label>
            
            <div className="form-check">
              <input type="checkbox" id="wd-text-entry" className="form-check-input" />
              <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
            </div>
            <div className="form-check">
              <input type="checkbox" id="wd-website-url" className="form-check-input" />
              <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
            </div>
            <div className="form-check">
              <input type="checkbox" id="wd-media-recordings" className="form-check-input" />
              <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
            </div>
            <div className="form-check">
              <input type="checkbox" id="wd-student-annotation" className="form-check-input" />
              <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
            </div>
            <div className="form-check">
              <input type="checkbox" id="wd-file-upload" className="form-check-input" />
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
              <input id="wd-assign-to" className="form-control" defaultValue="Everyone" />
            </div>

            <div className="mb-3">
              <label htmlFor="wd-due-date" className="fw-bold">Due</label>
              <input type="date" id="wd-due-date" className="form-control" defaultValue="2024-05-13" />
            </div>

            <Row>
              <Col sm={6}>
                <div className="mb-3">
                  <label htmlFor="wd-available-from" className="fw-bold">Available from</label>
                  <input type="date" id="wd-available-from" className="form-control" defaultValue="2024-05-06" />
                </div>
              </Col>
              <Col sm={6}>
                <div className="mb-3">
                  <label htmlFor="wd-available-until" className="fw-bold">Until</label>
                  <input type="date" id="wd-available-until" className="form-control" defaultValue="2024-05-20" />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <hr />
      <div className="d-flex justify-content-end">
        <Link href="/courses/1234/assignments">
          <Button variant="secondary" className="me-2">Cancel</Button>
        </Link>
        <Button variant="danger">Save</Button>
      </div>
    </div>
  );}