import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import { TRPCProvider } from "./providers";

export const metadata: Metadata = {
  title: "TikTok Ads Dashboard",
  description: "A dashboard for managing TikTok Ads",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCProvider>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar className="w-64 border-r" />
              <main className="flex-1 p-6">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
