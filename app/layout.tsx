import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LivrUp — Don't Cook, Just Click",
  description: "Livraison de repas à Djibouti",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#E5E5E5' }}>
        {children}
      </body>
    </html>
  );
}