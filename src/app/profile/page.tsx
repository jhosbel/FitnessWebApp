/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import useAuthAndApi from "../api/training";
import { useEffect, useState } from "react";
import ListTrainingData from "@/components/ListTrainingData";

type UserData = {
  id: string;
  friendList?: string[]; // Definimos friendList como un array de strings opcionales
};

const Profile = () => {
  const { data: session, status } = useSession();
  const { getOneUser, getAllforCoach, getAllforUsers } = useAuthAndApi();
  const [friends, setFriends] = useState<string[]>([]);
  const [friendInfo, setFriendInfo] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  /* setFriends(data.friendList || []) */

  useEffect(() => {
    if (session && session.user && session.user.id) {
      getOneUser(session?.user.id)
        .then((res) => res.json())
        .then((data: UserData) => {
          const { friendList = [] } = data;
          const updateFriendList = [...friendList, session.user.id];
          setFriends(updateFriendList)
        });
    }
    if (session && session.user && session.user.role === "user") {
      getAllforUsers()
        .then((res) => res.json())
        .then((data) => setAllUsers(data));
    }

    if (session && session.user && session.user.role === "coach") {
      getAllforCoach()
        .then((res) => res.json())
        .then((data) => setAllUsers(data));
    }
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      if (friends.length === 0) return;

      const infoPromises = friends.map(async (friendId: string) => {
        const res = await getOneUser(friendId);
        return res.json();
      });
      const friendData = await Promise.all(infoPromises);
      const filteredFriendData = friendData.filter((user) => user._id !== session?.user?.id)
      setFriendInfo(filteredFriendData);
    };
    
    fetchData();
  }, [friends, session]);

  /* console.log(friends);
  console.log(friendInfo);
  console.log(session?.user.role);
  console.log(session?.user.id);
  console.log(session?.user.email);
  console.log(allUsers); */
  
  const filterArry = allUsers.map((i) => i._id)
  const filterIds = filterArry.filter((id) => !friends.includes(id))
  const filteredComplete = allUsers.filter((e) => filterIds.includes(e._id))
  
  /* console.log(filterIds)
  console.log(filteredComplete)
  console.log(filterArry) */

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
        <div>
          <div className="flex gap-4">
            {allUsers &&
              filteredComplete.map((item) => (
                <div key={item._id}>
                  <img
                    src={item.avatar === "" ? "avatar-img.png" : item.avatar}
                    alt="avatar"
                    className="max-w-16 max-h-20"
                  />
                  <p>{item.name}</p>
                  <button>Agregar</button>
                </div>
              ))}
          </div>
          <div>
            <h2>Lista de amigos:</h2>
            {friendInfo &&
              friendInfo.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.avatar === "" ? "avatar-img.png" : item.avatar}
                    alt="avatar"
                    className="max-w-16 max-h-20"
                  />

                  <p>{item.name}</p>
                </div>
              ))}
          </div>
        </div>
        <ListTrainingData />
      </main>
    );
  }
  return <div>Profile</div>;
};

export default Profile;
