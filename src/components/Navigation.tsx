"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import BarbellIcon from "./icons/Barbell";
import Dinner from "./icons/Dinner";
import LogOutIcon from "./icons/LogOutIcon";
import RegisterIcon from "./icons/RegisterIcon";
import LoginIcon from "./icons/LoginIcon";
import Footer from "./Footer";
import Dashboard from "./icons/Dashboard";
import Settings from "./icons/Settings";

export default function Navigation() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

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
                    <button onClick={() => signOut()}>Salir</button>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="h-20 flex flex-col border-t-2 justify-center">
            {/* Aca un footer o algo mas */}
            {/* <h1 className="text-center">© 2024 JhosbelDev. Ningun derecho reservado.</h1> */}
            <Footer />
          </div>
        </div>
      </nav>

      {/* Version Mobile */}

      <nav className="sm:hidden fixed top-0 left-0 w-full z-50 bg-white text-slate-800">
        <div className="flex justify-between items-center px-4 h-16">
          <h2 className="text-xl font-semibold">
            <Link href={"/"} onClick={() => setIsOpen(false)}>C-Fitness</Link>
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
                  <Link href={"/dashboard"} onClick={() => setIsOpen(false)}>Dashboard</Link>
                </li>
              ) : (
                ""
              )}
              <li className="cursor-pointer px-4 py-2 flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                <BarbellIcon />
                <Link href={"/training"} onClick={() => setIsOpen(false)}>Entrenamiento</Link>
              </li>
              <li className="cursor-pointer px-4 py-2 flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                <Dinner />
                <Link href={"/feeding"} onClick={() => setIsOpen(false)}>Alimentación</Link>
              </li>
              {/* Agrega más elementos de menú según sea necesario */}
              {!session ? (
                <>
                  <li className="cursor-pointer px-4 py-2 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <RegisterIcon />
                    <Link href={"/register"} onClick={() => setIsOpen(false)}>Registrarse</Link>
                  </li>
                  <li className="cursor-pointer px-4 py-2 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <LoginIcon />
                    <Link href={"/login"} onClick={() => setIsOpen(false)}>Entrar</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className=" cursor-pointer px-4 py-4 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <Settings />
                    <Link href={"/settings"} onClick={() => setIsOpen(false)}>Configuraciones</Link>
                  </li>
                  <li className="cursor-pointer px-4 py-2 hover:bg-opacity-75 transition rounded-md flex gap-2 hover:bg-slate-800 hover:border-slate-950 hover:text-white">
                    <LogOutIcon />
                    <button onClick={() => signOut()}>Salir</button>
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
