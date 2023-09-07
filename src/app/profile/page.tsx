"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Profile = () => {
  const router = useRouter();
  const onLogOut = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Profile</h1>
      <button onClick={onLogOut}> logout </button>
    </>
  );
};

export default Profile;
