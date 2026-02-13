import React from "react";
import { Link } from "@tanstack/react-router";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const hasDiscount =
    product.discountedPrice !== undefined &&
    product.discountedPrice < product.price;

  return (
    <Link
      to="/product/$productId"
      params={{ productId: product.id }}
      className="relative border rounded-lg p-4 shadow hover:shadow-lg transition bg-blue-50"
    >
      <div>
        {hasDiscount && (
          <div className="bg-blue-700 text-blue-50 px-2 py-1 rounded absolute top-2 right-2 text-sm">
            {Math.round(
              ((product.price - product.discountedPrice!) / product.price) * 100
            )}
            % OFF
          </div>
        )}

        <img
          src={product.image.url}
          alt={product.image.alt}
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <h2 className="font-bold text-lg mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <div className="flex items-center gap-2 mb-2">
          {hasDiscount ? (
            <>
              <span className="line-through text-gray-500">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-blue-700 font-bold">
                ${product.discountedPrice!.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-gray-900 font-bold">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-blue-500 font-medium">Rating: {product.rating}/5</p>
      </div>
    </Link>
  );
};

export default ProductCard;
