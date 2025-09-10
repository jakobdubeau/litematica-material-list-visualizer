import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const minecraft = localFont({
  src: "../../public/fonts/MinecraftRegular-Bmg3.otf",
  variable: "--font-minecraft",
});

export const metadata = {
  title: "Litematica Material List Visualizer",
  description: "Upload and visualize Litematica material lists in a Minecraft-style inventory interface",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${minecraft.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
