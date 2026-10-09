import AuthModal from "@/components/auth/AuthModal";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";
import Numbers from "@/components/home/Numbers";
import Reviews from "@/components/home/Reviews";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Reviews />
      <Numbers />
      <Footer />

    </>
  );
}
