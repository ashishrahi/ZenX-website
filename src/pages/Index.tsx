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
import { menInnerwear } from '../api/men/menProductsData';
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative flex flex-col gap-10">

      {/* Hero Section */}
      <HeroSection slides={slides} />

      {/* Product Categories */}
      <ProductCategories
        title="Explore Our Categories"
        description="Premium feel, emphasizes soft fit"
        categories={categories}
      />

      {/* Trending Products */}
      <TrendingProducts
        productsData={menInnerwear.filter(innerwear =>
          innerwear.tag?.includes("HotPick")
        )}
        title="🔥 Trending Products"
        description="Stay ahead with these top-selling, stylish innerwear picks"
      />

      {/* Best Seller */}
      <TrendingProducts
        productsData={menInnerwear.filter(innerwear =>
          innerwear.tag?.includes("Best Seller")
        )}
        title="🏆 Best Seller"
        description="Our top-rated and most-loved innerwear collection"
      />

      {/* New Arrivals Section */}
      <div className="relative rounded-[8px] overflow-hidden w-full max-w-[1600px] mx-auto">
        {/* Background Image */}
        <div
          className="h-[200px] w-full bg-cover bg-center relative filter brightness-90 contrast-110 rounded-[8px]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1607083206978-1a0b30f9e568?auto=format&fit=crop&w=1600&q=80')",
          }}
        >
          {/* Gradient Overlay for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent rounded-[8px]" />

          {/* Centered Text */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-red-600 drop-shadow-2xl mb-2">
              New Arrivals
            </h2>
            <p className="text-base md:text-lg max-w-3xl px-4 py-2 rounded-md text-black shadow-sm">
              Explore our globally loved, premium innerwear collection crafted for
              style and unmatched comfort.
            </p>
          </motion.div>
        </div>

        {/* Product Carousel */}
        <motion.div
          className="relative z-10 px-5 py-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TrendingProducts
            productsData={menInnerwear.filter(innerwear =>
              innerwear.tag?.includes("New Arrivals")
            )}
            title=""
            description=""
          />
        </motion.div>
      </div>



      {/* Enquire Now Section */}
      <EnquireNow />

      {/* About Section */}
      <ZenxAbout />

      {/* Footer */}
      <Footer />

      {/* Sidebar */}
      <Sidebar />

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
