/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import ListTrainingData from "@/components/ListTrainingData";
import ProfileFriends from "@/components/ProfileFriends";

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
        <ProfileFriends />
        <ListTrainingData />
      </main>
    );
  }
  return <div>Profile</div>;
};

export default Profile;
