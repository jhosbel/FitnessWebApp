/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import BarbellIcon from "./icons/Barbell";
import Dinner from "./icons/Dinner";
import LogOutIcon from "./icons/LogOutIcon";
import RegisterIcon from "./icons/RegisterIcon";
import LoginIcon from "./icons/LoginIcon";
import Footer from "./Footer";
import Dashboard from "./icons/Dashboard";
import Settings from "./icons/Settings";
import { io } from "socket.io-client";
import useAuthAndApi from "@/app/api/training";
import Modal from "./Modal";
import Alert from "./icons/Alert";
import Profile from "./icons/Profile";

export default function Navigation() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [notiCount, setNotiCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState();
  const [noti, setNoti] = useState<
    { _id: string; id: string; message: string; userId: string }[]
  >([]);
  const [noti2, setNoti2] = useState<number>(0);
  const {
    getNotifications,
    getProposalsByRecipientId,
    markReadTrueNotification,
    acceptProposal,
    getOneUser,
  } = useAuthAndApi();
  const [sum, setSum] = useState(0);
  const [proposal, setProposal] = useState<
    {
      _id: string;
      status: any;
      id: string;
      senderName: string;
    }[]
  >([]);
  const [profile, setProfile] = useState<any>();

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = async () => {
    setOpen(true);
    for (const notification of noti) {
      await markReadTrueNotification(notification._id);
    }
    await getNot();
  };

  console.log(session?.user.id);

  const getNot = async () => {
    if (!session || !session.user || !session.user.id) {
      console.log("Usuario no autenticado");
      return;
    }

    const res = await getNotifications(session?.user.id);
    const data = await res.json();
    const proposalList = await getProposalsByRecipientId(session?.user.id);
    const data2 = await proposalList.json();

    console.log(data);
    console.log(data2);

    const filteredData = data.filter((item: any) => !item.read);
    setNoti(filteredData);
    setProposal(data2);
  };

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL_SOCKET}`);
    if (session && session.user && session.user.id) {
      socket.on(session?.user.id, (data: any) => {
        console.log(data.message);
        //setNoti(noti2 + 1);
        setSum(noti.length + 1);
        setAlert(noti.length + data.message);
        setNotiCount((prev) => prev + 1);
        getNot();
      });
    }
    const fetchUser = async () => {
      if (session && session.user && session.user.id) {
        const res = await getOneUser(session?.user.id);
        const data = await res.json();
        console.log(data);
        setProfile(data);
      }
    };
    const fetchData = async () => {
      await getNot();
    };
    fetchUser();
    fetchData();
  }, [alert, noti2, notiCount, session]);

  const handleSignOut = async () => {
    const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL_SOCKET}`);
    socket.disconnect();
    await signOut();
  };

  const acceptFriend = async (
    proposalId: string,
    userId: string | undefined
  ) => {
    if (!userId) {
      console.error("ID de usuario indefinido");
      return;
    }
    await acceptProposal(proposalId, userId);
    console.log("Propuesta aceptada");
  };
  console.log(alert);
  console.log(sum);
  console.log(noti);
  console.log(noti2);
  console.log(proposal);
  console.log(notiCount);
  console.log(profile);
  return (
    <aside className="relative">
      {/* Version Escritorio */}

      <nav className="hidden sm:block sm:w-1/5 fixed top-0 left-0 h-screen border-solid bg-white text-slate-800">
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col h-20 items-center justify-center border-b-2">
            <div className="flex flex-col h-20 items-center justify-center">
              <h2 className="text-xl font-semibold px-4 text-slate-600">
                <Link href={"/"}>C-Fitness</Link>
              </h2>
            </div>
          </div>
          {session ? (
            <div className="flex justify-center flex-col items-center">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full w-40 h-40 overflow-hidden">
                  {
                    <img
                      src={
                        profile?.avatar === ""
                          ? "avatar-img.png"
                          : profile?.avatar
                      }
                      alt="profile image"
                      className="w-full h-full object-cover"
                    />
                  }
                </div>
                <p>{profile?.name}</p>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex w-full justify-evenly">
            <ul>
              {session?.user.role === "admin" ? (
                <li className="cursor-pointer px-4 py-4 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                  <Dashboard />
                  <Link href={"/dashboard"}>Dashboard</Link>
                </li>
              ) : (
                ""
              )}
              <li className="cursor-pointer px-4 py-4 transition rounded-md flex gap-2 hover:bg-opacity-75 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                <BarbellIcon />
                <Link href={"/training"}>Entrenamiento</Link>
              </li>
              <li className=" cursor-pointer px-4 py-4 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                <Dinner />
                <Link href={"/feeding"}>Alimentación</Link>
              </li>
              {session ? (
                <>
                  <li className=" cursor-pointer px-4 py-4 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <Profile />
                    <Link href={"/profile"}>Perfil</Link>
                  </li>
                  <li className=" cursor-pointer px-4 py-4 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <Settings />
                    <Link href={"/settings"}>Configuraciones</Link>
                  </li>
                  <li
                    onClick={handleOpenModal}
                    className=" cursor-pointer px-4 py-4 hover:bg-opacity-75 transition rounded-md flex hover:bg-slate-800 hover:border-slate-950 hover:text-white"
                  >
                    <div className="gap-2 flex">
                      <p
                        className={`${
                          noti.length === 0 ? "hidden" : "absolute"
                        } right-28 top-[42rem] w-6 h-6 rounded-full text-center bg-red-500/70`}
                      >
                        {noti.length === 0 ? "" : noti.length}
                      </p>
                      <Alert />
                      <p>Notificaciones</p>
                    </div>
                  </li>
                </>
              ) : (
                ""
              )}
              {!session ? (
                <>
                  <li className="cursor-pointer px-4 py-4 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <RegisterIcon />
                    <Link href={"/register"}>Registrarse</Link>
                  </li>
                  <li className="cursor-pointer px-4 py-4 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <LoginIcon />
                    <Link href={"/login"}>Entrar</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="cursor-pointer px-4 py-4 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <LogOutIcon />
                    <button onClick={handleSignOut}>Salir</button>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="h-20 flex flex-col border-t-2 justify-center">
            {/* Aca un footer o algo mas */}
            <Footer />
          </div>
        </div>
      </nav>

      <Modal isOpen={open} onClose={handleCloseModal}>
        {Array.isArray(proposal) &&
          proposal.map((item) => {
            return (
              <div key={item.id} className="flex gap-2">
                <p>{item.senderName} te ah enviado una solicitud de amistad</p>
                <button
                  onClick={() => acceptFriend(item._id, session?.user.id)}
                  disabled={item.status[0] === "accepted" ? true : false}
                >
                  aceptar
                </button>
                <button>rechazar</button>
              </div>
            );
          })}
      </Modal>

      {/* Version Mobile */}

      <nav className="sm:hidden fixed top-0 left-0 w-full z-50 bg-white text-slate-800">
        <div className="flex justify-between items-center px-4 h-16">
          <h2 className="text-xl font-semibold">
            <Link href={"/"} onClick={() => setIsOpen(false)}>
              C-Fitness
            </Link>
          </h2>
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6 fill-current text-slate-800"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16v2H4V6zm16 5H4v2h16v-2zm0 5H4v2h16v-2z"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="bg-white py-4 transition-all duration-300">
            <ul className="flex flex-col items-center space-y-2">
              {session?.user.role === "admin" ? (
                <li className="cursor-pointer px-4 py-4 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                  <Dashboard />
                  <Link href={"/dashboard"} onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li className="cursor-pointer px-4 py-2 flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                <BarbellIcon />
                <Link href={"/training"} onClick={() => setIsOpen(false)}>
                  Entrenamiento
                </Link>
              </li>
              <li className="cursor-pointer px-4 py-2 flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                <Dinner />
                <Link href={"/feeding"} onClick={() => setIsOpen(false)}>
                  Alimentación
                </Link>
              </li>
              {/* Agrega más elementos de menú según sea necesario */}
              {!session ? (
                <>
                  <li className="cursor-pointer px-4 py-2 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <RegisterIcon />
                    <Link href={"/register"} onClick={() => setIsOpen(false)}>
                      Registrarse
                    </Link>
                  </li>
                  <li className="cursor-pointer px-4 py-2 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <LoginIcon />
                    <Link href={"/login"} onClick={() => setIsOpen(false)}>
                      Entrar
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className=" cursor-pointer px-4 py-4 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <Settings />
                    <Link href={"/settings"} onClick={() => setIsOpen(false)}>
                      Configuraciones
                    </Link>
                  </li>
                  <li className="cursor-pointer px-4 py-2 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <LogOutIcon />
                    <button onClick={handleSignOut}>Salir</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
}
