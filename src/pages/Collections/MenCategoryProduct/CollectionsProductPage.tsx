import AppCategoryProducts from '@/components/AppCategoryProducts'

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