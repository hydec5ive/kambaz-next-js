import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/123" className="wd-assignment-link">
            A1 - ENV + HTML
          </Link>
          <br />
          Multiple Modules | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/124" className="wd-assignment-link">
            A2 - CSS + BOOTSTRAP
          </Link>
          <br />
          Multiple Modules | <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/125" className="wd-assignment-link">
            A3 - JAVASCRIPT + REACT
          </Link>
          <br />
          Multiple Modules | <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts
        </li>
      </ul>

      <h3 id="wd-quizzes-title">
        QUIZZES 20% of Total <button>+</button>
      </h3>
      <ul id="wd-quiz-list">
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/Q1" className="wd-assignment-link">
            Q1 - HTML Quiz
          </Link>
          <br />
          <b>Due</b> May 10 at 11:59pm | 20 pts
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/Q2" className="wd-assignment-link">
            Q2 - CSS Quiz
          </Link>
          <br />
          <b>Due</b> May 17 at 11:59pm | 20 pts
        </li>
      </ul>

      <h3 id="wd-exams-title">
        EXAMS 25% of Total <button>+</button>
      </h3>
      <ul id="wd-exam-list">
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/E1" className="wd-assignment-link">
            E1 - Midterm Exam
          </Link>
          <br />
          <b>Due</b> Jun 1 at 11:59pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/E2" className="wd-assignment-link">
            E2 - Final Exam
          </Link>
          <br />
          <b>Due</b> Jun 20 at 11:59pm | 100 pts
        </li>
      </ul>

      <h3 id="wd-project-title">
        PROJECT 15% of Total <button>+</button>
      </h3>
      <ul id="wd-project-list">
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/P1" className="wd-assignment-link">
            P1 - Final Project
          </Link>
          <br />
          <b>Due</b> Jun 15 at 11:59pm | 100 pts
        </li>
      </ul>
    </div>
  );
}