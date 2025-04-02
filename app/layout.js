import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";
import ConfigContextProvider from "./components/config-context-provider";

const notoSansThai = Noto_Sans_Thai()

export const metadata = {
  title: "Drone App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${notoSansThai.className} antialiased`}
      >
        <Toaster />
        <Navbar />
        <ConfigContextProvider>{children}</ConfigContextProvider>
      </body>
    </html>
  );
}
