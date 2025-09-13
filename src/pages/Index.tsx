import HeroSection from "@/components/HeroSection";
import ProductCategories from "@/components/ProductCategories";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import EnquireNow from "@/components/EnquireNow";
import Chatbot from "@/components/Chatbot";
import MainProducts from "@/components/MainProduct";
import ZenxAbout from "@/components/ZenxAbout";
import { slides } from "../api/slidesData";
import { categories } from "@/api/main/categories";
import { menInnerwear } from '../api/men/menProductsData';
import { motion } from "framer-motion";
import WomenProducts from "@/components/WomenProducts";
import { womenInnerwear } from "@/api/women/womenProductsData";
import MenProducts from "@/components/MenProducts";
import KidsProductDetails from "@/components/KidsProductDetails";
import KidsProducts from "@/components/KidsProducts";
import { kidsInnerwear } from "@/api/kids/kidsProductsData";
import ShadowContainer from "@/components/ShadowContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative flex flex-col gap-10">

      {/* Hero Section */}
      <HeroSection slides={slides} />

      {/* Product Categories */}
          <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6">
        <div className="relative rounded-[8px] overflow-hidden w-full max-w-[1600px] mx-auto shadow-2xl">
      <ProductCategories
        title="Explore Our Categories"
        description="Premium feel, emphasizes soft fit"
        categories={categories}
      />
      </div>
      </div>

      {/* Trending Products */}
            <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6">
        <div className="relative rounded-[8px] overflow-hidden w-full max-w-[1600px] mx-auto shadow-2xl">
      <MenProducts
        productsData={menInnerwear.filter(innerwear =>
          innerwear.tag?.includes("HotPick")
        )}
        title="🔥 Trending Products"
        description="Stay ahead with these top-selling, stylish innerwear picks"
      />
      </div>
      </div>

      {/* WomenProducts */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6">
        <div className="relative rounded-[8px] overflow-hidden w-full max-w-[1600px] mx-auto shadow-2xl">
      <WomenProducts
        productsData={womenInnerwear}
        title="Women’s Choice"
        description="Explore our curated collection of premium innerwear, designed for comfort, style, and lasting quality"
      />
      </div>
      </div>
    {/* New Arrivals Section */}
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6">
<div className="relative rounded-[8px] overflow-hidden w-full max-w-[1600px] mx-auto shadow-2xl">
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
    <MainProducts
      productsData={menInnerwear.filter(innerwear =>
        innerwear.tag?.includes("New Arrivals")
      )}
      title=""
      description=""
    />
  </motion.div>
</div>
</div>


{/* Kids Products Section */}
<div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6">
  <div className="rounded-2xl shadow-2xl bg-white overflow-hidden">
    <KidsProducts
      productsData={kidsInnerwear}
      title="Kids Products"
      description="Stay ahead with these top-selling, stylish innerwear picks"
    />
  </div>
</div>


      {/* Best Sellers Section */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6">
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
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-transparent rounded-[8px]" />

    {/* Centered Text */}
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-black drop-shadow-2xl mb-2">
        Best Sellers
      </h2>
      <p className="text-base md:text-lg max-w-3xl px-4 py-2 rounded-md text-red-700 shadow-sm">
        Discover our most popular, globally acclaimed innerwear that combines
        unmatched quality with timeless style. Trusted by customers worldwide.
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
    <MenProducts
      productsData={menInnerwear.filter(innerwear =>
        innerwear.tag?.includes("Best Seller")
      )}
      title=""
      description=""
    />
  </motion.div>
</div>
</div>

{/* Users' Choice Section with Red Background and Balanced Margins */}
<div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6">
<div className="relative w-full overflow-hidden my-12 rounded-[12px] shadow-2xl">
  {/* Full-width Background Image with Shadow */}
  <div
    className="absolute inset-0 h-full w-full bg-cover bg-center rounded-[12px] shadow-2xl"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1590073249373-1f8f0913e028?auto=format&fit=crop&w=1600&q=80')",
    }}
  />

  {/* Red Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700/90 rounded-[12px]" />

  {/* Section Header */}
  <motion.div
    className="relative z-10 flex flex-col items-center justify-center text-center py-10 px-6 max-w-[1400px] mx-6 md:mx-12"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl mb-4">
      Users’ Choice
    </h2>
    <p className="text-black text-lg md:text-xl max-w-3xl px-4 py-2 rounded-md ">
      Discover the products loved by our users worldwide! Handpicked favorites for style, comfort, and premium appeal.
    </p>
  </motion.div>

  {/* Product Cards Carousel */}
  <motion.div
    className="relative z-10 px-6 md:px-12 py-10 max-w-[1400px] mx-6 md:mx-12"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <WomenProducts
      productsData={womenInnerwear}
      title=""
      description=""
    />
  </motion.div>
</div>
</div>





      {/* Enquire Now Section */}
      <ShadowContainer>
      <EnquireNow />
      </ShadowContainer>

      {/* About Section */}
      <ShadowContainer>
      <ZenxAbout />
        </ShadowContainer>
      {/* Footer */}

      {/* Sidebar */}
      <Sidebar />

      {/* Floating Chatbot */}
    </div>
  );
};

export default Index;
