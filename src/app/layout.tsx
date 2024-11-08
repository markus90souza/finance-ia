import type { Metadata } from "next";

import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { FC, ReactNode } from "react";

import { Mulish } from "next/font/google";

const mulish = Mulish({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Finance.ai",
  description: "",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={`${mulish.className} dark antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
