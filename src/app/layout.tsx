import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/i18n";

export const metadata: Metadata = {
  metadataBase: new URL("https://one-step-web-t746.vercel.app/"),
  title: "One Step Marketing — Raqamli Marketing Agentligi",
  description: "One Step Marketing — SMM, target reklama, brending va marketing strategiyalari orqali biznesingizni o’stiramiz.",
  openGraph: {
    title: "One Step Marketing — Raqamli Marketing Agentligi",
    description: "One Step Marketing — SMM, target reklama, brending va marketing strategiyalari orqali biznesingizni o’stiramiz.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
    url: "https://one-step-web-t746.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <ErrorReporter />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
