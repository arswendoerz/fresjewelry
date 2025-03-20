import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import productImage from "@/assets/image1.png";
import toast, { Toaster } from "react-hot-toast";
import { FaRupiahSign } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Data produk
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
];

// Definisikan rute dengan createLazyFileRoute
export const Route = createLazyFileRoute("/product/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const categories = ["All", "Ring", "Necklace", "Earrings", "Bracelet"];

  // Simpan ke localStorage setiap kali cartItems berubah
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Filter produk berdasarkan kategori
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Fungsi untuk menambah produk ke keranjang
  const handleAddToCart = (productName, size) => {
    const product = products.find((p) => p.name === productName);
    const newItem = {
      ...product,
      size,
      quantity: 1,
      cartId: `${product.id}-${size}-${Date.now()}`, // ID unik untuk item di keranjang
    };

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === existingItem.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, newItem];
    });

    toast.success(
      `${productName} (Size: ${size}) has been added to your cart!`,
      {
        position: "top-right",
        duration: 3000,
      }
    );
    setOpenDialog(false);
    setSelectedSize("");
  };

  const openAddToCartDialog = (product) => {
    setCurrentProduct(product);
    setOpenDialog(true);
  };

  // Logging untuk debugging
  console.log("Rendering RouteComponent, productImage:", productImage);

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1200px]">
      <Toaster />
      {/* Category Buttons */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="w-[350px] h-[500px]">
            <CardHeader>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600 h-[90px] text-justify">
                  {product.description}
                </p>
                <p className="text-lg font-bold">
                  <FaRupiahSign className="inline mr-1" /> {product.price}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog
                open={openDialog && currentProduct?.id === product.id}
                onOpenChange={setOpenDialog}
              >
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-[#CB9531] hover:bg-[#6C4C35] text-white transition-colors"
                    onClick={() => openAddToCartDialog(product)}
                  >
                    Add to Cart
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add {product.name} to Cart</DialogTitle>
                    <DialogDescription>
                      Please select a size for your{" "}
                      {product.category.toLowerCase()}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <RadioGroup
                      value={selectedSize}
                      onValueChange={setSelectedSize}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="S" id="size-s" />
                        <Label htmlFor="size-s">Small</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="M" id="size-m" />
                        <Label htmlFor="size-m">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="L" id="size-l" />
                        <Label htmlFor="size-l">Large</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-[#85986d] hover:bg-[#6b7a56] text-white"
                      onClick={() =>
                        selectedSize &&
                        handleAddToCart(product.name, selectedSize)
                      }
                      disabled={!selectedSize}
                    >
                      Add
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
