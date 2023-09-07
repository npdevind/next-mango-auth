"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });

  const OnSignUp = async () => {
    try {
      setLoading(true);
      const res: any = await axios.post("/api/users/signup", user);
      router.push("/login");
      toast.success(res.data.message);
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
        <h1>Sign Up</h1>
        <hr />
        <label htmlFor="email" className="p-1">
          Email
        </label>
        <input
          className="p-2 border-solid text-black"
          type="text"
          name="email"
          value={user.email}
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

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
          onClick={OnSignUp}
          disabled={loading}
        >
          Sign Up
        </button>
        <Link href={"/login"}> Go to login</Link>
      </div>
    </>
  );
};

export default SignUp;
