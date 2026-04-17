"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button, Form, Card, Alert } from "react-bootstrap";
import Link from "next/link";
import * as client from "../../../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<any>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div id="wd-quiz-preview">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title} - Preview</h2>
        <Link href={`/courses/${cid}/quizzes/${qid}/edit`}>
          <Button variant="secondary">Edit Quiz</Button>
        </Link>
      </div>

      <Alert variant="info">
        This is a preview. Your answers are not saved.
      </Alert>

      {submitted && (
        <Alert variant={score === totalPoints ? "success" : "warning"}>
          <strong>Score: {score} / {totalPoints}</strong>
        </Alert>
      )}

      {/* Question Navigation */}
      <div className="mb-3">
        <strong>Questions: </strong>
        {quiz.questions.map((q: any, index: number) => (
          <Button
            key={q._id}
            variant={currentQuestionIndex === index ? "primary" : submitted ? (results[q._id] ? "success" : "danger") : "outline-secondary"}
            size="sm"
            className="me-1"
            onClick={() => setCurrentQuestionIndex(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <hr />

      {/* Current Question */}
      {currentQuestion && (
        <Card className={`mb-3 ${submitted ? (results[currentQuestion._id] ? "border-success" : "border-danger") : ""}`}>
          <Card.Header>
            <span>Question {currentQuestionIndex + 1}: {currentQuestion.title}</span>
            <span className="float-end">{currentQuestion.points} pts</span>
          </Card.Header>
          <Card.Body>
            <p>{currentQuestion.question}</p>

            {currentQuestion.type === "MULTIPLE_CHOICE" && currentQuestion.answers.map((answer: any) => (
              <Form.Check
                key={answer._id}
                type="radio"
                id={`${currentQuestion._id}-${answer._id}`}
                name={currentQuestion._id}
                label={answer.text}
                checked={answers[currentQuestion._id] === answer._id}
                onChange={() => handleAnswerChange(currentQuestion._id, answer._id)}
                disabled={submitted}
                className={submitted && answer.isCorrect ? "text-success fw-bold" : ""}
              />
            ))}

            {currentQuestion.type === "TRUE_FALSE" && (
              <>
                <Form.Check
                  type="radio"
                  id={`${currentQuestion._id}-true`}
                  name={currentQuestion._id}
                  label="True"
                  checked={answers[currentQuestion._id] === "true"}
                  onChange={() => handleAnswerChange(currentQuestion._id, "true")}
                  disabled={submitted}
                  className={submitted && currentQuestion.correctAnswer === "true" ? "text-success fw-bold" : ""}
                />
                <Form.Check
                  type="radio"
                  id={`${currentQuestion._id}-false`}
                  name={currentQuestion._id}
                  label="False"
                  checked={answers[currentQuestion._id] === "false"}
                  onChange={() => handleAnswerChange(currentQuestion._id, "false")}
                  disabled={submitted}
                  className={submitted && currentQuestion.correctAnswer === "false" ? "text-success fw-bold" : ""}
                />
              </>
            )}

            {currentQuestion.type === "FILL_BLANK" && (
              <>
                <Form.Control
                  type="text"
                  placeholder="Your answer"
                  value={answers[currentQuestion._id] || ""}
                  onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                  disabled={submitted}
                />
                {submitted && (
                  <small className="text-success">Correct: {currentQuestion.correctAnswer}</small>
                )}
              </>
            )}

            {submitted && (
              <div className="mt-2">
                {results[currentQuestion._id] ? (
                  <span className="text-success">✓ Correct</span>
                ) : (
                  <span className="text-danger">✗ Incorrect</span>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between">
        <div>
          <Button
            variant="outline-secondary"
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline-secondary"
            className="ms-2"
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            disabled={currentQuestionIndex === quiz.questions.length - 1}
          >
            Next
          </Button>
        </div>
        <div>
          {!submitted ? (
            <Button variant="danger" onClick={calculateScore}>Submit Quiz</Button>
          ) : (
            <Button variant="primary" onClick={() => { setSubmitted(false); setAnswers({}); setCurrentQuestionIndex(0); }}>
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}