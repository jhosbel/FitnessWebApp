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

export default function Navigation() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState();
  const [noti, setNoti] = useState<
    { id: string; message: string; userId: string }[]
  >([]);
  const [noti2, setNoti2] = useState<number>(0);
  const { getNotifications, getProposalsByRecipientId, getOneUser } =
    useAuthAndApi();
  const [sum, setSum] = useState(0);
  const [proposal, setProposal] = useState<{ id: string; senderId: string }[]>(
    []
  );
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = async () => {
    setOpen(true);
  };

  const getNot = async () => {
    const res = await getNotifications("660460823aeb84730d9d53a2");
    const data = await res.json();
    const proposalList = await getProposalsByRecipientId(
      "660460823aeb84730d9d53a2"
    );
    const data2 = await proposalList.json();

    console.log(data);
    console.log(data2);

    const filteredData = data.filter((item: any) => !item.read);
    setNoti(filteredData);
    setNoti2(noti.length);
    setProposal(data2);
  };

  /* const getInfoSender = async (senderId: string) => {
    const userName = await getOneUser(senderId)
    const data = await userName.json()
    setUserName(data.userName)
  } */

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL_SOCKET}`);
    socket.on("660460823aeb84730d9d53a2", (data: any) => {
      console.log(data.message);
      setNoti(noti2 + 1);
      setSum(noti.length + 1);
      setAlert(noti.length + data.message);
    });
    const fetchData = async () => {
      await getNot();
    };
    fetchData();
  }, [alert, noti2]);

  /* const getInfoSender = async (senderId: any) => {
    const userName = await getOneUser(senderId);
    const data = await userName.json();
    return data.userName;
  }; */

  const handleSignOut = async () => {
    const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL_SOCKET}`);
    socket.disconnect();
    await signOut();
  };
  console.log(alert);
  console.log(sum);
  console.log(noti);
  console.log(noti2);
  console.log(proposal);
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
          <div className="pt-8 h-96">
            <ul className="space-y-2 px-8">
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
                  <li className=" cursor-pointer px-4 py-4 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <Settings />
                    <Link href={"/settings"}>Configuraciones</Link>
                  </li>
                  <li className="cursor-pointer px-4 py-4 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <LogOutIcon />
                    <button onClick={handleSignOut}>Salir</button>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div>
            <p>Alerta: {noti.length === 0 ? "" : noti.length}</p>
            <button onClick={handleOpenModal}>abrir</button>
          </div>
          <div className="h-20 flex flex-col border-t-2 justify-center">
            {/* Aca un footer o algo mas */}
            {/* <h1 className="text-center">© 2024 JhosbelDev. Ningun derecho reservado.</h1> */}
            <Footer />
          </div>
        </div>
      </nav>

      <Modal isOpen={open} onClose={handleCloseModal}>
        {Array.isArray(proposal) &&
          proposal.map((item) => {
            console.log("hola");
            return (
              <div key={item.id}>
                <p>{'jhosbel'}</p>
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
