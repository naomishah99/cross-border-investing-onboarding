import type { Metadata } from "next";
import { Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins',
    display: 'swap',
});

const robotoMono = Roboto_Mono({
    weight: ['400', '500', '600'],
    subsets: ['latin'],
    variable: '--font-roboto-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "CrossBorder Invest - Invest Across Borders with Confidence",
    description: "Seamless cross-border investment platform for Indians living in the US. Manage your US and India investments in one place.",
    keywords: ["cross-border investment", "NRI investment", "US India investment", "NRE NRO accounts"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${poppins.variable} ${robotoMono.variable}`}>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
