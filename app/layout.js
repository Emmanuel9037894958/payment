import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import ClientProviders from "./ClientProviders";

export const metadata = {
  title: "ZentraPay",
  description: "Secure multi-payment system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
