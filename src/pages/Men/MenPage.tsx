import ProductCategories from "@/components/ProductCategories";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Chatbot from "@/components/Chatbot";
import TrendingProducts from "@/components/TrendingProducts";
import { categories } from "../../api/men/menCateogryData";
import { menInnerwear as productsData } from "../../api/men/menProductsData";
import MenHero from "@/components/MenHero";
import Container from "@/components/Container";
import images from "@/assets/men/images";


const Men = () => {
  return (
    <Container>

      {/* Top Section */}
      <MenHero
      images = {images}
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
        title="👑 Premium Choices"
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
    </Container>
  );
};

export default Men;
