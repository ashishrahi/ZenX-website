import Container from "@/components/Container";
import ShadowContainer from "@/components/ShadowContainer";
import AppHeroBanner from "@/components/AppHeroBanner";
import AppProductCategoriesCarousel from "@/components/AppProductCategoriesCarousel";
import AppProductCarousel from "@/components/AppProductCarousel";
import { categories } from "../../api/men/menCateogryData";
import { menInnerwear as productsData } from "../../api/men/menProductsData";
import images from "@/assets/men/images";
import { useFilteredProducts } from "@/hooks/useFilteredProducts/useFilteredProducts";

const MenPage = () => {

const { trendingProducts, premiumProducts, essentialProducts } = useFilteredProducts(productsData);
  
  return (
    <Container>
      {/* Sidebar (fixed on left side) */}

      <div className="flex-1 space-y-8">
        {/* Hero Section */}
        <AppHeroBanner image={images.menBanner} />

        {/* Product Categories */}
        <ShadowContainer>
          <AppProductCategoriesCarousel
            title="Effortless Comfort, Perfect Fit"
            description="Modern, product-focused tagline"
            categories={categories}
          />
        </ShadowContainer>

        

        {/* Trending Products */}
        <ShadowContainer>
          <AppProductCarousel
            productsData={trendingProducts}
            title="Handpicked For You"
            description="Personalization ka touch, especially for logged-in users"
          />
        </ShadowContainer>

        {/* Premium Products */}
        <ShadowContainer>
          <AppProductCarousel
            productsData={premiumProducts}
            title="Premium Choices"
            description="High-quality picks crafted for your ultimate satisfaction"
          />
        </ShadowContainer>

        {/* Essential Products */}
        <ShadowContainer>
          <AppProductCarousel
            productsData={essentialProducts}
            title="Essentials Journal"
            description="Focuses on everyday wear elevated"
          />
        </ShadowContainer>
      </div>
    </Container>
  );
};

export default MenPage;
