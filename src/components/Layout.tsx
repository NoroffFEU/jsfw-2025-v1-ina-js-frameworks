import { Outlet, Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Layout() {
  return (
    <div className="min-h-screen font-sans">
      <header>
        <nav className="flex justify-between items-center px-6 py-4 bg-white text-blue-800 font-medium">
          <Link to="/" className="">
            Shop
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/contact">Contact</Link>
            <Link to="/cart">
              <FontAwesomeIcon className="text-[18px]" icon={faCartShopping} />
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
