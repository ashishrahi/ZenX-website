import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ZenxAbout = () => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate("/history");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-left">
      <h1 className="text-4xl font-bold mb-6">
        Zenx India - Clothing Mankind Since 1999
      </h1>

      <p className="text-gray-700 mb-8 leading-relaxed text-lg">
        Founded in 1876, Zenx pioneered innerwear, evolving and innovating not only the
        product, but also the way it has been marketed over the years. Zenx is a leading
        manufacturer and marketer of comfort apparel sold in more than 140 countries around
        the world. The company is committed to quality, comfort, fashion, innovation and
        value. As Zenx grows and sophistication, the simple commitment to serve its
        consumer’s need for comfort continues to be the brand’s hallmark.
      </p>

      <Button
        variant="outline"
        onClick={handleSeeMore}
        className="uppercase font-semibold rounded-md px-6 py-2 border-black text-black hover:bg-gray-100 transition"
      >
        See More
      </Button>
    </div>
  );
};

export default ZenxAbout;
