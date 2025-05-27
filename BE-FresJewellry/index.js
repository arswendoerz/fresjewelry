import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./src/db/db.js"; // Import koneksi database
import User from "./src/models/user.model.js"; // Import model User
import authRoutes from "./src/routes/authRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js"; // Import route cart
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // CORS untuk frontend
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use(cookieParser()); // Middleware untuk cookie

app.get("/", (req, res) => {
  res.send("Hello Ontong");
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  toast.success("You have logged out successfully");
});

// 🔄 **Sinkronisasi Database**
sequelize
  .sync({ force: false }) // Ubah `true` jika ingin reset tabel setiap restart
  .then(() => {
    console.log("Database connected and synced!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

export default app;
