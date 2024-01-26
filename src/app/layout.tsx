import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Farcompass",
    description: "Generate a political compass from your Farcaster casts",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light">
            <body
                className={`${inter.className} min-h-screen w-screen overflow-x-hidden flex flex-col relative py-8 px-12`}
            >
                <Image
                    fill
                    src="/background.svg"
                    className="object-cover object-center -z-10 opacity-25"
                    alt=""
                />
                <Toaster />
                <header className="w-full justify-center flex md:justify-start">
                    <Image
                        src="/farcompass.png"
                        width={2048}
                        height={210.59}
                        className="h-8 md:h-6 w-auto"
                        alt="Farcompass"
                    />
                </header>
                <main className="flex-1 flex items-center">{children}</main>
                <footer className="w-full text-zinc-400 text-sm flex justify-center lg:justify-end">
                    <span className="flex text-lg md:text-base gap-1">
                        Made by{" "}
                        <Link
                            className="underline"
                            href="https://warpcast.com/gregfromstl"
                            target="_blank"
                        >
                            @gregfromstl
                        </Link>
                        🤟
                    </span>
                </footer>
            </body>
        </html>
    );
}
