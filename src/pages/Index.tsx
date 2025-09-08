import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCategories from "@/components/ProductCategories";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import About from "@/components/About";
import EnquireNow from "@/components/EnquireNow";
import Chatbot from "@/components/Chatbot";
import TrendingProducts from "@/components/TrendingProducts";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      
      {/* Top Section */}
      <HeroSection />
      <ProductCategories />
      {/* <About /> */}
      <TrendingProducts/>
      {/* Product Grid Section */}
      {/* <ProductGrid /> */}

      {/* Enquire Now Section */}
      <EnquireNow />

      {/* Footer */}
      <Footer />

      {/* Sidebar for Navigation */}
      <Sidebar />

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
