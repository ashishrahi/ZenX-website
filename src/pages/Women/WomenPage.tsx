import images from '@/assets/men/images'
import Container from '@/components/Container'
import ProductCategories from '@/components/ProductCategories'
import WomenProducts from '@/components/WomenProducts'
import WomenHero from '@/components/WomenHero'
import { WomenCategories } from '../../api/women/womenCateogryData'
import { womenInnerwear } from '../../api/women/womenProductsData'
import Sidebar from '@/components/Sidebar'
import { Outlet } from 'react-router-dom'

const WomenPage = () => {
  return (
    <Container>
      <Outlet />

      {/* Top Section */}
      <WomenHero
        images={images}
      />

      {/* product categories */}
      <ProductCategories
        title="Effortless Comfort, Perfect Fit"
        description="Modern, product-focused tagline"
        categories={WomenCategories}
      />
      {/* TrendingProducts */}
      <WomenProducts
        productsData={womenInnerwear.filter(
          (product) => product.tag !== "Premium"
        )}
        title="Handpicked For You"
        description="Personalization ka touch, especially for logged-in users"
      />

      {/* Elite selection */}


      <WomenProducts
        productsData={womenInnerwear.filter(product => product.tag?.includes("Premium"))}
        title="👑 Premium Choices"
        description="High-quality picks crafted for your ultimate satisfaction"
      />

      {/* Essential */}
      <WomenProducts
        productsData={womenInnerwear.filter(
          (product) => product.category === "women-bralettes" || product.category === "women-panties"
        )}
        title="Essentials Journal"
        description="focuses on everyday wear elevated"
      />





      {/* Sidebar for Navigation */}
      <Sidebar />

    </Container>
  )
}

export default WomenPage