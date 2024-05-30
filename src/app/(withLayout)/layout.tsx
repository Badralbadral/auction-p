import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import "react-toastify/dist/ReactToastify.css";
import CarProvider from "@/context/DataContext";
import { MainLogo } from "@/svgs/TabLogo";
import { Footer } from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luxury Car Auction",
  icons: `/${MainLogo}`,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={inter.className}>
      <CarProvider>
        <Header />
        {children}
        <Footer />
      </CarProvider>
    </div>
  );
};
export default RootLayout;
