import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Path ke cart.json
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cartFilePath = path.join(__dirname, "../data/cart.json");

// Helper untuk load cart
const loadCart = () => {
  if (fs.existsSync(cartFilePath)) {
    const data = fs.readFileSync(cartFilePath, "utf-8");
    return JSON.parse(data || "[]");
  }
  return [];
};

// Helper untuk save cart
const saveCart = (cart) => {
  fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2), "utf-8");
};

// ✅ GET - Get all cart items
export const getCart = (req, res) => {
  try {
    const cart = loadCart();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load cart" });
  }
};

// ✅ POST - Add item to cart
export const addToCart = (req, res) => {
  try {
    const { name, description, image, price, size } = req.body;

    if (!name || !image || !price || !size) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    let cart = loadCart();

    const existingItem = cart.find(
      (item) => item.name === name && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        name,
        description,
        image,
        price,
        size,
        quantity: 1,
        cartId: `${name}-${size}-${Date.now()}`,
      });
    }

    saveCart(cart);

    res.status(201).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ PUT - Update item quantity
export const updateCartItem = (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    let cart = loadCart();
    cart = cart.map((item) =>
      item.cartId === id ? { ...item, quantity } : item
    );

    saveCart(cart);

    res.json({ success: true, message: "Item updated", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update item" });
  }
};

// ✅ DELETE - Remove item from cart
export const deleteCartItem = (req, res) => {
  try {
    const { id } = req.params;

    let cart = loadCart();
    cart = cart.filter((item) => item.cartId !== id);

    saveCart(cart);

    res.json({ success: true, message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete item" });
  }
};
