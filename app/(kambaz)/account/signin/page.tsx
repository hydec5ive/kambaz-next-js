"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormControl, Button, Alert } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
export default function Signin() {
  const [credentials, setCredentials] = useState<any>({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Unable to login");
    }
  };
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <FormControl
        className="mb-2"
        placeholder="username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <FormControl
        className="mb-2"
        placeholder="password"
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <Button className="w-100 mb-2" onClick={signin}>
        Sign in
      </Button>
      <Link href="/account/signup">Sign up</Link>
    </div>
  );
}