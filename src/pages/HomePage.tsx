import React, { useEffect, useState } from "react";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const API_URL = "https://v2.api.noroff.dev/online-shop";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const getPrice = (product: Product): number => {
    if (product.discountedPrice && product.discountedPrice < product.price) {
      return product.discountedPrice;
    }
    return product.price;
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => {
      if (sortOption === "on-sale") {
        return (
          product.discountedPrice && product.discountedPrice < product.price
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOption === "price-low") {
        return getPrice(a) - getPrice(b);
      }
      if (sortOption === "price-high") {
        return getPrice(b) - getPrice(a);
      }
      return 0;
    });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch products");

        const response: { data: Product[]; meta: any } = await res.json();
        console.log("API response:", response);

        setProducts(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err)); // fallback if it's not an Error object
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grow relative">
      <div className="w-full bg-gradient-to-b from-blue-100 to-white absolute h-[850px]">
        <div className="flex flex-col items-center max-w-[800px] mx-auto px-6">
          <h1 className="text-[48px] max-[480px]:text-[40px] text-blue-800 font-bold text-center mt-[80px] mb-6">
            Search or Sort for product
          </h1>
          <form className="flex max-[480px]:flex-col gap-4 w-full">
            <input
              type="text"
              name="search"
              placeholder="Search..."
              aria-label="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-6 py-3 w-full rounded-full border border-blue-800 text-blue-800"
            />

            <div className="relative flex">
              <select
                name="sort"
                aria-label="Sort products"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="max-[480px]:w-full pl-6 pr-10 py-3 rounded-full bg-blue-800 text-white appearance-none"
              >
                <option value="default">Sort Products</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="on-sale">On Sale Only</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center justify-center text-white">
                <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="grid max-[760px]:grid-cols-1 min-[570px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 pt-[450px] bg-white">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
