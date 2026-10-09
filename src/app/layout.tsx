import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ReduxProvider from "@/redux/provider";
import "./globals.css";
import AuthInitializer from "@/components/auth/AuthInitializer";
import AuthModal from "@/components/auth/AuthModal";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Summarist",
  description: "Book summaries for busy people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ReduxProvider>
          <AuthInitializer />
          {children}

          <AuthModal />
        </ReduxProvider>
      </body>
    </html>
  );
}
