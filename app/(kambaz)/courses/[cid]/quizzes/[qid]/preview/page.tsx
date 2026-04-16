"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Card, Alert } from "react-bootstrap";
import Link from "next/link";
import * as client from "../../../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<any>({});

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizData = await client.findQuizById(qid as string);
      setQuiz(quizData);
    };
    fetchQuiz();
  }, [qid]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const calculateScore = () => {
    let totalScore = 0;
    const questionResults: any = {};

    quiz.questions.forEach((question: any) => {
      const userAnswer = answers[question._id];
      let isCorrect = false;

      if (question.type === "MULTIPLE_CHOICE") {
        const correctAnswer = question.answers.find((a: any) => a.isCorrect);
        isCorrect = correctAnswer && userAnswer === correctAnswer._id;
      } else if (question.type === "TRUE_FALSE") {
        isCorrect = userAnswer === question.correctAnswer;
      } else if (question.type === "FILL_BLANK") {
        const correctAnswers = question.correctAnswer.split(",").map((a: string) => a.trim().toLowerCase());
        isCorrect = correctAnswers.includes((userAnswer || "").toLowerCase());
      }

      if (isCorrect) {
        totalScore += question.points;
      }

      questionResults[question._id] = isCorrect;
    });

    setScore(totalScore);
    setResults(questionResults);
    setSubmitted(true);
  };

  if (!quiz) return <div>Loading...</div>;

  const totalPoints = quiz.questions.reduce((sum: number, q: any) => sum + q.points, 0);

  return (
    <div id="wd-quiz-preview">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title} - Preview</h2>
        <Link href={`/courses/${cid}/quizzes/${qid}/edit`}>
          <Button variant="secondary">Edit Quiz</Button>
        </Link>
      </div>

      <Alert variant="info">
        This is a preview of how students will see the quiz. Your answers are not saved.
      </Alert>

      {submitted && (
        <Alert variant={score === totalPoints ? "success" : "warning"}>
          <strong>Score: {score} / {totalPoints}</strong>
        </Alert>
      )}

      <hr />

      {quiz.questions.map((question: any, index: number) => (
        <Card key={question._id} className={`mb-3 ${submitted ? (results[question._id] ? "border-success" : "border-danger") : ""}`}>
          <Card.Header className="d-flex justify-content-between">
            <span>Question {index + 1}: {question.title}</span>
            <span>{question.points} pts</span>
          </Card.Header>
          <Card.Body>
            <p>{question.question}</p>

            {question.type === "MULTIPLE_CHOICE" && (
              <Form>
                {question.answers.map((answer: any) => (
                  <Form.Check
                    key={answer._id}
                    type="radio"
                    id={`${question._id}-${answer._id}`}
                    name={question._id}
                    label={answer.text}
                    checked={answers[question._id] === answer._id}
                    onChange={() => handleAnswerChange(question._id, answer._id)}
                    disabled={submitted}
                    className={submitted && answer.isCorrect ? "text-success fw-bold" : ""}
                  />
                ))}
              </Form>
            )}

            {question.type === "TRUE_FALSE" && (
              <Form>
                <Form.Check
                  type="radio"
                  id={`${question._id}-true`}
                  name={question._id}
                  label="True"
                  checked={answers[question._id] === "true"}
                  onChange={() => handleAnswerChange(question._id, "true")}
                  disabled={submitted}
                  className={submitted && question.correctAnswer === "true" ? "text-success fw-bold" : ""}
                />
                <Form.Check
                  type="radio"
                  id={`${question._id}-false`}
                  name={question._id}
                  label="False"
                  checked={answers[question._id] === "false"}
                  onChange={() => handleAnswerChange(question._id, "false")}
                  disabled={submitted}
                  className={submitted && question.correctAnswer === "false" ? "text-success fw-bold" : ""}
                />
              </Form>
            )}

            {question.type === "FILL_BLANK" && (
              <Form>
                <Form.Control
                  type="text"
                  placeholder="Your answer"
                  value={answers[question._id] || ""}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  disabled={submitted}
                />
                {submitted && (
                  <small className="text-success">Correct answer(s): {question.correctAnswer}</small>
                )}
              </Form>
            )}

            {submitted && (
              <div className="mt-2">
                {results[question._id] ? (
                  <span className="text-success">✓ Correct</span>
                ) : (
                  <span className="text-danger">✗ Incorrect</span>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      ))}

      <div className="d-flex justify-content-end gap-2">
        {!submitted ? (
          <Button variant="danger" onClick={calculateScore}>
            Submit Quiz
          </Button>
        ) : (
          <Button variant="primary" onClick={() => { setSubmitted(false); setAnswers({}); }}>
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}