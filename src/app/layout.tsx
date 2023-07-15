import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./navbar";
import Title from "./title";
import Footer from "./footer";
import { QueryProvider } from "./queryprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo List - Advanced",
  description: "Advanced Todo List - Testing various technologies",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={`${inter.className} h-full bg-gray-100`}>
        <QueryProvider>
          <div className="min-h-full">
            <div className="bg-slate-950 pb-32">
              <NavBar />
              <header className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <Title />
                </div>
              </header>
            </div>
            <main className="-mt-32 min-h-[77vh]">
              <div className="mx-auto max-w-screen-2xl px-4 pb-12 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                  {children}
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
