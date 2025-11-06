import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polotno Reproduction",
  description: "Reproduction project for polotno issue",
};

export default function MinimalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

