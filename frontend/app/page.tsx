import { Menu } from "./Menu";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Home() {
  return (
    <main className={poppins.className}>
      <div className="min-h-screen flex flex-col py-4">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center py-6 px-30">
            <h1 className="text-[#CD2323] text-4xl">Traffic</h1>
            <h1 className="text-[#FFDE59] text-4xl">Scape</h1>
          </div>
          <div className="flex p-3 flex-grow">
            <ul className="flex space-x-10 menu menu-horizontal bg-base-200 rounded-full px-6 py-2 shadow-lg">
              <li className="hover:bg-[#B8F2E3] rounded-full px-4">
                <a>Overview</a>
              </li>
              <li className="hover:bg-[#B8F2E3] rounded-full">
                <a>Statistic</a>
              </li>
              <li className="hover:bg-[#B8F2E3] rounded-full px-4">
                <a>Traffic Prediction</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="card card-dash bg-base-100 w-full flex-grow py-1 px-6 rounded-lg overflow-hidden">
          <div className="card-body p-0 bg-[#EDFFE7] rounded-lg h-full">
            <div className="grid grid-cols-3 gap-4 h-full p-4 flex flex-col">
              <div className="col-span-1 bg-[#FFFACB] h-full">
                <Menu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
