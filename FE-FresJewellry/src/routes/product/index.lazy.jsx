import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { ProductCard } from "@/components/Product-Card";
import productImage from "@/assets/image1.png";

// Dummy data
const products = [
  {
    id: 1,
    name: "Gold Ring with Ronce Accessories",
    description:
      "A luxurious gold ring adorned with intricate ronce accessories, featuring delicate floral patterns.",
    price: "1.199.000",
    image: productImage,
    category: "Ring",
  },
  {
    id: 2,
    name: "Silver Necklace with Gemstone",
    description:
      "An elegant silver necklace featuring a stunning gemstone pendant, perfect for sophistication.",
    price: "799.000",
    image: productImage,
    category: "Necklace",
  },
  {
    id: 3,
    name: "Rose Gold Earrings",
    description:
      "Chic rose gold earrings with a modern twist, lightweight and stylish for daily wear.",
    price: "499.000",
    image: productImage,
    category: "Earrings",
  },
  {
    id: 4,
    name: "Diamond Bracelet",
    description:
      "A dazzling diamond bracelet that exudes luxury, perfect for gifting or personal collection.",
    price: "2.499.000",
    image: productImage,
    category: "Bracelet",
  },
  {
    id: 5,
    name: "Classic Pearl Ring",
    description:
      "A timeless pearl ring set in a gold band, elegant and suitable for any occasion.",
    price: "999.000",
    image: productImage,
    category: "Ring",
  },
  {
    id: 6,
    name: "Emerald Pendant Necklace",
    description:
      "A striking emerald pendant necklace crafted with precision, adding color and elegance.",
    price: "1.799.000",
    image: productImage,
    category: "Necklace",
  },
  {
    id: 7,
    name: "Sapphire Stud Earrings",
    description:
      "Elegant sapphire stud earrings set in white gold, offering a subtle yet sophisticated sparkle.",
    price: "699.000",
    image: productImage,
    category: "Earrings",
  },
  {
    id: 8,
    name: "Rose Gold Charm Bracelet",
    description:
      "A versatile rose gold bracelet with customizable charms, blending charm and modern elegance.",
    price: "1.499.000",
    image: productImage,
    category: "Bracelet",
  },
  {
    id: 9,
    name: "Onyx Signet Ring",
    description:
      "A bold onyx signet ring in a sleek silver setting, perfect for a statement look.",
    price: "899.000",
    image: productImage,
    category: "Ring",
  },
  {
    id: 10,
    name: "Amethyst Drop Necklace",
    description:
      "A graceful amethyst drop necklace in a gold chain, adding a touch of regal charm.",
    price: "1.299.000",
    image: productImage,
    category: "Necklace",
  },
  {
    id: 11,
    name: "Minimalist Gold Ring",
    description:
      "A simple yet elegant minimalist gold ring, perfect for everyday wear.",
    price: "599.000",
    image: productImage,
    category: "Ring",
  },
  {
    id: 12,
    name: "Pearl Stud Earrings",
    description:
      "Classic pearl stud earrings that never go out of style, ideal for formal occasions.",
    price: "399.000",
    image: productImage,
    category: "Earrings",
  },
  {
    id: 13,
    name: "Silver Infinity Bracelet",
    description:
      "Symbolizing eternal love, this silver infinity bracelet is delicate and meaningful.",
    price: "749.000",
    image: productImage,
    category: "Bracelet",
  },
  {
    id: 14,
    name: "Gold Chain Necklace",
    description:
      "A timeless gold chain necklace that pairs effortlessly with any outfit.",
    price: "1.299.000",
    image: productImage,
    category: "Necklace",
  },
  {
    id: 15,
    name: "Crystal Drop Earrings",
    description:
      "Dangling crystal earrings that sparkle with every movement, perfect for night events.",
    price: "549.000",
    image: productImage,
    category: "Earrings",
  },
  {
    id: 16,
    name: "Twisted Gold Ring",
    description:
      "A unique twisted gold ring design that stands out with subtle charm.",
    price: "849.000",
    image: productImage,
    category: "Ring",
  },
  {
    id: 17,
    name: "Leather Charm Bracelet",
    description:
      "A trendy leather bracelet with metal charms, ideal for a casual chic look.",
    price: "499.000",
    image: productImage,
    category: "Bracelet",
  },
  {
    id: 18,
    name: "Moonstone Pendant Necklace",
    description:
      "A dreamy moonstone pendant on a fine chain, radiating soft and mystical vibes.",
    price: "1.099.000",
    image: productImage,
    category: "Necklace",
  },
  {
    id: 19,
    name: "Vintage Filigree Ring",
    description:
      "An antique-style filigree ring crafted with detailed craftsmanship.",
    price: "1.299.000",
    image: productImage,
    category: "Ring",
  },
  {
    id: 20,
    name: "Geometric Hoop Earrings",
    description:
      "Modern geometric hoops that bring a contemporary edge to your accessories.",
    price: "459.000",
    image: productImage,
    category: "Earrings",
  },
  {
    id: 21,
    name: "Ruby Heart Pendant Necklace",
    description:
      "A captivating ruby heart pendant necklace in white gold, symbolizing love and passion.",
    price: "1.899.000",
    image: productImage,
    category: "Necklace",
  },
  {
    id: 22,
    name: "Diamond Halo Engagement Ring",
    description:
      "A breathtaking diamond halo engagement ring that shines with brilliance and elegance.",
    price: "3.999.000",
    image: productImage,
    category: "Ring",
  },
];

export const Route = createLazyFileRoute("/product/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8); // inisialiasi show 8
  const productsPerLoad = 8; // jumlah load
  const categories = ["All", "Ring", "Necklace", "Earrings", "Bracelet"];
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + productsPerLoad);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1200px]">
      <Toaster />
      {/* Category Buttons */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => {
              setSelectedCategory(category);
              setVisibleCount(8);
            }}
            className={`${
              selectedCategory === category
                ? "bg-[#CB9531] hover:bg-[#6C4C35] text-white"
                : "border-black"
            } transition-colors min-w-[80px]`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Card Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-14 justify-items-center">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button or Message */}
      <div className="mt-8 flex justify-center">
        {hasMore ? (
          <p
            onClick={handleLoadMore}
            className="cursor-pointer text-[#CB9531] hover:text-[#6C4C35] "
          >
            <strong>Load More</strong>
          </p>
        ) : (
          <p className="text-black cursor-pointer">Nothing more to load</p>
        )}
      </div>
    </div>
  );
}
