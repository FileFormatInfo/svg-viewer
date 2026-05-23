import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const FullPage = ({ children }: { children: React.ReactNode }) => {

  return (
    <main className="min-h-screen bg-[url('/images/backgrounds/memphis-mini.png')]">
      <div className="flex min-h-screen w-full flex-col overflow-clip">
        <Navbar />
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-6">
          {children}
        </div>
        <Footer />
      </div>
    </main>
  );
}

