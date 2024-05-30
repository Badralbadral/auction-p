import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import CarProvider from "@/context/DataContext";
import { MainLogo } from "@/svgs/TabLogo";
import { HeaderDiff } from "@/components/HeaderDiff/Header";

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
    <div>
      <CarProvider>
        <HeaderDiff />
        {children}
        <Footer />
      </CarProvider>
    </div>
  );
};
export default RootLayout;
