"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FormControl, Button, Row, Col } from "react-bootstrap";
import { RootState } from "../../../../store";
import * as client from "../../../client";
export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser && (currentUser as any).role === "FACULTY";
  const [assignment, setAssignment] = useState<any>({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });
  useEffect(() => {
    const fetchAssignment = async () => {
      if (aid !== "new") {
        const assignmentData = await client.findAssignmentById(cid as string, aid as string);
        setAssignment(assignmentData);
      }
    };
    fetchAssignment();
  }, [cid, aid]);
  const handleSave = async () => {
    if (aid === "new") {
      await client.createAssignmentForCourse(cid as string, assignment);
    } else {
      await client.updateAssignment(cid as string, assignment);
    }
    router.push(`/courses/${cid}/assignments`);
  };
  const handleCancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };
  return (
    <div id="wd-assignment-editor">
      <FormControl
        className="mb-2"
        placeholder="Assignment Name"
        value={assignment.title || ""}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
        disabled={!isFaculty}
      />
      <FormControl
        as="textarea"
        className="mb-2"
        placeholder="Assignment Description"
        rows={5}
        value={assignment.description || ""}
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
        disabled={!isFaculty}
      />
      <Row className="mb-3">
        <Col md={3}>
          <label>Points</label>
        </Col>
        <Col md={9}>
          <FormControl
            type="number"
            value={assignment.points || 100}
            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })}
            disabled={!isFaculty}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={3}>
          <label>Due Date</label>
        </Col>
        <Col md={9}>
          <FormControl
            type="date"
            value={assignment.dueDate || ""}
            onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
            disabled={!isFaculty}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={3}>
          <label>Available From</label>
        </Col>
        <Col md={9}>
          <FormControl
            type="date"
            value={assignment.availableFrom || ""}
            onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })}
            disabled={!isFaculty}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={3}>
          <label>Available Until</label>
        </Col>
        <Col md={9}>
          <FormControl
            type="date"
            value={assignment.availableUntil || ""}
            onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
            disabled={!isFaculty}
          />
        </Col>
      </Row>
      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={handleCancel}>
          Cancel
        </Button>
        {isFaculty && (
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        )}
      </div>
    </div>
  );
}