import { FaCalendar, } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBookBible } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoWechat } from "react-icons/io5";
import { FaInstagramSquare } from "react-icons/fa";

export default function ReactIconsSampler() {
  return (
    <div id="wd-react-icons-sampler" className="mb-4">
      <h3>React Icons Sampler</h3>
      <div className="d-flex">
        <FaSquareXTwitter className="fs-3 text" />
        <AiOutlineDashboard className="fs-3 text" />
        <FaBookBible className="fs-3 text" />
        <FaCalendar className="fs-3 text" />
        <FaInstagramSquare className="fs-3 text" />
        <IoLogoWechat className="fs-3 text" />
      </div>
    </div>
  );
}