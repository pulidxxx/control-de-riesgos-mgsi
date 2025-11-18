import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Proyecto de Gestión de Riesgos | Banco de Bogotá",
    description:
        "Metodología de Análisis y Gestión de Riesgos de Seguridad de la Información - Universidad Distrital Francisco José de Caldas",
    icons: {
        icon: [
            {
                url: "/icon.svg",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/icon.svg",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/icon.svg",
                type: "image/svg+xml",
            },
        ],
        apple: "/icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={`${inter.className} font-sans antialiased`}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
