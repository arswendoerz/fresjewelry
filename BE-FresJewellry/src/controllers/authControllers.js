import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { generateTokenSetCookie } from "../utils/generateTokenSetCookie.js";
// import { sendVerificationEmail } from "../mailtrap/emails.js";

export const register = async (req, res) => {
  try {
    console.log("Body Data:", req.body);
    console.log("Uploaded File:", req.file);

    // Destructuring data dari body request
    const { name, address, phoneNumber, email, password } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    // Validasi input
    if (!email || !password || !name || !address || !phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Cek apakah user sudah terdaftar
    const userAlreadyExists = await User.findOne({ where: { email } });
    console.log("User Already Exists:", userAlreadyExists);
    if (userAlreadyExists != null) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists" });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate token verifikasi
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Buat user baru di database
    const user = await User.create({
      name,
      address,
      phoneNumber,
      email,
      password: hashedPassword,
      profilePicture,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Token berlaku 24 jam
    });

    // Simpan user ke database
    await user.save();

    // Generate token untuk cookie (autentikasi)
    generateTokenSetCookie(res, user.id);

    // Kirim email verifikasi

    return res
      .status(201)
      .json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cek apakah user terdaftar
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Cek password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
    generateTokenSetCookie(res, user.id);

    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  return res.status(200).json({ success: true, message: "Logout successful" });
};
