import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import type { Product } from "../types/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const API_URL = "https://v2.api.noroff.dev/online-shop";

function ProductPage() {
  const { productId } = useParams({ from: "/product/$productId" });

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`${API_URL}/${productId}`);
      const response = await res.json();
      setProduct(response.data);
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="pt-6 font-sans min-h-screen bg-blue-50">
      <div className="max-w-325 mx-auto flex justify-center items-center gap-10">
        <img
          src={product.image.url}
          alt={product.image.alt}
          className="w-[450px] h-[450px] object-cover rounded-[20px]"
        />
        <div className="w-[380px]">
          <div className="flex gap-3">
            {product.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-blue-200 text-blue-800 font-medium text-[14px] px-3 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-black text-[40px]">{product.title}</h1>
          <p className="text-[18px] mb-2">
            Rating:{" "}
            <span className="font-bold text-blue-700">{product.rating}/5</span>
          </p>
          <p>{product.description}</p>
          <div className="flex items-center text-[20px] gap-2 mt-4 mb-6">
            {product &&
            product.discountedPrice !== undefined &&
            product.discountedPrice < product.price ? (
              <>
                <span className="line-through text-gray-500">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-blue-700 font-medium">
                  ${product.discountedPrice!.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-gray-900 font-medium">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <div>
            <button className="bg-blue-100 text-blue-700 px-3 py-2.5 rounded-full ">
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span className="font-medium px-5 text-[18px]">1</span>
            <button className="bg-blue-100 text-blue-700 px-3 py-2.5 rounded-full ">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <button className="font-bold px-5 py-2 mt-3 rounded-full transition-colors duration-200 bg-blue-700 text-blue-50">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
