import { createLazyFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import productImage from "@/assets/image1.png";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const categories = [
    {
      title: "Rings",
      products: [
        {
          name: "Gold Ring",
          image: productImage,
          price: "Rp 1.199.000",
          description: "A luxurious gold ring adorned with intricate details.",
        },
        {
          name: "Silver Ring",
          image: productImage,
          price: "Rp 999.000",
          description: "Elegant silver ring with modern design and luxury.",
        },
        {
          name: "Diamond Ring",
          image: productImage,
          price: "Rp 2.499.000",
          description: "Shimmering diamond ring for special occasions.",
        },
        {
          name: "Platinum Ring",
          image: productImage,
          price: "Rp 3.199.000",
          description: "Premium platinum ring with exquisite craftsmanship.",
        },
        {
          name: "Rose Gold Ring",
          image: productImage,
          price: "Rp 1.799.000",
          description: "Charming rose gold ring with a delicate touch.",
        },
        {
          name: "Sapphire Ring",
          image: productImage,
          price: "Rp 2.999.000",
          description: "Gorgeous stone sapphire ring for a royal look.",
        },
        {
          name: "Emerald Ring",
          image: productImage,
          price: "Rp 2.599.000",
          description: "Beautiful emerald ring with a vibrant hue.",
        },
      ],
    },
    {
      title: "Bracelets",
      products: [
        {
          name: "Gold Bracelet",
          image: productImage,
          price: "Rp 1.499.000",
          description: "Stylish gold bracelet with intricate floral patterns.",
        },
        {
          name: "Silver Bracelet",
          image: productImage,
          price: "Rp 1.299.000",
          description: "Classic silver bracelet for everyday your wear.",
        },
        {
          name: "Diamond Bracelet",
          image: productImage,
          price: "Rp 3.199.000",
          description: "Elegant diamond bracelet for a timeless look.",
        },
        {
          name: "Platinum Bracelet",
          image: productImage,
          price: "Rp 3.499.000",
          description: "Premium platinum bracelet with high durability.",
        },
        {
          name: "Rose Gold Bracelet",
          image: productImage,
          price: "Rp 2.099.000",
          description: "Trendy rose gold bracelet with a modern twist.",
        },
        {
          name: "Sapphire Bracelet",
          image: productImage,
          price: "Rp 2.799.000",
          description: "Elegant sapphire bracelet for a sophisticated look.",
        },
        {
          name: "Emerald Bracelet",
          image: productImage,
          price: "Rp 2.599.000",
          description: "Stunning emerald bracelet with a sleek design.",
        },
      ],
    },
    {
      title: "Necklaces",
      products: [
        {
          name: "Gold Necklace",
          image: productImage,
          price: "Rp 2.199.000",
          description: "Exquisite gold necklace with fine craftsmanship.",
        },
        {
          name: "Silver Necklace",
          image: productImage,
          price: "Rp 1.899.000",
          description: "Minimalist silver necklace for a modern touch.",
        },
        {
          name: "Diamond Necklace",
          image: productImage,
          price: "Rp 4.599.000",
          description: "Luxurious diamond necklace for special moments.",
        },
        {
          name: "Platinum Necklace",
          image: productImage,
          price: "Rp 4.999.000",
          description: "High-end platinum necklace with premium quality.",
        },
        {
          name: "Rose Gold Necklace",
          image: productImage,
          price: "Rp 2.799.000",
          description: "Stylish rose gold necklace for a trendy look.",
        },
        {
          name: "Sapphire Necklace",
          image: productImage,
          price: "Rp 3.999.000",
          description: "Elegant sapphire necklace with a deep blue glow.",
        },
        {
          name: "Emerald Necklace",
          image: productImage,
          price: "Rp 3.599.000",
          description: "Beautiful emerald necklace with a rich green hue.",
        },
      ],
    },
  ];

  return (
    <div>
      <img
        src="../src/assets/image.png"
        alt="Homepage Image"
        className="w-full h-auto object-cover"
      />
      <p className="text-center text-xl sm:text-xl md:text-2xl font-semibold mt-16 px-3 max-w-6xl mx-auto leading-relaxed text-[#6C4C35]">
        Experience unparalleled luxury with our exquisite jewelry collection,
        crafted with elegance and intricate details that radiate timeless beauty
        a perfect symbol of prestige and sophistication for your most precious
        moments.
      </p>

      <div className="mt-10 p-4">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-12">
          Our Products
        </h2>

        {categories.map((category, index) => (
          <div key={index} className="mt-8">
            <h3 className="flex justify-between text-2xl sm:text-3xl md:text-4xl font-bold text-left ml-25 mr-25 mb-4">
              {category.title}
              <Link
                to={`/products/${category.title.toLowerCase()}`}
                className="text-lg sm:text-xl text-black hover:text-[#CB9531] transition-all duration-500 flex items-center"
              >
                <span className="hidden sm:inline">More</span>
                <ArrowRight className="w-5 h-5 sm:hidden ml-2" />
              </Link>
            </h3>
            <div className="flex justify-center mt-6">
              <Carousel className="w-full max-w-7xl">
                <CarouselContent className="flex gap-4 md:gap-2 sm:gap-1">
                  {category.products.map((product, i) => (
                    <CarouselItem
                      key={i}
                      className="min-w-[100%] sm:min-w-[50%] md:min-w-[33.33%] lg:min-w-[25%] xl:min-w-[20%] flex-[0_0_auto] flex justify-center"
                    >
                      <Card className="w-64 sm:w-72 shadow-lg border rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                        <CardContent className="p-4 flex flex-col items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-32 sm:h-40 w-32 sm:w-40 object-cover rounded-lg hover"
                          />
                          <h3 className="mt-2 text-md sm:text-lg font-semibold text-center">
                            {product.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 text-center mt-1">
                            {product.description}
                          </p>
                          <p className="text-md sm:text-lg font-bold text-center mt-2">
                            {product.price}
                          </p>
                          <Button className="mt-3 w-full bg-[#CB9531] hover:bg-[#6C4C35] text-white py-2 rounded-md">
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
