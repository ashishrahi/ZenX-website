import AppCategoryProducts from '@/components/AppCategoryProducts'
import { useCategories } from '@/hooks/Categories';
const MenCategoryProduct = () => {
const {data: categoryData} = useCategories()

  return (
    <>
    <AppCategoryProducts
    
      productsData={categoryData}
      description="Explore our exclusive men's collection featuring the latest trends."
    />
    </>
  )
}

export default MenCategoryProduct