export const PRODUCT_CATEGORIES = [
  {
    label: "Gaming",
    value: "Gaming" as const,
    featured: [
      { name: "Latest Games", href: "/products?category=Gaming&subcategory=latest games", imageSrc: "/latest.jpg" },
      { name: "Top Picks", href: "/products?category=Gaming&subcategory=top picks", imageSrc: "/gaming.webp" },
    ],
  },

  {
    label:"Clothes",
    value:"clothes",
    featured:[
      {name:"Summer",href:"/products?category=clothes",imageSrc:"/summer.jpg"}
      ,{name:"Winter",href:"/products?category=clothes",imageSrc:"/winter.jpg"}
    ]
  },
  {
    label: "Devices & Consoles",
    value: "Devices-Consoles" as const,
    featured: [
      {
        name: "PlayStation",
        href: "/products?category=Devices & Consoles&subcategory=playstation",
        imageSrc: "/ps5.webp",
        categories: [
          { name: "devices", href: "/products?category=Devices & Consoles" },
          { name: "games", href: "#" },
        ],
      },
      { name: "Xbox", href: "#", imageSrc: "/xbox.jpg" },
      { name: "Nintendo Switch", href: "#", imageSrc: "/nintendo.jpg" },
      { name: "gaming laptops", href: "#", imageSrc: "/laptop.jpg" },
    ],
  },
  {
    label: "Computers",
    value: "Computers" as const,
    featured: [
      { name: "Laptops", href: "#", imageSrc: "/pc.webp" },
      { name: "PCs", href: "#", imageSrc: "/laplap.jpg" },
    ],
  },
  {
    label: "Mobile Phones",
    value: "Mobile-Phones" as const,
    featured: [
      { name: "IPhone", href: "#", imageSrc: "/iphone.jpg" },
      { name: "Samsung", href: "#", imageSrc: "/eg-galaxy-s24-s928-sm-s928bztqmea-thumb-539296238.webp" },
      { name: "Huwawi", href: "#", imageSrc: "/huwawi.jpg" },
    ],
  },

];
