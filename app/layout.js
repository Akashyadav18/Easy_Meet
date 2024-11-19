import Header from "@/components/Header";
import "./globals.css";
import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (

    <ClerkProvider>

      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {children}
          </main>
          <footer className="py-6 bg-blue-100">
            <div className=" container mx-auto px-4 text-center">
              <p>Footer</p>
            </div>
          </footer>

        </body>
      </html>

    </ClerkProvider>

  );
}
