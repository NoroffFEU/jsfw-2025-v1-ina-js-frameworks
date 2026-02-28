import { Outlet, Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCartStore } from "../store/cartStore";

function Layout() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <div className="min-h-screen font-sans">
      <header className="sticky top-0 z-10">
        <nav className="flex justify-between items-center px-6 py-4 bg-white text-blue-800 font-medium">
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

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
