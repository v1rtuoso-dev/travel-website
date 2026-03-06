import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Dynamic Travel - Giá Trị Của Trải Nghiệm",
  description:
    "Dynamic Travel mang đến cho bạn những chuyến đi đáng nhớ với dịch vụ chuyên nghiệp, hành trình được thiết kế riêng và trải nghiệm du lịch đẳng cấp.",
  keywords: [
    "du lịch",
    "tour",
    "dynamic travel",
    "du lịch việt nam",
    "tour du lịch",
    "đặt tour",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
