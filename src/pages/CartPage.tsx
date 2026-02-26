import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "../store/cartStore";

function CartPage() {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalItems = useCartStore((state) => state.getTotalItems);
  const totalPrice = useCartStore((state) => state.getTotalPrice);

  return (
    <div className="flex min-h-screen gap-5">
      <div className="flex-1 px-6 py-8">
        <div className="flex justify-between font-bold text-[24px] text-blue-800">
          <h1>Shopping Cart</h1>
          <span>{totalItems().toFixed(0)} Items</span>
        </div>

        <hr className="h-[2px] bg-blue-300 mt-4 mb-5" />

        <div className="flex flex-col gap-7">
          {items.length === 0 && <p>Your cart is empty.</p>}

          {items.map((item) => {
            const price =
              item.product.discountedPrice &&
              item.product.discountedPrice < item.product.price
                ? item.product.discountedPrice
                : item.product.price;

            return (
              <div key={item.product.id} className="flex items-center">
                <img
                  src={item.product.image.url}
                  alt={item.product.image.alt}
                  className="w-32 h-32 object-cover rounded shrink-0"
                />
                <div className="flex h-[100px] ml-10 w-full justify-between">
                  <div className="flex flex-col justify-between">
                    <p className="font-semibold text-[18px]">
                      {item.product.title}
                    </p>
                    <div>
                      <button
                        onClick={() => decreaseQuantity(item.product.id)}
                        className="bg-blue-100 text-blue-700 px-[7px] py-[4px] rounded-full"
                      >
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="text-[14px]"
                        />
                      </button>
                      <span className="font-medium px-4">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.product.id)}
                        className="bg-blue-100 text-blue-700 px-[7px] py-[4px] rounded-full"
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="text-[14px]"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="self-end bg-blue-100 text-blue-700 px-[7px] py-[4px] rounded-full"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-[14px]" />
                    </button>
                    <span className="text-[18px]">
                      ${(price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {items.length > 0 && (
        <div className="px-6 py-8 bg-blue-100 w-[380px]">
          <h1 className="font-bold text-[24px] text-blue-800">Order Summary</h1>
          <hr className="h-[2px] bg-blue-500 mt-4 mb-5" />
          <span className="font-medium text-[18px]">
            ITEMS {totalItems().toFixed(0)}
          </span>

          <div className="flex flex-col gap-5 mt-5">
            {items.map((item) => {
              const price =
                item.product.discountedPrice &&
                item.product.discountedPrice < item.product.price
                  ? item.product.discountedPrice
                  : item.product.price;

              return (
                <div className="flex justify-between font-medium text-[18px]">
                  <span className="mr-2">{item.product.title}</span>
                  <span>${(price * item.quantity).toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          <hr className="h-[2px] bg-blue-500 mt-4 mb-5" />
          <div className="flex justify-between font-medium text-[20px] text-blue-800">
            <span>TOTAL COST</span>
            <span>${totalPrice().toFixed(2)}</span>
          </div>
          <button className="bg-blue-700 text-white font-semibold w-full py-3 mt-7">
            CHECKOUT
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
