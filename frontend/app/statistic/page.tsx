"use client";
import { Menu } from "../Menu";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Descriptive from "../Descriptive";
import { Distribution } from "../Distribution";
import { Correlation } from "../Correlation";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Page() {
  const [selectedMenu, setSelectedMenu] = useState('');

  useEffect(() => {
    {!selectedMenu ? setSelectedMenu('Descriptive'): ""};
  }, [selectedMenu])

  return (
    <main className={`min-h-screen flex flex-col ${poppins.className} max-h-screen`}>
      <Navbar />
      <div className="grid grid-cols-3 flex-grow gap-5 overflow-hidden">
        <div className="grid col-span-1 h-full">
          <ul className="menu rounded-box w-full shadow-xl px-20 py-30 flex flex-col justify-between">
            <li
              className={`mb-10 text-xl ${
                selectedMenu === 'Descriptive'
                  ? 'bg-[#FF6B6B] font-bold rounded-full py-2 px-4 text-white'
                  : ''
              }`}
              onClick={() => setSelectedMenu('Descriptive')}
            >
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Descriptive
              </a>
            </li>
            <li
              className={`mb-10 text-xl ${
                selectedMenu === 'Distribution'
                  ? 'bg-[#FF6B6B] font-bold rounded-full py-2 px-4 text-white'
                  : ''
              }`}
              onClick={() => setSelectedMenu('Distribution')}
            >
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Distribution
              </a>
            </li>
            <li
              className={`mb-10 text-xl ${
                selectedMenu === 'Correlation'
                  ? 'bg-[#FF6B6B] font-bold rounded-full py-2 px-4 text-white'
                  : ''
              }`}
              onClick={() => setSelectedMenu('Correlation')}
            >
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Correlation
              </a>
            </li>
          </ul>
        </div>

        {/* Scrollable Content */}
        <div className="col-span-2 px-10 py-10 overflow-y-auto h-[calc(100vh-64px)]">
          {selectedMenu === 'Descriptive' && <Descriptive />}
          {selectedMenu === 'Distribution' && <Distribution />}
          {selectedMenu === 'Correlation' && <Correlation />}
        </div>
      </div>
    </main>
  );
}
