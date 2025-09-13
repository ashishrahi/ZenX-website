import images from '@/assets/men/images'
import Container from '@/components/Container'
import WomenProducts from '@/components/WomenProducts'
import WomenHero from '@/components/WomenHero'
import { kidsCategories } from '../../api/kids/kidsCateogryData'
import { kidsInnerwear } from '../../api/kids/kidsProductsData'
import Sidebar from '@/components/Sidebar'
import KidsCategoryProducts from '@/components/KidsCategoryProducts'
import KidsProducts from '@/components/KidsProducts'
import KidsHero from '@/components/KidsHero'

const KidsPage = () => {
  return (
    <Container>
      {/* Hero Section */}
      <KidsHero images={images} />

      {/* Kids Product Categories */}
      <KidsCategoryProducts
        title="Comfortable Styles for Every Adventure"
        description="Fun, durable, and stylish wear designed to keep up with kids’ active lifestyles."
        categories={kidsCategories}
      />

      {/* Trending Products */}
      <WomenProducts
        productsData={kidsInnerwear.filter(product => product.tag !== "Premium")}
        title="Popular Picks for Kids"
        description="Discover our most-loved styles, perfect for everyday play and fun."
      />

      {/* Premium Collection */}
      <KidsProducts
        productsData={kidsInnerwear.filter(product => product.tag?.includes("Premium"))}
        title="Premium Kids Collection"
        description="Elevated designs with premium fabrics for style, comfort, and durability."
      />

      {/* Everyday Essentials */}
      <KidsProducts
        productsData={kidsInnerwear.filter(
          product =>
            product.category === "kids-tshirts" ||
            product.category === "kids-winter-wear"
        )}
        title="Everyday Essentials"
        description="Must-have pieces made for comfort, play, and daily adventures."
      />

      {/* Sidebar for Navigation */}
      <Sidebar />
    </Container>
  )
}

export default KidsPage
