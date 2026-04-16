"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, Tab, Tabs, Row, Col } from "react-bootstrap";
import * as client from "../../../../client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<any>({
    title: "",
    description: "",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    published: false,
    questions: [],
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizData = await client.findQuizById(qid as string);
      if (quizData) setQuiz(quizData);
    };
    fetchQuiz();
  }, [qid]);

  const handleSave = async () => {
    await client.updateQuiz(qid as string, quiz);
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    await client.updateQuiz(qid as string, { ...quiz, published: true });
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/quizzes`);
  };

  return (
    <div id="wd-quiz-editor">
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || "details")} className="mb-3">
        <Tab eventKey="details" title="Details">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={quiz.description}
                onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Quiz Type</Form.Label>
                  <Form.Select
                    value={quiz.quizType}
                    onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
                  >
                    <option value="Graded Quiz">Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Assignment Group</Form.Label>
                  <Form.Select
                    value={quiz.assignmentGroup}
                    onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
                  >
                    <option value="Quizzes">Quizzes</option>
                    <option value="Exams">Exams</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Project">Project</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Time Limit (Minutes)</Form.Label>
                  <Form.Control
                    type="number"
                    value={quiz.timeLimit || 20}
                    onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 20 })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Access Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={quiz.accessCode}
                    onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
                    placeholder="Leave blank for no code"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Shuffle Answers"
                checked={quiz.shuffleAnswers}
                onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Multiple Attempts"
                checked={quiz.multipleAttempts}
                onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
              />
            </Form.Group>

            {quiz.multipleAttempts && (
              <Form.Group className="mb-3">
                <Form.Label>How Many Attempts</Form.Label>
              <Form.Control
                type="number"
                value={quiz.howManyAttempts || 1}
                onChange={(e) => setQuiz({ ...quiz, howManyAttempts: parseInt(e.target.value) || 1 })}
              />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="One Question at a Time"
                checked={quiz.oneQuestionAtATime}
                onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Webcam Required"
                checked={quiz.webcamRequired}
                onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Lock Questions After Answering"
                checked={quiz.lockQuestionsAfterAnswering}
                onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={quiz.dueDate}
                    onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Available From</Form.Label>
                  <Form.Control
                    type="date"
                    value={quiz.availableDate}
                    onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    type="date"
                    value={quiz.untilDate}
                    onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Tab>

        <Tab eventKey="questions" title="Questions">
          <QuestionsEditor quiz={quiz} setQuiz={setQuiz} />
        </Tab>
      </Tabs>

      <hr />
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
        <Button variant="danger" onClick={handleSaveAndPublish}>Save & Publish</Button>
      </div>
    </div>
  );
}

function QuestionsEditor({ quiz, setQuiz }: { quiz: any; setQuiz: (quiz: any) => void }) {
  const addQuestion = (type: string) => {
    const newQuestion = {
      _id: new Date().getTime().toString(),
      title: "New Question",
      type: type,
      points: 1,
      question: "",
      answers: type === "MULTIPLE_CHOICE" ? [
        { _id: "1", text: "Option 1", isCorrect: true },
        { _id: "2", text: "Option 2", isCorrect: false },
      ] : [],
      correctAnswer: type === "TRUE_FALSE" ? "true" : "",
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  const updateQuestion = (questionId: string, updates: any) => {
    const newQuestions = quiz.questions.map((q: any) =>
      q._id === questionId ? { ...q, ...updates } : q
    );
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const deleteQuestion = (questionId: string) => {
    setQuiz({ ...quiz, questions: quiz.questions.filter((q: any) => q._id !== questionId) });
  };

  return (
    <div>
      <div className="mb-3">
        <Button variant="outline-primary" className="me-2" onClick={() => addQuestion("MULTIPLE_CHOICE")}>
          + Multiple Choice
        </Button>
        <Button variant="outline-primary" className="me-2" onClick={() => addQuestion("TRUE_FALSE")}>
          + True/False
        </Button>
        <Button variant="outline-primary" onClick={() => addQuestion("FILL_BLANK")}>
          + Fill in Blank
        </Button>
      </div>

      {quiz.questions.length === 0 ? (
        <p className="text-muted">No questions yet. Click a button above to add one.</p>
      ) : (
        quiz.questions.map((question: any, index: number) => (
          <QuestionCard
            key={question._id}
            question={question}
            index={index}
            updateQuestion={updateQuestion}
            deleteQuestion={deleteQuestion}
          />
        ))
      )}
    </div>
  );
}

function QuestionCard({ question, index, updateQuestion, deleteQuestion }: any) {
  const [editing, setEditing] = useState(true);

  const updateAnswer = (answerId: string, updates: any) => {
    const newAnswers = question.answers.map((a: any) =>
      a._id === answerId ? { ...a, ...updates } : a
    );
    updateQuestion(question._id, { answers: newAnswers });
  };

  const setCorrectAnswer = (answerId: string) => {
    const newAnswers = question.answers.map((a: any) => ({
      ...a,
      isCorrect: a._id === answerId,
    }));
    updateQuestion(question._id, { answers: newAnswers });
  };

  const addAnswer = () => {
    const newAnswer = {
      _id: new Date().getTime().toString(),
      text: "New Option",
      isCorrect: false,
    };
    updateQuestion(question._id, { answers: [...question.answers, newAnswer] });
  };

  const deleteAnswer = (answerId: string) => {
    updateQuestion(question._id, {
      answers: question.answers.filter((a: any) => a._id !== answerId),
    });
  };

  return (
    <div className="border p-3 mb-3 rounded">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Question {index + 1} ({question.type})</strong>
        <div>
          <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => setEditing(!editing)}>
            {editing ? "Collapse" : "Edit"}
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => deleteQuestion(question._id)}>
            Delete
          </Button>
        </div>
      </div>

      {editing && (
        <>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={question.title}
              onChange={(e) => updateQuestion(question._id, { title: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={question.points || 1}
              onChange={(e) => updateQuestion(question._id, { points: parseInt(e.target.value) || 1 })}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Question</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={question.question}
              onChange={(e) => updateQuestion(question._id, { question: e.target.value })}
            />
          </Form.Group>

          {question.type === "MULTIPLE_CHOICE" && (
            <div>
              <Form.Label>Answers (select correct one)</Form.Label>
              {question.answers.map((answer: any) => (
                <div key={answer._id} className="d-flex align-items-center mb-2">
                  <Form.Check
                    type="radio"
                    name={`correct-${question._id}`}
                    checked={answer.isCorrect}
                    onChange={() => setCorrectAnswer(answer._id)}
                    className="me-2"
                  />
                  <Form.Control
                    type="text"
                    value={answer.text}
                    onChange={(e) => updateAnswer(answer._id, { text: e.target.value })}
                    className="me-2"
                  />
                  <Button variant="outline-danger" size="sm" onClick={() => deleteAnswer(answer._id)}>
                    X
                  </Button>
                </div>
              ))}
              <Button variant="outline-secondary" size="sm" onClick={addAnswer}>
                + Add Option
              </Button>
            </div>
          )}

          {question.type === "TRUE_FALSE" && (
            <Form.Group>
              <Form.Label>Correct Answer</Form.Label>
              <Form.Select
                value={question.correctAnswer}
                onChange={(e) => updateQuestion(question._id, { correctAnswer: e.target.value })}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Select>
            </Form.Group>
          )}

          {question.type === "FILL_BLANK" && (
            <Form.Group>
              <Form.Label>Correct Answer(s) - comma separated</Form.Label>
              <Form.Control
                type="text"
                value={question.correctAnswer}
                onChange={(e) => updateQuestion(question._id, { correctAnswer: e.target.value })}
                placeholder="answer1, answer2, answer3"
              />
            </Form.Group>
          )}
        </>
      )}
    </div>
  );
}