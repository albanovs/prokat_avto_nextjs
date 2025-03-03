import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { TokenProvider } from "@/context/TokenProvider";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Аренда автомобилей",
  description: "Новые машины ведущих мировых производителей, таких как Renault, Hyundai, Volkswagen, Opel, Chevrolet, Kia и других. В парке есть автомобили разных классов, включая эконом, стандарт, бизнес и премиум",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Header />
        <main className="lg:pt-10 pt-[100px]">
          <TokenProvider>{children}</TokenProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
