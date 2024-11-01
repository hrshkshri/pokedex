import "~/styles/globals.css";
import styles from "./index.module.css";
import { Inter } from "next/font/google";

import Provider from "~/app/_trpc/Provider";
import Sidebar from "./_components/Sidebar";
import { CssBaseline, Grid } from "@mui/material";
const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Pokedex",
  description: "Find pokemons",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={styles.main}>
          <Provider>
            <CssBaseline />
            <Sidebar/>
            {children}
          </Provider>
        </main>
      </body>
    </html>
  );
}
