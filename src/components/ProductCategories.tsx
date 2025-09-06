import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TrunkImage from '../assets/trunk.png';
import GymImage from '../assets/gymwest.png';
import KidsImage from '../assets/kids.png';
import WinterImage from '../assets/winter.png';

const ProductCategories = () => {
  const categories = [
    {
      title: "Trunks",
      description:
        "Plumber Bathware's new sanitaryware features a range of designs, including world-class wash basins and smart water closets. Discover the perfection from the best bathroom fittings manufacturers in India.",
      image: TrunkImage,
    },
    {
      title: "Gyms Vests",
      description:
        "Plumber Bathware, a leading faucet manufacturer in India, offers an exclusive range of single lever, quarter turn, and half turn faucets. Experience modern beauty, flawless performance, and efficient water-saving designs for every bathroom style.",
      image: GymImage,
    },
    {
      title: "Kids Wear",
      description:
        "Plumber Bathware offers a range of overhead and hand showers, blending water and air for a relaxing experience. Choose from various designs and finishes to complement your bathroom.",
      image: KidsImage,
    },
    {
      title: "Winter Wear",
      description:
        "Plumber Bathware offers a range of overhead and hand showers, blending water and air for a relaxing experience. Choose from various designs and finishes to complement your bathroom.",
      image: WinterImage,
    }
    
  ];

  return (
    <section className="py-16 bg-background" id="products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extralight text-foreground mb-4 uppercase tracking-wide">
           Ours PRODUCTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="relative group">
              <Card className="cursor-pointer border-2 hover:border-primary overflow-hidden">
                <CardHeader className="text-center z-10 relative">
                  <CardTitle className="text-xl font-bold text-primary uppercase">
                    {category.title}
                  </CardTitle>
                </CardHeader>

                <CardContent
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  {/* Empty content, image is set as background */}
                </CardContent>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                  <p className="text-sm leading-relaxed">{category.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
