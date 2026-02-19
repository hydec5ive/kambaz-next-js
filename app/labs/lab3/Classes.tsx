import "./Classes.css";

export default function Classes() {
  const color = "blue";
  const color_2 = "green";
  const dangerous = true;
  const dangerous_2 = false;


  return (
    <div id="wd-classes">
      <h2>Classes</h2>
      <div className="wd-bg-yellow wd-fg-black wd-padding-10px">
        Yellow background
      </div>
      <div className="wd-bg-blue wd-fg-black wd-padding-10px">
        Blue background
      </div>
      <div className="wd-bg-red wd-fg-black wd-padding-10px">
        Red background
      </div>
      <div className={`wd-bg-${color} wd-fg-black wd-padding-10px`}>
        Dynamic Blue background
      </div>
      <div className={`wd-bg-${color_2} wd-fg-black wd-padding-10px`}>
        Dynamic Green background
      </div>
      <div className={`${dangerous ? "wd-bg-red" : "wd-bg-green"} wd-fg-black wd-padding-10px`}>
        Dangerous background Red
      </div>
      <div className={`${dangerous_2 ? "wd-bg-red" : "wd-bg-green"} wd-fg-black wd-padding-10px`}>
        Dangerous background Green
      </div>
      <hr />
    </div>
  );}