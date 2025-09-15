import Logo from '../assets/Zen-X-Logo-300x139-removebg-preview.webp';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-6">
      <div className="container mx-auto px-4">
        {/* Grid Layout with Responsive Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Logo + Description */}
          <div>
            <div className="flex items-center">
              <img src={Logo} alt="Logo" className="h-8 w-auto" />
            </div>
            <p className="text-background/70 text-xs mt-2 leading-relaxed">
              Leading manufacturer of premium bathroom fixtures and accessories in India.
              Quality assured with lifetime warranty.
            </p>
          </div>

          {/* Products Section */}
          <div>
            <h4 className="font-semibold mb-3 uppercase text-xs tracking-wide">Products</h4>
            <ul className="space-y-1 text-background/70 text-xs">
              <li><a href="#" className="hover:text-background transition-colors">Mens</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Women</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Kids</a></li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h4 className="font-semibold mb-3 uppercase text-xs tracking-wide">Company</h4>
            <ul className="space-y-1 text-background/70 text-xs">
              <li><a href="#" className="hover:text-background transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Quality Policy</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Warranty</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Career</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="font-semibold mb-3 uppercase text-xs tracking-wide">Support</h4>
            <ul className="space-y-1 text-background/70 text-xs">
              <li><a href="#" className="hover:text-background transition-colors">Downloads</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Dealer Locator</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Text */}
        <div className="border-t border-background/20 mt-6 pt-4 text-center text-background/60 text-xs">
          <p>&copy; 2025 Zen-X. All rights reserved. | Made in India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
