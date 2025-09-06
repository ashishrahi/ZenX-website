import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCategories from "@/components/ProductCategories";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import About from "@/components/About";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductCategories />
      <About/>
      <ProductGrid />
      <Footer />
      <Sidebar />
    </div>
  );
};

export default Index;
