import AppCategoryProducts from '@/components/AppCategoryProducts'
import { useCollectionSlug } from '@/hooks/Products/index';

const CollectionsProductPage = () => {

  return (
    <>
    <AppCategoryProducts
    
      productsData={categoryData}
      description="`Explore our exclusive ${slug} collection featuring the latest trends.`"
    />
    </>
  )
}

export default CollectionsProductPage