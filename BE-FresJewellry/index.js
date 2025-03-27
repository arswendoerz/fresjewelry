import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./src/db/db.js"; // Import koneksi database
import User from "./src/models/user.model.js"; // Import model User
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello Ontong");
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
