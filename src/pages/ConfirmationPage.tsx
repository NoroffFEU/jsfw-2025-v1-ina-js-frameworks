import React, { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "../store/cartStore";

function ConfirmationPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center text-blue-800 gap-5 mt-20 mx-6">
      <FontAwesomeIcon icon={faCircleCheck} size="8x" />
      <div className="text-center">
        <p className="text-[32px] font-bold">Payment successful!</p>
        <p className="text-[20px] font-medium">Thank you for your order</p>
      </div>
      <Link
        to={"/"}
        className="bg-blue-700 text-[18px] text-white font-semibold py-3 px-7"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default ConfirmationPage;
