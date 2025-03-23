"use client";
import { Menu } from "../Menu";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Page() {
  return (
    <main>
        <Navbar/>
        <div className="card card-dash bg-base-100 w-full flex-grow py-1 px-6 rounded-lg overflow-hidden h-full">
          <div className="card-body p-0 bg-[#EDFFE7] rounded-lg h-full">
            <div className="grid grid-cols-3 gap-4 h-full p-4 flex flex-col">
              <div className="col-span-1 bg-[#FFFACB] h-full w-full">
                <Menu />
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}
