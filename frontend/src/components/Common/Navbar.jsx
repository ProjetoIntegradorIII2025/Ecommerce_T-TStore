import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // Calcula o total de itens no carrinho
  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            T&T Store
          </Link>
        </div>

        {/* Links de Navegação (Desktop) */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all?gender=Masculino"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Masculino
          </Link>
          <Link
            to="/collections/all?gender=Feminino"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Feminino
          </Link>
          <Link
            to="/collections/all?gender=Infantil"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Infantil
          </Link>
          <Link
            to="/collections/all?gender=Unissex"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Unissex
          </Link>
        </div>

        {/* Ícones e Ações */}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-black px-2 rounded text-sm text-white"
            >
              Admin
            </Link>
          )}

          <Link to="/profile" className="hover:text-black" aria-label="Perfil">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
            aria-label="Carrinho"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Barra de Pesquisa */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          {/* Menu Mobile */}
          <button 
            onClick={toggleNavDrawer} 
            className="md:hidden"
            aria-label="Abrir menu"
          >
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Drawer do Carrinho */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Navegação Mobile */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer} aria-label="Fechar menu">
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all?gender=Masculino"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Masculino
            </Link>
            <Link
              to="/collections/all?gender=Feminino"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Feminino
            </Link>
            <Link
              to="/collections/all?gender=Infantil"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Infantil
            </Link>
            <Link
              to="/collections/all?gender=Unissex"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Unissex
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};
export default Navbar;