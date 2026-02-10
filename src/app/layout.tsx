import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/i18n";

export const metadata: Metadata = {
  title: "One Step Marketing | Raqamli Marketing Agentligi",
  description: "One Step Marketing — biznesingizni onlayn rivojlantirish uchun zamonaviy raqamli marketing xizmatlari. SMM, target reklama, sayt yaratish va brending yechimlari.",
  openGraph: {
    title: "One Step Marketing | Raqamli Marketing Agentligi",
    description: "Biznesingizni yangi bosqichga olib chiqamiz. Professional marketing strategiyalar va natijaga yo‘naltirilgan yechimlar.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
    url: "https://one-step-web-t746.vercel.app/",
  },
  icons: {
    icon: "/favicon.ico",
  }
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
