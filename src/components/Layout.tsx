import { Outlet, Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "../store/cartStore";

function Layout() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <div className="min-h-screen font-sans">
      <header className="flex justify-center sticky top-0 z-10 bg-blue-100 text-blue-800 font-medium">
        <nav className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1600px] w-full">
          <Link to="/" className="">
            Shop
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/contact">Contact</Link>
            <Link to="/cart">
              <FontAwesomeIcon className="text-[18px]" icon={faCartShopping} />
              <span>{totalItems}</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="-mt-[56px]">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
