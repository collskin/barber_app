import type { Metadata } from "next";
import { Inter, Roboto, Rubik } from "next/font/google";
import "./globals.css";
import AuthProvider from './context/AuthProvider'


const inter = Inter({ subsets: ["latin"] });
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Saša Barber",
  description: "Frizerski Salon Saša Barber, Kruševac",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <AuthProvider>
        <body className={rubik.className}>{children}</body>
      </AuthProvider>

    </html>
  );
}
