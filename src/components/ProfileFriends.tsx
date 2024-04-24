/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useAuthAndApi from "@/app/api/training";

type UserData = {
  id: string;
  friendList?: string[]; // Definimos friendList como un array de strings opcionales
};

const ProfileFriends = () => {
  const { data: session, status } = useSession();
  const { getOneUser, getAllforCoach, getAllforUsers } = useAuthAndApi();
  const [friends, setFriends] = useState<string[]>([]);
  const [friendInfo, setFriendInfo] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    if (session && session.user && session.user.id) {
      getOneUser(session?.user.id)
        .then((res) => res.json())
        .then((data: UserData) => {
          const { friendList = [] } = data;
          const updateFriendList = [...friendList, session.user.id];
          setFriends(updateFriendList);
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
      const filteredFriendData = friendData.filter(
        (user) => user._id !== session?.user?.id
      );
      setFriendInfo(filteredFriendData);
    };

    fetchData();
  }, [friends, session]);

  const filterArry = allUsers.map((i) => i._id);
  const filterIds = filterArry.filter((id) => !friends.includes(id));
  const filteredComplete = allUsers.filter((e) => filterIds.includes(e._id));
  return (
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
  );
};

export default ProfileFriends;
