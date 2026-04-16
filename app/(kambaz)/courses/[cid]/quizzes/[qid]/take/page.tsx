"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { RootState } from "../../../../../store";
import * as client from "../../../../client";

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<any>({});
  const [previousAttempts, setPreviousAttempts] = useState<any[]>([]);
  const [accessCodeInput, setAccessCodeInput] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizData = await client.findQuizById(qid as string);
      setQuiz(quizData);
      if (!quizData.accessCode) {
        setAccessGranted(true);
      }
      if (quizData.timeLimit) {
        setTimeRemaining(quizData.timeLimit * 60);
      }
    };
    fetchQuiz();
  }, [qid]);

  useEffect(() => {
    const fetchAttempts = async () => {
      if (!currentUser) return;
      try {
        const attempts = await client.getQuizAttempts(qid as string, (currentUser as any)._id);
        setPreviousAttempts(attempts || []);
      } catch (error) {
        console.log("No previous attempts");
      }
    };
    fetchAttempts();
  }, [qid, currentUser]);

  // Timer
  useEffect(() => {
    if (!timerStarted || submitted || timeRemaining <= 0) return;
    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeRemaining, timerStarted, submitted]);

  const startQuiz = () => {
    setTimerStarted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleAccessCode = () => {
    if (accessCodeInput === quiz.accessCode) {
      setAccessGranted(true);
    } else {
      alert("Incorrect access code");
    }
  };

  const handleSubmit = async () => {
    let totalScore = 0;
    const questionResults: any = {};
    const answerRecords: any[] = [];

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

      const pointsEarned = isCorrect ? question.points : 0;
      totalScore += pointsEarned;
      questionResults[question._id] = isCorrect;

      answerRecords.push({
        questionId: question._id,
        answer: userAnswer || "",
        isCorrect,
        points: pointsEarned,
      });
    });

    setScore(totalScore);
    setResults(questionResults);
    setSubmitted(true);

    try {
      await client.submitQuizAttempt(qid as string, {
        user: (currentUser as any)._id,
        answers: answerRecords,
        score: totalScore,
        attemptNumber: previousAttempts.length + 1,
      });
    } catch (error) {
      console.error("Error saving attempt:", error);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  const totalPoints = quiz.questions ? quiz.questions.reduce((sum: number, q: any) => sum + q.points, 0) : 0;
  const attemptsRemaining = quiz.howManyAttempts - previousAttempts.length;
  const canTakeQuiz = quiz.multipleAttempts ? attemptsRemaining > 0 : previousAttempts.length === 0;

  // Access code screen
  if (quiz.accessCode && !accessGranted) {
    return (
      <div>
        <h2>{quiz.title}</h2>
        <Alert variant="warning">This quiz requires an access code.</Alert>
        <Form.Group className="mb-3">
          <Form.Label>Enter Access Code</Form.Label>
          <Form.Control
            type="text"
            value={accessCodeInput}
            onChange={(e) => setAccessCodeInput(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAccessCode}>Submit</Button>
      </div>
    );
  }

  // No attempts left screen
  if (!canTakeQuiz && !submitted) {
    return (
      <div>
        <h2>{quiz.title}</h2>
        <Alert variant="danger">You have used all your attempts for this quiz.</Alert>
        {previousAttempts.length > 0 && (
          <h4>Your Last Score: {previousAttempts[previousAttempts.length - 1].score} / {totalPoints}</h4>
        )}
        <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
          Back to Quizzes
        </Button>
      </div>
    );
  }

  // Start quiz screen
  if (!timerStarted && !submitted) {
    return (
      <div>
        <h2>{quiz.title}</h2>
        <Card className="mb-3">
          <Card.Body>
            <p><strong>Time Limit:</strong> {quiz.timeLimit} minutes</p>
            <p><strong>Questions:</strong> {quiz.questions?.length || 0}</p>
            <p><strong>Total Points:</strong> {totalPoints}</p>
            {previousAttempts.length > 0 && (
              <p><strong>Previous Attempts:</strong> {previousAttempts.length}</p>
            )}
          </Card.Body>
        </Card>
        <Button variant="danger" onClick={startQuiz}>Start Quiz</Button>
      </div>
    );
  }

  // Time expired
  if (timeRemaining <= 0 && !submitted && timerStarted) {
    handleSubmit();
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title}</h2>
        {!submitted && quiz.timeLimit > 0 && (
          <Alert variant={timeRemaining < 60 ? "danger" : "info"} className="mb-0 py-2 px-3">
            Time: {formatTime(timeRemaining)}
          </Alert>
        )}
      </div>

      {submitted && (
        <Alert variant={score === totalPoints ? "success" : "warning"}>
          <strong>Score: {score} / {totalPoints}</strong>
        </Alert>
      )}

      {quiz.questions && quiz.questions.map((question: any, index: number) => (
        <Card key={question._id} className={`mb-3 ${submitted ? (results[question._id] ? "border-success" : "border-danger") : ""}`}>
          <Card.Header>
            <span>Question {index + 1}: {question.title}</span>
            <span className="float-end">{question.points} pts</span>
          </Card.Header>
          <Card.Body>
            <p>{question.question}</p>

            {question.type === "MULTIPLE_CHOICE" && question.answers.map((answer: any) => (
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

            {question.type === "TRUE_FALSE" && (
              <>
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
              </>
            )}

            {question.type === "FILL_BLANK" && (
              <>
                <Form.Control
                  type="text"
                  placeholder="Your answer"
                  value={answers[question._id] || ""}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  disabled={submitted}
                />
                {submitted && (
                  <small className="text-success">Correct: {question.correctAnswer}</small>
                )}
              </>
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

      <div className="d-flex justify-content-end">
        {!submitted ? (
          <Button variant="danger" onClick={handleSubmit}>Submit Quiz</Button>
        ) : (
          <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
            Back to Quizzes
          </Button>
        )}
      </div>
    </div>
  );
}