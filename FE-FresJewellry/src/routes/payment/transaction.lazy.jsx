import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import productImage from "@/assets/image1.png";

export const Route = createLazyFileRoute("/payment/transaction")({
    component: PaymentTransactionComponent,
});

function PaymentTransactionComponent() {
    const [isPaying, setIsPaying] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "Dummy User",
        email: "dummy@example.com",
        phone: "081234567890",
        address: "",
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const products = [
        {
            id: 1,
            name: "Silver Necklace with Gemstone",
            size: "M",
            quantity: 1,
            price: 799000,
            image: productImage,
            category: "Necklace",
        },
        {
            id: 2,
            name: "Gold Ring Elegant",
            size: "S",
            quantity: 2,
            price: 1250000,
            image: productImage,
            category: "Ring",
        },
    ];

    const totalAmount = products.reduce((total, p) => total + p.price * p.quantity, 0);

    useEffect(() => {
        const { fullName, email, phone, address } = formData;
        setIsFormValid(fullName && email && phone && address);
    }, [formData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = () => {
        setIsPaying(true);
        toast.success("Simulasi pembayaran berhasil!", {
            style: { background: "#CB9531", color: "#fff" },
        });
        setTimeout(() => {
            setIsPaying(false);
        }, 2000);
    };

    return (
        <div className="font-poppins container mx-auto w-[90%] md:w-[85%] px-4 py-8 min-h-screen">
            <Toaster />
            <h1 className="text-3xl font-bold mb-6 text-black text-center md:text-left">
                Checkout
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Detail Produk: 3/5 */}
                <div className="md:col-span-3 space-y-4">
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            className="shadow-md border-t-4 border-[#CB9531] bg-white"
                        >
                            <CardContent className="flex items-center justify-between py-3 px-4 gap-4">
                                <div className="flex items-center gap-5">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-20 h-20 rounded-lg object-cover border"
                                    />
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-md font-bold text-[#CB9531]">{product.name}</h3>
                                        <p className="text-sm text-gray-700">Size: <span className="font-medium">{product.size}</span></p>
                                        <p className="text-sm text-gray-700">Quantity: <span className="font-medium">{product.quantity}</span></p>
                                    </div>
                                </div>
                                <div className="text-right min-w-[100px]">
                                    <p className="text-base font-semibold text-black">
                                        Rp {(product.price * product.quantity).toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Form Pelanggan: 2/5 */}
                <div className="md:col-span-2">
                    <Card className="shadow-md border-t-4 border-[#CB9531] h-full flex flex-col justify-between">
                        <CardHeader>
                            <h2 className="text-xl font-semibold text-[#CB9531]">
                                Customer Details
                            </h2>
                        </CardHeader>
                        <CardContent className="space-y-3 pb-2">
                            <div>
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="address">Full Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <hr className="border-t border-gray-300" />
                        </CardContent>

                        <CardFooter className="flex flex-col">
                            <div className="text-lg font-bold w-full text-right text-black mb-3">
                                Total: <span className="text-[#CB9531]">Rp {totalAmount.toLocaleString("id-ID")}</span>
                            </div>
                            <Button
                                className="w-full bg-[#CB9531] hover:bg-[#6C4C35] text-white text-base font-semibold py-4 rounded-lg transition-transform duration-300 hover:scale-105 disabled:opacity-50"
                                onClick={handlePayment}
                                disabled={!isFormValid || isPaying}
                            >
                                {isPaying ? "Memproses..." : "Bayar Sekarang"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
