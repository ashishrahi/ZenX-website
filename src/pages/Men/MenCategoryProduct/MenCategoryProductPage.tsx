import AppCategoryProducts from '@/components/AppCategoryProducts'
import { menInnerwear } from "../../../api/men/menProductsData"
import { useParams } from 'react-router-dom';

const MenCategoryProduct = () => {

  const { slug } = useParams<{ slug: string }>();

  return (
    <>
    <AppCategoryProducts
    
      productsData={menInnerwear}
      title={slug}
      description="Explore our exclusive men's collection featuring the latest trends."
    />
    </>
  )
}

export default MenCategoryProduct