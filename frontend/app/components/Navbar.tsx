"use client";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import Link from "next/link";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Navbar() {
  const pathname = usePathname();
  return (
    <main className={`${poppins.className} bg-[#F8FAFC] text-gray-800 flex flex-col py-4 px-6`}> 
      <header className="flex items-center justify-between py-4 px-6 bg-white shadow-md rounded-lg">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold text-[#E63946]">Traffic</h1>
          <h1 className="text-4xl font-bold text-[#F4A261]">Scape</h1>
        </div>
        <nav>
          <ul className="flex space-x-6 bg-white rounded-full shadow-md px-6 py-2">
            <li className={`rounded-full px-4 py-2 ${pathname === "/" ? "bg-[#457B9D] text-white" : "hover:bg-[#A8DADC] hover:text-[#1D3557]"}`}>
              <Link href="/">Overview</Link>
            </li>
            <li className={`rounded-full px-4 py-2 ${pathname === "/statistic" ? "bg-[#457B9D] text-white" : "hover:bg-[#A8DADC] hover:text-[#1D3557]"}`}>
              <Link href="/statistic">Statistic</Link>
            </li>
            <li className={`rounded-full px-4 py-2 ${pathname === "/prediction" ? "bg-[#457B9D] text-white" : "hover:bg-[#A8DADC] hover:text-[#1D3557]"}`}>
              <Link href="/prediction">Traffic Prediction</Link>
            </li>
          </ul>
        </nav>
      </header>
    </main>
  );
}
