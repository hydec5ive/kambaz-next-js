import Link from "next/link";
export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label><br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />

      <label htmlFor="wd-description">Description</label><br />
      <textarea id="wd-description" cols={50} rows={5} defaultValue="The assignment is available on..." />
      <br />
      <br />
      
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" type="number" defaultValue={100} />
            </td>
          </tr> 

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>

              </select>
            </td>
          </tr> 

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="PERCENTAGE">
                <option value="PERCENTAGE">Percentage</option>
                <option value="POINTS">Points</option>
                <option value="LETTER">Letter Grade</option>
              </select>
            </td>
          </tr> 

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="ONLINE">
                <option value="ONLINE">Online</option>
                <option value="PAPER">On Paper</option>
                <option value="EXTERNAL">External Tool</option>
              </select>
            </td>
          </tr>

          <tr>
            <td></td>
            <td>
              Online Entry Options<br />
              
              <input type="checkbox" id="wd-text-entry" defaultChecked={false} />
              <label htmlFor="wd-text-entry">Text Entry</label><br />

              <input type="checkbox" id="wd-website-url" defaultChecked={false} />
              <label htmlFor="wd-website-url">Website URL</label><br />

              <input type="checkbox" id="wd-media-recordings" defaultChecked={false} />
              <label htmlFor="wd-media-recordings">Media Recordings</label><br />

              <input type="checkbox" id="wd-student-annotation" defaultChecked={false} />
              <label htmlFor="wd-student-annotation">Student Annotation</label><br />

              <input type="checkbox" id="wd-file-upload" defaultChecked={false} />
              <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr> 

          <tr>
            <td></td>
            <td>
              <label htmlFor="wd-assign-to">Assign to</label>
            </td>
          </tr> 
    
          <tr>
            <td></td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr> 

          <tr>
            <td></td>
            <td>
              <label htmlFor="wd-due-date">Due</label>
            </td>
          </tr>

          <tr>
            <td></td>
            <td>
              <input id="wd-due-date" defaultValue="2024-05-13" />
            </td>
          </tr> 

          <tr>
            <td></td>
            <td>
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <label htmlFor="wd-available-until">Until</label>
            </td>
          </tr>

          <tr>
            <td></td>
            <td>
              <input type="date" id="wd-available-from" defaultValue="2024-05-06" />
            </td>
            <td>
              <input type="date" id="wd-available-until" defaultValue="2024-05-20" />
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <hr />
      <Link href="/courses/1234/assignments">
        <button>Cancel</button>
      </Link>
      <button>Save</button>
    </div>
  );
}