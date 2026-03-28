"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormControl, Button, Alert } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
export default function Signup() {
  const [user, setUser] = useState<any>({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/account/profile");
    } catch (err: any) {
      setError(err.response?.data?.message || "Unable to signup");
    }
  };
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <FormControl
        className="mb-2"
        placeholder="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl
        className="mb-2"
        placeholder="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button className="w-100 mb-2" onClick={signup}>
        Sign up
      </Button>
      <Link href="/account/signin">Sign in</Link>
    </div>
  );
}