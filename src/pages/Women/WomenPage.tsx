import images from '@/assets/men/images'
import Container from '@/components/Container'
import WomenProductCategories from '@/components/WomenProductCategories'
import WomenProducts from '@/components/WomenProducts'
import WomenHero from '@/components/WomenHero'
import { WomenCategories } from '../../api/women/womenCateogryData'
import { womenInnerwear } from '../../api/women/womenProductsData'
import Sidebar from '@/components/Sidebar'
import ShadowContainer from '@/components/ShadowContainer'

const WomenPage = () => {
  return (
    <Container>
      {/* Hero Section */}
      <WomenHero images={images} />

      {/* Product Categories */}
      <ShadowContainer>
      <WomenProductCategories
        title="Discover Timeless Comfort"
        description="Explore versatile styles crafted for modern women, combining comfort and elegance."
        categories={WomenCategories}
      />
      </ShadowContainer>

      {/* Trending Products */}
      <ShadowContainer>
      <WomenProducts
        productsData={womenInnerwear.filter(product => product.tag !== "Premium")}
        title="Top Picks for You"
        description="Curated favorites designed to match your style and everyday needs."
      />
</ShadowContainer>
      {/* Premium Collection */}
      <ShadowContainer>

      <WomenProducts
        productsData={womenInnerwear.filter(product => product.tag?.includes("Premium"))}
        title="Exclusive Premium Collection"
        description="Experience the best in quality, style, and lasting comfort."
      />
      </ShadowContainer>

      {/* Everyday Essentials */}
      <ShadowContainer>

      <WomenProducts
        productsData={womenInnerwear.filter(
          product =>
            product.category === "women-bralettes" ||
            product.category === "women-panties"
        )}
        title="Essential Daily Wear"
        description="Classic essentials created for everyday comfort and effortless style."
      />
      </ShadowContainer>


      {/* Sidebar for Navigation */}
      <Sidebar />
    </Container>
  )
}

export default WomenPage
