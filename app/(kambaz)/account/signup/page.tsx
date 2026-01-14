import Link from "next/link";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input placeholder="username" className="wd-username" defaultValue='jdoe' /><br/>
      <input placeholder="password" type="password" className="wd-password" defaultValue='sdvf.ndfas'/><br/>
      <input placeholder="verify password"
             type="password" className="wd-password-verify" defaultValue='sdvf.ndfas' /><br/>
      <Link  href="profile" > <button>Sign up</button> </Link><br />
      <Link  href="signin" > Sign in </Link>
    </div>
);}
