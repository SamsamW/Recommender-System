import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./default/globals.css";
import {createTheme, ThemeProvider} from "@mui/system";
import {CssBaseline} from "@mui/material";
import theme from '@/theme';


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <body style={{backgroundColor:"white"}} className={inter.className}>{children}</body>
        </ThemeProvider>
        </html>
    );
}
