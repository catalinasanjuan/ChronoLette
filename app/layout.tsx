import './globals.css';
import type { Metadata } from 'next';

import { Poppins, Dancing_Script, Crete_Round } from 'next/font/google';


import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });
const dancingScript = Dancing_Script({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Querido Yo Futuro | Letters to Future Self',
  description: 'Un espacio íntimo para escribir cartas a tu yo del futuro - Un diario digital para tus pensamientos y memorias.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={poppins.className}> {/* Cambia Playfair a Poppins */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
