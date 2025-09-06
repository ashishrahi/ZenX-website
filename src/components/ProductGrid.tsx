import { Card, CardContent } from "@/components/ui/card";

const ProductGrid = () => {
  const products = [
    {
      name: "CP Fittings",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=200&h=200&fit=crop",
    },
    {
      name: "Sanitaryware",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=200&fit=crop",
    },
    {
      name: "Bath Accessories",
      image: "https://images.unsplash.com/photo-1603713364604-b8b4ac8e4b50?w=200&h=200&fit=crop",
    },
    {
      name: "Showers",
      image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=200&h=200&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 uppercase tracking-wide">
            OUR PRODUCT RANGE
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-all bg-background">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  {product.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;