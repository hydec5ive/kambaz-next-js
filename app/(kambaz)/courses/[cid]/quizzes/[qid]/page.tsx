"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Card, Row, Col } from "react-bootstrap";
import { FaPencilAlt, FaBan, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { RootState } from "../../../../store";
import * as client from "../../../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser && (currentUser as any).role === "FACULTY";

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizData = await client.findQuizById(qid as string);
      setQuiz(quizData);
    };
    fetchQuiz();
  }, [qid]);

  const handlePublishToggle = async () => {
    await client.publishQuiz(qid as string, !quiz.published);
    setQuiz({ ...quiz, published: !quiz.published });
  };

  if (!quiz) return <div>Loading...</div>;

  const calculateTotalPoints = () => {
    if (!quiz.questions || quiz.questions.length === 0) return 0;
    return quiz.questions.reduce((total: number, q: any) => total + (q.points || 0), 0);
  };

  return (
    <div id="wd-quiz-details">
      <div className="d-flex justify-content-center mb-3 gap-2">
        {isFaculty && (
          <>
            <Link href={`/courses/${cid}/quizzes/${qid}/preview`}>
              <Button variant="secondary">Preview</Button>
            </Link>
            <Link href={`/courses/${cid}/quizzes/${qid}/edit`}>
              <Button variant="secondary">
                <FaPencilAlt className="me-2" />
                Edit
              </Button>
            </Link>
            <Button
              variant={quiz.published ? "warning" : "success"}
              onClick={handlePublishToggle}
            >
              {quiz.published ? "Unpublish" : "Publish"}
            </Button>
          </>
        )}
        {!isFaculty && quiz.published && (
          <Link href={`/courses/${cid}/quizzes/${qid}/take`}>
            <Button variant="danger">Start Quiz</Button>
          </Link>
        )}
      </div>

      <hr />

      <h2>
        {quiz.title}
        {quiz.published ? (
          <FaCheckCircle className="text-success ms-2" />
        ) : (
          <FaBan className="text-danger ms-2" />
        )}
      </h2>

      <Card className="mt-4">
        <Card.Body>
          <Row className="mb-2">
            <Col sm={4}><strong>Quiz Type</strong></Col>
            <Col sm={8}>{quiz.quizType || "Graded Quiz"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>Points</strong></Col>
            <Col sm={8}>{calculateTotalPoints()}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>Assignment Group</strong></Col>
            <Col sm={8}>{quiz.assignmentGroup || "Quizzes"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>Shuffle Answers</strong></Col>
            <Col sm={8}>{quiz.shuffleAnswers ? "Yes" : "No"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>Time Limit</strong></Col>
            <Col sm={8}>{quiz.timeLimit || 20} Minutes</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>Multiple Attempts</strong></Col>
            <Col sm={8}>{quiz.multipleAttempts ? "Yes" : "No"}</Col>
          </Row>
          {quiz.multipleAttempts && (
            <Row className="mb-2">
              <Col sm={4}><strong>How Many Attempts</strong></Col>
              <Col sm={8}>{quiz.howManyAttempts || 1}</Col>
            </Row>
          )}
          <Row className="mb-2">
            <Col sm={4}><strong>Show Correct Answers</strong></Col>
            <Col sm={8}>{quiz.showCorrectAnswers || "No"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>Access Code</strong></Col>
            <Col sm={8}>{quiz.accessCode || "None"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>One Question at a Time</strong></Col>
            <Col sm={8}>{quiz.oneQuestionAtATime ? "Yes" : "No"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>Webcam Required</strong></Col>
            <Col sm={8}>{quiz.webcamRequired ? "Yes" : "No"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>Lock Questions After Answering</strong></Col>
            <Col sm={8}>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</Col>
          </Row>
          <hr />
          <Row className="mb-2">
            <Col sm={4}><strong>Due Date</strong></Col>
            <Col sm={8}>{quiz.dueDate || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>Available Date</strong></Col>
            <Col sm={8}>{quiz.availableDate || "N/A"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={4}><strong>Until Date</strong></Col>
            <Col sm={8}>{quiz.untilDate || "N/A"}</Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}