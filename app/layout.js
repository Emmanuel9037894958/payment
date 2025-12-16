import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClientGate from "./ClientGate";

export const metadata = {
  title: "ZentraPay",
  description: "Secure multi-payment system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientGate>
          <Navbar />
          {children}
          <Footer />
        </ClientGate>
      </body>
    </html>
  );
}
