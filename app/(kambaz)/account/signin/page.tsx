import Link from "next/link";
export default function Signin() {
 return (
   <div id="wd-signin-screen">
     <h3>Sign in</h3>
     <input placeholder="username" className="wd-username" defaultValue='jdoe'/> <br />
     <input placeholder="password" type="password" className="wd-password" defaultValue='asdkjasldjalk'/> <br />
     <Link href="/dashboard" id="wd-signin-btn"> <button>Sign in</button> </Link> <br />
     <Link href="signup" id="wd-signup-link"> Sign up </Link>
   </div>
);}
