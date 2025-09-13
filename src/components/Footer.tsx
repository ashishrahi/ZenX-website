import Logo from '../assets/Zen-X-Logo-300x139-removebg-preview.webp'

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <img src={Logo} alt="Logo" className="h-10 w-auto" />
            </div>
            <p className="text-background/80 text-sm">
              Leading manufacturer of premium bathroom fixtures and accessories in India. Quality assured with lifetime warranty.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm">Products</h4>
            <ul className="space-y-2 text-background/80 text-sm">
              <li><a href="#" className="hover:text-background transition-colors">mens</a></li>
              <li><a href="#" className="hover:text-background transition-colors">women</a></li>
              <li><a href="#" className="hover:text-background transition-colors">kids</a></li>
              {/* <li><a href="#" className="hover:text-background transition-colors">Win</a></li> */}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm">Company</h4>
            <ul className="space-y-2 text-background/80 text-sm">
              <li><a href="#" className="hover:text-background transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Quality Policy</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Warranty</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Career</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm">Support</h4>
            <ul className="space-y-2 text-background/80 text-sm">
              <li><a href="#" className="hover:text-background transition-colors">Downloads</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Dealer Locator</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60 text-sm">
          <p>&copy; 2025 Zen-X. All rights reserved. | Made in India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;