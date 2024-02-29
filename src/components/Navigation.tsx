"use client"
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="w-1/5 fixed top-0 bottom-0 lg:left-0 p-2 overflow-y-auto text-center bg-gray-400">
      <ul>
        <li>
          <Link href={'/'}>Inicio</Link>
        </li>
        <li>
            <Link href={'/perro'}>Perro</Link>
        </li>
        <li>
            <Link href={'/training'}>Entrenamiento</Link>
        </li>
      </ul>
    </nav>
  );
}
