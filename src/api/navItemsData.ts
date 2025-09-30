export const subcategories = {
  men: [
    {
      title: "INNERWEAR",
      items: ["Briefs", "Trunks", "Boxer Briefs", "Inner Boxer"],
    },
    {
      title: "VESTS",
      items: ["Sleeveless Vests", "Sleeved Vests", "Gym Vests"],
    },
    {
      title: "APPAREL TOPS",
      items: [
        "Tank Tops",
        "T-Shirts",
        "Polos",
        "Sweatshirts",
        "Jackets & Hoodies",
      ],
    },
    {
      title: "APPAREL BOTTOMS",
      items: ["Boxer Shorts", "Shorts", "Joggers", "Track Pants", "Pyjamas"],
    },
    {
      title: "MULTIPACKS",
      items: ["Briefs Pack", "Vests Pack", "Socks Pack"],
    },
    {
      title: "THERMALS",
      items: ["Top Thermals", "Bottom Thermals"],
    },
  ],
  women: [
    {
      title: "INNERWEAR",
      items: ["Bras", "Panties", "Camisoles"],
    },
    {
      title: "APPAREL",
      items: ["Tops", "Leggings", "Pyjamas"],
    },
  ],
  kids: [
    {
      title: "BOYS",
      items: ["T-Shirts", "Shorts", "Track Pants"],
    },
    {
      title: "GIRLS",
      items: ["Tops", "Leggings", "Nightwear"],
    },
  ],
};






export const navLinks = [
  {
    name: "MEN",
    path: "category/men",
    subcategories: subcategories.men,
    rightBanner: {
      image: "/assets/men-banner.jpg",
      link: "/men",
      text: "Everything for MEN",
    },
  },
  {
    name: "WOMEN",
    path: "category/women",
    subcategories: subcategories.women,
    rightBanner: {
      image: "/assets/women-banner.jpg",
      link: "/womens",
      text: "Everything for WOMEN",
    },
  },
  {
    name: "KIDS",
    path: "/kid",
    subcategories: subcategories.kids,
    rightBanner: {
      image: "/assets/kids-banner.jpg",
      link: "/kid",
      text: "Everything for KIDS",
    },
  },
  { name: "BLOG", path: "/blog" },
  { name: "FAQ", path: "/faq" },
  { name: "Export", path: "/export" },
  { name: "History", path: "/history" },
];

