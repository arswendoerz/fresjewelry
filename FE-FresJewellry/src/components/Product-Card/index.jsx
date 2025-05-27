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
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRupiahSign } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ProductCard({ product }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const setCartItems = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  })[1];

  const handleAddToCart = async (productName, size) => {
    const newItem = {
      ...product,
      size,
      quantity: 1,
      cartId: `${product.name}-${size}-${Date.now()}`,
    };

    // Update state cartItems
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.name === productName && item.size === size
      );

      if (existingItem) {
        const updatedCart = prevItems.map((item) =>
          item.name === existingItem.name && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        return updatedCart;
      }

      const updatedCart = [...prevItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });

    // Kirim data ke backend
    try {
      await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price,
          size,
        }),
      });
    } catch (error) {
      console.error("Failed to send cart item to backend:", error);
    }

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

  return (
    <Card className="w-[300px] h-[450px] transition-transform transform hover:scale-105 hover:shadow-xl">
      <CardHeader>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[180px] object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="text-md font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600 h-[70px] text-justify overflow-hidden">
            {product.description}
          </p>
          <p className="text-md font-bold">
            <FaRupiahSign className="inline mr-1" /> {product.price}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              className="w-full bg-[#CB9531] hover:bg-[#6C4C35] text-white transition-colors"
              onClick={() => setOpenDialog(true)}
            >
              Add to Cart
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add {product.name} to Cart</DialogTitle>
              <DialogDescription>
                Please select a size for your item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
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
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-[#CB9531] hover:bg-[#6C4C35] text-white"
                onClick={() =>
                  selectedSize && handleAddToCart(product.name, selectedSize)
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
  );
}
