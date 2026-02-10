import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/i18n";

export const metadata: Metadata = {
  title: "One Step Marketing - Digital Marketing Agency",
  description: "Professional marketing solutions to make your brand a market leader",
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32' },
      { url: '/icon.png', sizes: '512x512' }
    ],
    apple: '/apple-icon.png',
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
