import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import "@workspace/ui/themes.css";
import { Provider as ThemeProvider } from "@workspace/ui/theme/provider";
import { TrpcReactQueryProvider } from "@/trpc/provider";
import { cn } from "@workspace/ui/lib/utils";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Wrapper as ThemeWrapper } from "@workspace/ui/theme/wrapper";
import { Toaster } from "@workspace/ui/components/sonner";
import { Metadata } from "next";
import { NoAuthProvider } from "@no-auth/next";

const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "No Auth",
  description: "Say, Good bye to Auth hiccups!",
  keywords: ["Authentication", "Authorization", "SSO"],
  icons: {
    icon: [
      {
        url: "/favicon.icon",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon.icon",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "bg-background overscroll-none font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <NoAuthProvider>
          <ThemeWrapper>
            <ThemeProvider
              enableSystem
              attribute="class"
              defaultTheme="system"
              disableTransitionOnChange
            >
              <NuqsAdapter>
                <TrpcReactQueryProvider>
                  {children}
                  <Toaster />
                </TrpcReactQueryProvider>
              </NuqsAdapter>
            </ThemeProvider>
          </ThemeWrapper>
        </NoAuthProvider>
      </body>
    </html>
  );
}
