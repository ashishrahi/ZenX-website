export const subcategories = {
  men: [
    {
      title: "INNERWEAR",
      items: [
        { name: "Briefs", slug: "men-briefs" },
        { name: "Trunks", slug: "men-trunks" },
        { name: "Boxer Briefs", slug: "men-boxer-briefs" },
        { name: "Inner Boxer", slug: "men-inner-boxer" },
      ],
    },
    {
      title: "VESTS",
      items: [
        { name: "Sleeveless Vests", slug: "men-sleeveless-vests" },
        { name: "Sleeved Vests", slug: "men-sleeved-vests" },
        { name: "Gym Vests", slug: "men-gym-vests" },
      ],
    },
    {
      title: "APPAREL TOPS",
      items: [
        { name: "Tank Tops", slug: "men-tank-tops" },
        { name: "T-Shirts", slug: "t-shirts" },
        { name: "Polos", slug: "polos" },
        { name: "Sweatshirts", slug: "sweatshirts" },
        { name: "Jackets & Hoodies", slug: "jackets-hoodies" },
      ],
    },
    {
      title: "APPAREL BOTTOMS",
      items: [
        { name: "Boxer Shorts", slug: "men-boxer-shorts" },
        { name: "Shorts", slug: "shorts" },
        { name: "Joggers", slug: "joggers" },
        { name: "Track Pants", slug: "track-pants" },
        { name: "Pyjamas", slug: "pyjamas" },
      ],
    },
    {
      title: "MULTIPACKS",
      items: [
        { name: "Briefs Pack", slug: "briefs-pack" },
        { name: "Vests Pack", slug: "vests-pack" },
        { name: "Socks Pack", slug: "socks-pack" },
      ],
    },
    {
      title: "THERMALS",
      items: [
        { name: "Top Thermals", slug: "top-thermals" },
        { name: "Bottom Thermals", slug: "bottom-thermals" },
      ],
    },
  ],
  women: [
    {
      title: "INNERWEAR",
      items: [
        { name: "Bras", slug: "bras" },
        { name: "Panties", slug: "panties" },
        { name: "Camisoles", slug: "camisoles" },
      ],
    },
    {
      title: "APPAREL",
      items: [
        { name: "Tops", slug: "tops" },
        { name: "Leggings", slug: "leggings" },
        { name: "Pyjamas", slug: "pyjamas" },
      ],
    },
  ],
  kids: [
    {
      title: "BOYS",
      items: [
        { name: "T-Shirts", slug: "t-shirts" },
        { name: "Shorts", slug: "shorts" },
        { name: "Track Pants", slug: "track-pants" },
      ],
    },
    {
      title: "GIRLS",
      items: [
        { name: "Tops", slug: "tops" },
        { name: "Leggings", slug: "leggings" },
        { name: "Nightwear", slug: "nightwear" },
      ],
    },
  ],
};

export const navLinks = [
  {
    name: "MEN",
    path: "category/men",
    subcategories: subcategories.men,
    slug: "men",
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
    slug: "women",
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
    slug: "kids",
    rightBanner: {
      image: "/assets/kids-banner.jpg",
      link: "/kid",
      text: "Everything for KIDS",
    },
  },
  { name: "BLOG", path: "/blog", slug: "blog" },
  { name: "FAQ", path: "/faq", slug: "faq" },
  { name: "Export", path: "/export", slug: "export" },
  { name: "History", path: "/history", slug: "history" },
];
