"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast/headless";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  const OnLogIn = async () => {
    try {
      console.log(user);

      setLoading(true);
      const res: any = await axios.post("/api/users/login", user);
      if (res.data.status != 500) {
        toast.success("successfully login");
        router.push("/profile");
      } else {
        console.log(res.data.error);

        toast.error(res.data.error);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1>Login</h1>
        <hr />

        <label htmlFor="username" className="p-1">
          Username
        </label>
        <input
          className="p-2 border-solid text-black"
          type="text"
          name="username"
          value={user.username}
          placeholder="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <label htmlFor="password" className="p-1">
          Password
        </label>
        <input
          className="p-2 border-solid text-black"
          type="password"
          name="password"
          value={user.password}
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          className="flex flex-nowrap border-solid border-2 border-sky-500 p-2 mt-2 bg-cyan-950"
          onClick={OnLogIn}
          disabled={loading}
        >
          Login
        </button>
        <Link href={"/signup"}> Go to Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
