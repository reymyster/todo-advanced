import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./navbar";
import Title from "./title";
import Footer from "./footer";
import { QueryProvider } from "./queryprovider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en" className="h-full bg-secondary dark">
      <body className={`${inter.className} h-full bg-black`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <div className="min-h-full">
              <div className="bg-muted pb-32">
                {/* <div className="bg-slate-950 pb-32"> */}
                <NavBar />
                <header className="py-10">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Title />
                  </div>
                </header>
              </div>
              <main className="-mt-32 min-h-[77vh]">
                <div className="mx-auto max-w-screen-2xl px-4 pb-12 sm:px-6 lg:px-8">
                  <div className="rounded-lg bg-background px-5 py-6 shadow sm:px-6">
                    {children}
                  </div>
                </div>
              </main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
