"use client";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Navbar from "./components/Navbar";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const pathname = usePathname();
  return (
    <Navbar/>
  );
}
