import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FaRupiahSign, FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import productImage from "../../assets/image1.png";

export const Route = createLazyFileRoute("/shoppingCart/")({
  component: ShoppingCartComponent,
});

function ShoppingCartComponent() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items from API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cart");
        setCartItems(response.data);
      } catch (error) {
        toast.error("Failed to fetch cart items!", {
          position: "top-right",
          style: { background: "#CB9531", color: "#fff" },
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${itemId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      toast.success("Item removed from cart!", {
        position: "top-right",
        duration: 3000,
        style: { background: "#CB9531", color: "#fff" },
      });
    } catch {
      toast.error("Failed to remove item!", {
        position: "top-right",
        style: { background: "#CB9531", color: "#fff" },
      });
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/cart/${itemId}`, {
        quantity: newQuantity,
      });

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch {
      toast.error("Failed to update quantity!", {
        position: "top-right",
        style: { background: "#CB9531", color: "#fff" },
      });
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.toString().replace(/\./g, ""));
        return total + price * item.quantity;
      }, 0)
      .toLocaleString("id-ID");
  };

  return (
    <div className="font-poppins container mx-auto w-[90%] md:w-[70%] px-4 py-8 min-h-screen">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6 text-black text-center md:text-left">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading cart items...</p>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
              <Button
                className="bg-[#85986d] hover:bg-[#6b7a56] text-white text-base py-4 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
                onClick={() => (window.location.href = "/product")}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <Card
                key={item.id}
                className="flex flex-col sm:flex-row items-center shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden p-3"
              >
                <CardHeader className="p-3 w-full sm:w-auto">
                  <img
                    src={item.image || productImage}
                    alt={item.name}
                    className="w-full sm:w-24 h-24 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                </CardHeader>
                <CardContent className="flex-1 p-3">
                  <h3 className="text-base font-semibold text-[#CB9531]">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-base font-bold mt-1 text-[#6C4C35]">
                    <FaRupiahSign className="inline mr-1" /> {item.price}
                  </p>
                </CardContent>
                <CardFooter className="p-3 flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-[#6C4C35] hover:text-white transition-colors px-2 py-1"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center font-semibold text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-[#6C4C35] hover:text-white transition-colors px-2 py-1"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 transition-colors px-2 py-1"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash />
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {cartItems.length > 0 && !loading && (
          <Card className="w-full lg:w-[350px] shadow-md border-t-4 border-[#CB9531] sticky top-16 h-fit">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-[#CB9531] mb-3">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Subtotal:</span>
                  <p className="text-base font-medium">
                    <FaRupiahSign className="inline mr-1" /> {calculateTotal()}
                  </p>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#CB9531]">
                    Total:
                  </span>
                  <p className="text-xl font-bold text-[#6C4C35]">
                    <FaRupiahSign className="inline mr-1" /> {calculateTotal()}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full bg-[#CB9531] hover:bg-[#6C4C35] text-white text-base font-semibold py-4 rounded-lg transition-transform duration-300 hover:scale-105"
                onClick={() =>
                  toast.success("Proceeding to checkout!", {
                    position: "top-right",
                    duration: 3000,
                    style: { background: "#CB9531", color: "#fff" },
                  })
                }
              >
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
