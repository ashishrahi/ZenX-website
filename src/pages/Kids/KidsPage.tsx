import images from '@/assets/men/images'
import Container from '@/components/Container'
import { kidsCategories } from '../../api/kids/kidsCateogryData'
import ShadowContainer from '@/components/ShadowContainer'
import  AppHeroBanner from '../../components/AppHeroBanner'
import AppProductCategoriesCarousel from '@/components/AppProductCategoriesCarousel'
import AppProductCarousel from "@/components/AppProductCarousel";
import { useSubcategories } from '@/hooks/Subcategories'
import { useProducts } from '@/hooks/Products'

const KidsPage = () => {

  const { data: subcategoryData } = useSubcategories();
      const { data: productsData } = useProducts();
        const filteredProducts = productsData?.filter((product) => product.category === "kid")
        const subcategories = subcategoryData?.filter((subcategory) => subcategory.category === "kid")
  return (
    <Container>
      {/* Hero Section */}
      <AppHeroBanner image={images.kidsBanner} />

      {/* Kids Product Categories */}
      <ShadowContainer>
      <AppProductCategoriesCarousel
        title="Comfortable Styles for Every Adventure"
        description="Fun, durable, and stylish wear designed to keep up with kids’ active lifestyles."
        categories={subcategories}
      />
      </ShadowContainer>

      {/* Trending Products */}
      <ShadowContainer>
      <AppProductCarousel
        productsData={filteredProducts}
        title="Popular Picks for Kids"
        description="Discover our most-loved styles, perfect for everyday play and fun."
      />
      </ShadowContainer>

      {/* Premium Collection */}
      <ShadowContainer> 
      <AppProductCarousel
        productsData={filteredProducts}
        title="Premium Kids Collection"
        description="Elevated designs with premium fabrics for style, comfort, and durability."
      />
      </ShadowContainer>

      {/* Everyday Essentials */}
      <ShadowContainer>
      <AppProductCarousel
        productsData={filteredProducts}
        title="Everyday Essentials"
        description="Must-have pieces made for comfort, play, and daily adventures."
      />
      </ShadowContainer>

      {/* Sidebar for Navigation */}
    </Container>
  )
}

export default KidsPage
