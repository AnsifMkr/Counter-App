import './globals.css';

export const metadata = {
  title: 'Counter App',
  description: 'A responsive counter with theme switcher and localStorage',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors duration-300">{children}</body>
    </html>
  );
}
