import HeroSection from "@/components/HeroSection";
import ProductCategories from "@/components/ProductCategories";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import EnquireNow from "@/components/EnquireNow";
import Chatbot from "@/components/Chatbot";
import TrendingProducts from "@/components/TrendingProducts";
import ZenxAbout from "@/components/ZenxAbout";
import { slides } from "../api/slidesData";
import { categories } from "@/api/main/categories";
import { menInnerwear } from '../api/men/menProductsData'

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">

      {/* Top Section */}
      <HeroSection
        slides={slides}
      />
      <ProductCategories
        title="Explore Our Categories"
        description="Premium feel, emphasizes soft fit"
        categories={categories}
      />
      {/*TrendingProducts */}
      <TrendingProducts
        productsData={menInnerwear.filter((innerwear) =>
          innerwear.tag?.includes("HotPick")
        )}
        title="Trending Products"
        description="Check out our top-selling innerwear items"
      />

        {/*TrendingProducts */}
      <TrendingProducts
        productsData={menInnerwear.filter((innerwear) =>
          innerwear.tag?.includes("Best Seller")
        )}
        title="Best Seller"
        description="Comfort, style, and quality—these tops our bestsellers list"
      />

      {/* Enquire Now Section */}
      <EnquireNow />

      <ZenxAbout />


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
