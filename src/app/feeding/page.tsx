"use client";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function Feeding() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="h-screen absolute right-0 w-4/5">
      <h1>Proximamente</h1>
    </div>
  );
}
