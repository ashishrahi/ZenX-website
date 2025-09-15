import images from '@/assets/men/images'
import Container from '@/components/Container'
import { WomenCategories } from '../../api/women/womenCateogryData'
import { womenInnerwear } from '../../api/women/womenProductsData'
import ShadowContainer from '@/components/ShadowContainer'
import AppHeroBanner from '../../components/AppHeroBanner'
import AppProductCategoriesCarousel from '@/components/AppProductCategoriesCarousel'
import AppProductCarousel from "@/components/AppProductCarousel";

const WomenPage = () => {
  return (
    <Container>
      {/* Hero Section */}
      <AppHeroBanner image={images.womenBanner} />

      {/* Product Categories */}
      <ShadowContainer>
        <AppProductCategoriesCarousel
          title="Discover Timeless Comfort"
          description="Explore versatile styles crafted for modern women, combining comfort and elegance."
          categories={WomenCategories}
        />
      </ShadowContainer>

      {/* Trending Products */}
      <ShadowContainer>
        <AppProductCarousel
          productsData={womenInnerwear.filter(product => product.tag !== "Premium")}
          title="Top Picks for You"
          description="Curated favorites designed to match your style and everyday needs."
        />
      </ShadowContainer>
      {/* Premium Collection */}
      <ShadowContainer>

        <AppProductCarousel
          productsData={womenInnerwear.filter(product => product.tag?.includes("Premium"))}
          title="Exclusive Premium Collection"
          description="Experience the best in quality, style, and lasting comfort."
        />
      </ShadowContainer>

      {/* Everyday Essentials */}
      <ShadowContainer>

        <AppProductCarousel
          productsData={womenInnerwear.filter(
            product =>
              product.category === "women-bralettes" ||
              product.category === "women-panties"
          )}
          title="Essential Daily Wear"
          description="Classic essentials created for everyday comfort and effortless style."
        />
      </ShadowContainer>


    </Container>
  )
}

export default WomenPage
