/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import useAuthAndApi from "../api/training";
import { useEffect, useState } from "react";

const Profile = () => {
  const { data: session, status } = useSession();
  const { getOneUser } = useAuthAndApi();
  const [friends, setFriends] = useState([]);
  const [friendInfo, setFriendInfo] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (friends.length === 0) return;

      const infoPromises = friends.map(async (friendId: string) => {
        const res = await getOneUser(friendId);
        return res.json();
      });
      const friendData = await Promise.all(infoPromises);
      setFriendInfo(friendData);
    };
    fetchData();
  }, [friends]);

  useEffect(() => {
    if (session && session.user && session.user.id) {
      getOneUser(session?.user.id)
        .then((res) => res.json())
        .then((data) => setFriends(data.friendList || []));
    }
  }, [session]);

  console.log(friendInfo);

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
          <h2>Lista de amigos:</h2>
          {friendInfo &&
            friendInfo.map((item) => (
              <div key={item.id}>
                <p>{item.name}</p>
                <p>{item.email}</p>
              </div>
            ))}
        </div>
      </main>
    );
  }
  return <div>Profile</div>;
};

export default Profile;
