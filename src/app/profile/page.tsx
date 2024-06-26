/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="h-screen w-full sm:w-4/5 right-0 absolute sm:p-12">
        <p>Cargando...</p>
      </div>
    );
  }
  if (session && session.user && session.user.email) {
    return (
      <main className="h-auto w-full sm:w-4/5 right-0 absolute flex flex-col bg-slate-200">
        <p>jhosbel</p>
      </main>
    );
  }
  return <div>Profile</div>;
};

export default Profile;
