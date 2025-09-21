import images from '@/assets/men/images'
import Container from '@/components/Container'
import { WomenCategories } from '../../api/women/womenCateogryData'
import { womenInnerwear } from '../../api/women/womenProductsData'
import ShadowContainer from '@/components/ShadowContainer'
import AppHeroBanner from '../../components/AppHeroBanner'
import AppProductCategoriesCarousel from '@/components/AppProductCategoriesCarousel'
import AppProductCarousel from "@/components/AppProductCarousel";
import { useSubcategories } from '@/hooks/Subcategories'
import { useProducts } from '@/hooks/Products'

const WomenPage = () => {

   const { data: subcategoryData } = useSubcategories();
    const { data: productsData } = useProducts();
      const filteredProducts = productsData?.filter((product) => product.category === "women")
      const subcategories = subcategoryData?.filter((subcategory) => subcategory.category === "women")

  return (
    <Container>
      {/* Hero Section */}
      <AppHeroBanner image={images.womenBanner} />

      {/* Product Categories */}
      <ShadowContainer>
        <AppProductCategoriesCarousel
          title="Discover Timeless Comfort"
          description="Explore versatile styles crafted for modern women, combining comfort and elegance."
          categories={subcategories}
        />
      </ShadowContainer>

      {/* Trending Products */}
      <ShadowContainer>
        <AppProductCarousel
          productsData={filteredProducts}
          title="Top Picks for You"
          description="Curated favorites designed to match your style and everyday needs."
        />
      </ShadowContainer>
      {/* Premium Collection */}
      <ShadowContainer>

        <AppProductCarousel
          productsData={filteredProducts}
          title="Exclusive Premium Collection"
          description="Experience the best in quality, style, and lasting comfort."
        />
      </ShadowContainer>

      {/* Everyday Essentials */}
      <ShadowContainer>

        <AppProductCarousel
          productsData={filteredProducts}
          title="Essential Daily Wear"
          description="Classic essentials created for everyday comfort and effortless style."
        />
      </ShadowContainer>


    </Container>
  )
}

export default WomenPage
