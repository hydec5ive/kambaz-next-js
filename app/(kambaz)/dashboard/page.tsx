import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpeg" width={200} height={150} alt="React JS" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/4390" className="wd-dashboard-course-link">
            <Image src="/images/ml-finance.jpeg" width={200} height={150} alt="Machine Learning in Finance" />
            <div>
              <h5>FINA4390 Machine Learning in Finance</h5>
              <p className="wd-dashboard-course-title">
                Machine Learning in Finance
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/4400" className="wd-dashboard-course-link">
            <Image src="/images/ml.jpeg" width={200} height={150} alt="Machine Learning" />
            <div>
              <h5>DS4400 Machine Learning</h5>
              <p className="wd-dashboard-course-title">
                Machine Learning fundamentals
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/4350" className="wd-dashboard-course-link">
            <Image src="/images/finance.jpeg" width={200} height={150} alt="Financial Data Modeling" />
            <div>
              <h5>FINA4350 Financial Data Modeling</h5>
              <p className="wd-dashboard-course-title">
                Financial data analysis and modeling
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/3304" className="wd-dashboard-course-link">
            <Image src="/images/writing.jpeg" width={200} height={150} alt="Advanced Writing" />
            <div>
              <h5>ENGW3304 Advanced Writing</h5>
              <p className="wd-dashboard-course-title">
                Advanced writing in the disciplines
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/2301" className="wd-dashboard-course-link">
            <Image src="/images/accounting.jpeg" width={200} height={150} alt="Managerial Accounting" />
            <div>
              <h5>ACCT2301 Managerial Accounting</h5>
              <p className="wd-dashboard-course-title">
                Managerial accounting principles
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/courses/4200" className="wd-dashboard-course-link">
            <Image src="/images/dataviz.jpeg" width={200} height={150} alt="Data Visualization" />
            <div>
              <h5>DS4200 Data Visualization</h5>
              <p className="wd-dashboard-course-title">
                Information presentation and visualization
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}