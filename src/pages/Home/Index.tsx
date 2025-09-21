import HeroSection from "@/components/HeroSection";
import EnquireNow from "@/components/EnquireNow";
import MainProducts from "@/components/MainProduct";
import ZenxAbout from "@/components/ZenxAbout";
import { slides } from "../../api/slidesData";
import { motion } from "framer-motion";
import ShadowContainer from "@/components/ShadowContainer";
import FAQSection from "@/components/FAQ";
import AppProductCarousel from "@/components/AppProductCarousel";
import ProductCategories from "@/components/ProductCategories";
import CountryExports from "@/components/CountryExports";
import { useFAQs } from "@/hooks/faq/useFAQ";
import { useExports } from "@/hooks/Exports/useExport";
import { useCategories } from "@/hooks/Categories";
import { useProducts } from "@/hooks/Products";

const Index = () => {
  const { data: faqData } = useFAQs();
  const { data: exportData } = useExports();
  const { data: categories } = useCategories();
  const { data: productsData } = useProducts();

  return (
    <div className="min-h-screen bg-background relative flex flex-col gap-10">

      {/* Hero Section */}
      <HeroSection slides={slides} />

      {/* Product Categories */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6">
        <div className="relative rounded-[8px] overflow-hidden w-full shadow-2xl">
          <ProductCategories
            title="Explore Our Categories"
            description="Premium feel, emphasizes soft fit"
            categories={categories ?? []} 
          />
        </div>
      </div>

      {/* Trending Products */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6">
        <div className="relative rounded-[8px] overflow-hidden w-full shadow-2xl">
          <AppProductCarousel
            productsData={productsData?.filter(p => p.tag?.includes("HotPick")) ?? []}
            title="🔥 Trending Products"
            description="Stay ahead with these top-selling, stylish innerwear picks"
          />
        </div>
      </div>

      {/* Women Products */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6">
        <div className="relative rounded-[8px] overflow-hidden w-full shadow-2xl">
          <AppProductCarousel
            productsData={productsData ?? []}
            title="Women’s Choice"
            description="Explore our curated collection of premium innerwear, designed for comfort, style, and lasting quality"
          />
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6">
        <div className="relative rounded-[8px] overflow-hidden w-full shadow-2xl">
          {/* Background Image */}
          <div
            className="h-[200px] w-full bg-cover bg-center relative filter brightness-90 contrast-110 rounded-[8px]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1607083206978-1a0b30f9e568?auto=format&fit=crop&w=1600&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent rounded-[8px]" />
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-red-600 drop-shadow-2xl mb-2">
                New Arrivals
              </h2>
              <p className="text-base md:text-lg max-w-3xl px-4 py-2 rounded-md text-black shadow-sm">
                Explore our globally loved, premium innerwear collection crafted for style and unmatched comfort.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="relative z-10 px-5 py-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MainProducts
              productsData={productsData?.filter(p => p.tag?.includes("New Arrivals")) ?? []}
              title=""
              description=""
            />
          </motion.div>
        </div>
      </div>

      {/* Kids Products Section */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6">
        <div className="rounded-2xl shadow-2xl bg-white overflow-hidden">
          <AppProductCarousel
            productsData={productsData ?? []}
            title="Kids Products"
            description="Stay ahead with these top-selling, stylish innerwear picks"
          />
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6">
        <div className="relative rounded-[8px] overflow-hidden w-full">
          <div
            className="h-[200px] w-full bg-cover bg-center relative filter brightness-90 contrast-110 rounded-[8px]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1607083206978-1a0b30f9e568?auto=format&fit=crop&w=1600&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-transparent rounded-[8px]" />
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-black drop-shadow-2xl mb-2">
                Best Sellers
              </h2>
              <p className="text-base md:text-lg max-w-3xl px-4 py-2 rounded-md text-red-700 shadow-sm">
                Discover our most popular, globally acclaimed innerwear that combines unmatched quality with timeless style. Trusted by customers worldwide.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="relative z-10 px-5 py-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AppProductCarousel
              productsData={productsData?.filter(p => p.tag?.includes("Best Seller")) ?? []}
              title=""
              description=""
            />
          </motion.div>
        </div>
      </div>

      {/* Users' Choice Section */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-6">
        <div className="relative w-full overflow-hidden my-12 rounded-[12px] shadow-2xl">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center rounded-[12px] shadow-2xl"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1590073249373-1f8f0913e028?auto=format&fit=crop&w=1600&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700/90 rounded-[12px]" />
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center text-center py-10 px-6 max-w-[1400px] mx-6 md:mx-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl mb-4">
              Users’ Choice
            </h2>
            <p className="text-black text-lg md:text-xl max-w-3xl px-4 py-2 rounded-md">
              Discover the products loved by our users worldwide! Handpicked favorites for style, comfort, and premium appeal.
            </p>
          </motion.div>
          <motion.div
            className="relative z-10 px-6 md:px-12 py-10 max-w-[1400px] mx-6 md:mx-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AppProductCarousel
              productsData={productsData ?? []}
              title=""
              description=""
            />
          </motion.div>
        </div>
      </div>

      {/* Enquire Now Section */}
      <ShadowContainer>
        <EnquireNow />
      </ShadowContainer>

      {/* About Section */}
      <ShadowContainer>
        <ZenxAbout />
      </ShadowContainer>

      {/* FAQ Section */}
      <ShadowContainer>
        <div id="FAQSection">
          <FAQSection faqData={faqData ?? []} />
        </div>
      </ShadowContainer>

      {/* Country Exports */}
      <ShadowContainer>
        <CountryExports exportData={exportData ?? []} />
      </ShadowContainer>

    </div>
  );
};

export default Index;
