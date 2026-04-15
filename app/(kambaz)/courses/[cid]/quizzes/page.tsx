"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { ListGroup, Button, Dropdown } from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { IoRocketOutline } from "react-icons/io5";
import { FaCheckCircle, FaBan, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { RootState } from "../../../store";
import * as client from "../../client";

export default function Quizzes() {
  const { cid } = useParams();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser && (currentUser as any).role === "FACULTY";

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzesData = await client.findQuizzesForCourse(cid as string);
      setQuizzes(quizzesData);
    };
    fetchQuizzes();
  }, [cid]);

  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (untilDate && now > untilDate) {
      return "Closed";
    } else if (availableDate && now < availableDate) {
      return `Not available until ${quiz.availableDate}`;
    } else {
      return "Available";
    }
  };

  const handleAddQuiz = async () => {
    const newQuiz = {
      title: "New Quiz",
      description: "Quiz Description",
      quizType: "Graded Quiz",
      points: 0,
      assignmentGroup: "Quizzes",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      howManyAttempts: 1,
      published: false,
      questions: [],
    };
    const createdQuiz = await client.createQuiz(cid as string, newQuiz);
    setQuizzes([...quizzes, createdQuiz]);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this quiz?");
    if (!confirmDelete) return;
    await client.deleteQuiz(quizId);
    setQuizzes(quizzes.filter((q) => q._id !== quizId));
  };

  const handlePublishToggle = async (quizId: string, currentStatus: boolean) => {
    await client.publishQuiz(quizId, !currentStatus);
    setQuizzes(quizzes.map((q) => (q._id === quizId ? { ...q, published: !currentStatus } : q)));
  };

  const calculateTotalPoints = (quiz: any) => {
    if (!quiz.questions || quiz.questions.length === 0) return 0;
    return quiz.questions.reduce((total: number, q: any) => total + (q.points || 0), 0);
  };

  const displayedQuizzes = isFaculty ? quizzes : quizzes.filter((q) => q.published);

  return (
    <div id="wd-quizzes">
      {isFaculty && (
        <div className="d-flex justify-content-end mb-3">
          <Button variant="danger" onClick={handleAddQuiz}>
            <FaPlus className="me-2" />
            Quiz
          </Button>
        </div>
      )}

      {displayedQuizzes.length === 0 ? (
        <p className="text-muted">No quizzes available. {isFaculty && "Click + Quiz to add one."}</p>
      ) : (
        <ListGroup className="rounded-0">
          <ListGroup.Item className="p-0 mb-3 fs-5 border-gray">
            <div className="p-3 ps-2 bg-secondary d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <strong>Assignment Quizzes</strong>
            </div>
            <ListGroup className="rounded-0">
              {displayedQuizzes.map((quiz: any) => (
                <ListGroup.Item key={quiz._id} className="p-3 d-flex align-items-start">
                  <BsGripVertical className="me-2 fs-3 mt-1" />
                  <IoRocketOutline className="me-3 fs-4 text-success mt-1" />
                  <div className="flex-grow-1">
                    <Link
                      href={`/courses/${cid}/quizzes/${quiz._id}`}
                      className="text-decoration-none text-dark fw-bold"
                    >
                      {quiz.title}
                    </Link>
                    <br />
                    <small className="text-muted">
                      {getAvailabilityStatus(quiz)} | Due: {quiz.dueDate || "N/A"} |{" "}
                      {calculateTotalPoints(quiz)} pts | {quiz.questions?.length || 0} Questions
                    </small>
                  </div>
                  {isFaculty && (
                    <>
                      <span
                        className="me-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handlePublishToggle(quiz._id, quiz.published)}
                      >
                        {quiz.published ? (
                          <FaCheckCircle className="text-success fs-5" />
                        ) : (
                          <FaBan className="text-danger fs-5" />
                        )}
                      </span>
                      <Dropdown>
                        <Dropdown.Toggle variant="link" className="text-dark p-0">
                          <BsThreeDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item as={Link} href={`/courses/${cid}/quizzes/${quiz._id}/edit`}>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDeleteQuiz(quiz._id)}>
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handlePublishToggle(quiz._id, quiz.published)}>
                            {quiz.published ? "Unpublish" : "Publish"}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      )}
    </div>
  );
}