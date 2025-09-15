import AppCategoryProducts from '@/components/AppCategoryProducts'
import { kidsInnerwear } from "../../api/kids/kidsProductsData"
import { useParams} from "react-router-dom";

const MenCategoryProduct = () => {
  
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
    <AppCategoryProducts
    
      productsData={kidsInnerwear}
      title={slug}
      description="Explore our exclusive men's collection featuring the latest trends."
    />
    </>
  )
}

export default MenCategoryProduct