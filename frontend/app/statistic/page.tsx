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
        <Menu/>
    </main>
  );
}
