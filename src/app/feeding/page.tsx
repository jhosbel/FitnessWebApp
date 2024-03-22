"use client";

import Footer from "@/components/Footer";
import Tools from "@/components/icons/Tools";

export default function Feeding() {

  return (
    <div className="h-full w-full sm:w-4/5 right-0 absolute sm:p-12 flex flex-col bg-slate-200 items-center justify-center">
      <div className="flex items-center gap-4">
        <Tools />
        <h1 className="text-4xl font-bold text-slate-700">Proximamente...</h1>
        <p></p>
      </div>
      <Footer className="md:hidden p-2 text-[0.5rem] mt-4" />
    </div>
  );
}
