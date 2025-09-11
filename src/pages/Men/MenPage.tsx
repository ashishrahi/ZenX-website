import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCategories from "@/components/ProductCategories";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Chatbot from "@/components/Chatbot";
import TrendingProducts from "@/components/TrendingProducts";
import { categories } from "../../api/men/menCateogryData";
import { menInnerwear as productsData } from "../../api/men/menProductsData";
import { slides } from "../../api/slidesData";
import MenHero from "@/components/MenHero";


const Men = () => {
  return (
    <div className="max-h-screen bg-background mt-10">
      adfadsf
      {/* Top Section */}
      <MenHero
      />

      {/* product categories */}
      <ProductCategories
        title="Effortless Comfort, Perfect Fit"
        description="Modern, product-focused tagline"
        categories={categories}
      />
      {/* TrendingProducts */}
      <TrendingProducts
        productsData={productsData.filter(
          (product) => product.tag !== "Premium"
        )}
        title="Handpicked For You"
        description="Personalization ka touch, especially for logged-in users"
      />

      {/* Elite selection */}


      <TrendingProducts
        productsData={productsData.filter(product => product.tag?.includes("Premium"))}
        title="Premium Choices"
        description="High-quality picks crafted for your ultimate satisfaction"
      />

      {/* Essential */}
      <TrendingProducts
        productsData={productsData.filter(
          (product) => (product.category === "men-trunks" || product.category === "men-briefs") && product.tag?.includes("Premium")
        )}
        title="Essentials Journal"
        description="focuses on everyday wear elevated"
      />




      {/* Footer */}
      <Footer />

      {/* Sidebar for Navigation */}
      <Sidebar />

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Men;
