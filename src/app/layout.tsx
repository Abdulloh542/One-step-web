import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/i18n";

export const metadata: Metadata = {
  title: "One Step Marketing - Digital Marketing Agency",
  description: "Professional marketing solutions to make your brand a market leader",
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
