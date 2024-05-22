'use client'
import Navbar from "@repo/components/Navbar";
import { theme } from "@repo/theme";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { Player } from "@repo/components/Player";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@repo/providers/react-query";
import {useAuth} from "@repo/hooks/useAuth";
import {useRouter} from "next/navigation";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const {currentUser} = useAuth();
    const router = useRouter();
    if (!currentUser){
        router.push('/signIn')
    }
  return (
    <html lang="en">
      <body className={inter.className} >
        <QueryProvider>
          {/*<ThemeProvider>*/}
          {/*  <CssBaseline />*/}
            {currentUser&&(<><Navbar /><Container style={{ margin: "90px" }}>{children}</Container>
                    <Player /></>)
                }
            {
                !currentUser&&children
            }


          {/*</ThemeProvider>*/}
        </QueryProvider>
      </body>
    </html>
  );
}
