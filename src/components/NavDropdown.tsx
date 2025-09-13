import { Link, NavLink } from "react-router-dom";

interface Subcategory {
  title: string;
  items: string[];
}

interface NavItem {
  name: string;
  path: string;
  subcategories?: Subcategory[];
}

interface NavDropdownProps {
  link: NavItem;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ link }) => {
  return (
    <div className="group relative">
      {/* Main nav link */}
      <NavLink
        to={link.path}
        className={({ isActive }) =>
          `uppercase text-sm font-medium tracking-wide transition-colors ${
            isActive ? "text-black" : "text-gray-400"
          }`
        }
      >
        {link.name}
      </NavLink>

      {/* Dropdown */}
      {link.subcategories && (
        <div className="absolute left-0 top-full hidden group-hover:flex bg-white shadow-lg border-t mt-2 p-6 w-[800px] z-50">
          <div className="grid grid-cols-4 gap-6">
            {link.subcategories.map((sub, idx) => (
              <div key={idx}>
                <h3 className="font-semibold mb-3 text-sm">{sub.title}</h3>
                <ul className="space-y-2">
                  {sub.items.map((item, i) => (
                    <li key={i}>
                      <Link
                        to={`${link.path}/${item
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-gray-600 text-sm hover:text-black transition"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
