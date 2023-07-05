import { Orbitron } from "next/font/google";
import DesktopNavMenu from "./desktop-nav-menu";

const logoFont = Orbitron({ subsets: ["latin"], weight: ["400"] });

export default function NavBar() {
  return (
    <nav>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <span className={`mt-2 text-xl ${logoFont.className} text-white`}>
                To Do&apos;s
              </span>
            </div>
            <div className="hidden lg:ml-6 lg:block">
              <DesktopNavMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
