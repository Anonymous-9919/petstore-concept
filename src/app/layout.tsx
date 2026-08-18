import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "Pet Store | بت ستور - Kuwait's #1 Online Pet Store",
    template: "%s | Pet Store | بت ستور",
  },
  description:
    "Kuwait's trusted online pet store offering premium pet food, accessories, and supplies for dogs, cats, birds, fish, and small pets. Free delivery on orders over KD 10.",
  keywords: [
    "pet store",
    "pet food",
    "dog food",
    "cat food",
    "pet accessories",
    "Kuwait",
    "متجر حيوانات",
    "طعام حيوانات",
  ],
  openGraph: {
    title: "Pet Store | بت ستور",
    description:
      "Kuwait's trusted online pet store offering premium pet food, accessories, and supplies.",
    url: "https://petstorekwt-concept.vercel.app",
    siteName: "Pet Store | بت ستور",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Arabic:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
