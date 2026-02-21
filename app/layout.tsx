import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CargoSync - Fleet Flow",
  description: "Premium fleet management command center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-dark-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
