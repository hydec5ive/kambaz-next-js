"use client";
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { useParams } from "next/navigation";
export default function AssignmentsControls() {
  const { cid } = useParams();
  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      <Link href={`/courses/${cid}/assignments/new`}>
        <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn">
          <FaPlus className="me-2" />
          Assignment
        </Button>
      </Link>
    </div>
  );
}