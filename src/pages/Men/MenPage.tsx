import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import MenProducts from "@/components/MenProducts";
import { categories } from "../../api/men/menCateogryData";
import { menInnerwear as productsData } from "../../api/men/menProductsData";
import MenHero from "@/components/MenHero";
import Container from "@/components/Container";
import images from "@/assets/men/images";
import MenProductCategories from "@/components/MenProductCategories";
import Shadow from "@/components/Shadow";
import ShadowContainer from "@/components/ShadowContainer";

const MenPage = () => {


  return (
    <Container>



        {/* Hero Section */}
        <MenHero images={images} />

        {/* Product Categories */}
         <ShadowContainer>
        <MenProductCategories
          title="Effortless Comfort, Perfect Fit"
          description="Modern, product-focused tagline"
          categories={categories}
        />
        </ShadowContainer>
        {/* Trending Products */}
        <ShadowContainer>
        <MenProducts
          productsData={productsData.filter(
            (product) => product.tag !== "Premium"
          )}
          title="Handpicked For You"
          description="Personalization ka touch, especially for logged-in users"
        />
        </ShadowContainer>

        {/* Premium Products */}
           <ShadowContainer>
        <MenProducts
          productsData={productsData.filter((product) =>
            product.tag?.includes("Premium")
          )}
          title="👑 Premium Choices"
          description="High-quality picks crafted for your ultimate satisfaction"
        />
        </ShadowContainer>

        {/* Essential Products */}
        <ShadowContainer>
        <MenProducts
          productsData={productsData.filter(
            (product) =>
              (product.category === "men-trunks" ||
                product.category === "men-briefs") &&
              product.tag?.includes("Premium")
          )}
          title="Essentials Journal"
          description="Focuses on everyday wear elevated"
        />
        </ShadowContainer>

      {/* Sidebar (always visible) */}
      <Sidebar />
    </Container>
  );
};

export default MenPage;
