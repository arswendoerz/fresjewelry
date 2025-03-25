import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }) {
    return (
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
    );
}