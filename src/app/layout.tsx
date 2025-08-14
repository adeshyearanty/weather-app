import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather App - Real-time Forecast",
  description:
    "Get accurate, real-time weather updates for any location with temperature, humidity, wind speed, and more.",
  keywords: [
    "Weather App",
    "Real-time Weather",
    "Forecast",
    "Temperature",
    "Humidity",
    "Wind Speed",
    "OpenWeatherMap",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Weather App - Real-time Forecast",
    description:
      "Get accurate, real-time weather updates for any location with temperature, humidity, wind speed, and more.",
    url: "https://your-domain.com",
    siteName: "Weather App",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather App - Real-time Forecast",
    description:
      "Get accurate, real-time weather updates for any location with temperature, humidity, wind speed, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
