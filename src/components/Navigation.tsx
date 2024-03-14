"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  console.log({ session, status });

  return (
    <aside className="relative">
      {/* Version Escritorio */}

      <nav className="hidden sm:block sm:w-1/5 fixed top-0 left-0 h-screen bg-gray-400">
        <div className="h-full flex flex-col justify-between">
          <div className="pt-8">
            <h2 className="text-white text-xl font-semibold px-4 mb-4">
              <Link href={"/"}>Complet Fitness</Link>
            </h2>
            <ul className="space-y-2">
              <li className="text-gray-800 hover:text-white cursor-pointer px-4 py-2">
                <Link href={"/training"}>Entrenamiento</Link>
              </li>
              <li className="text-gray-800 hover:text-white cursor-pointer px-4 py-2">
                <Link href={"/feeding"}>Alimentación</Link>
              </li>
              {!session ? (
                <>
                  <li className="text-gray-800 hover:text-white cursor-pointer px-4 py-2">
                    <Link href={"/register"}>Registrarse</Link>
                  </li>
                  <li className="text-gray-800 hover:text-white cursor-pointer px-4 py-2">
                    <Link href={"/login"}>Entrar</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-gray-800 hover:text-white cursor-pointer px-4 py-2">
                    <button onClick={() => signOut()}>Salir</button>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="pb-8">
            {/* Aca un footer o algo mas */}
            <h1 className="text-white">Jhosbel</h1>
          </div>
        </div>
      </nav>

      {/* Version Mobile */}

      <nav className="sm:hidden fixed top-0 left-0 w-full z-50 bg-gray-400">
        <div className="flex justify-between items-center px-4 h-16">
          <h2 className="text-white text-xl font-semibold">
            <Link href={"/"}>Complet Fitness</Link>
          </h2>
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6 fill-current"
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
          <div className="bg-gray-400 py-4">
            <ul className="flex flex-col items-center space-y-2">
              <li className="text-gray-800 hover:text-white cursor-pointer px-4 py-2">
                <Link href={"/training"}>Entrenamiento</Link>
              </li>
              <li className="text-gray-800 hover:text-white cursor-pointer px-4 py-2">
                <Link href={"/feeding"}>Alimentación</Link>
              </li>
              {/* Agrega más elementos de menú según sea necesario */}
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
}
