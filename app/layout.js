// app/layout.js
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';

// Define your fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // Define as a CSS variable
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair', // Define as a CSS variable
});

export const metadata = {
  title: 'Modish Chic',
  description: 'Your Personal AI-Powered Modest Fashion Assistant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}