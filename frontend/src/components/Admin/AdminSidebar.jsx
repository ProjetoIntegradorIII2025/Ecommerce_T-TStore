import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";

// Componente da Sidebar do painel administrativo
const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="p-6">
      {/* Logo da loja */}
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          T&T Store
        </Link>
      </div>

      {/* Título do painel */}
      <h2 className="text-xl font-medium mb-6 text-center">Painel Administrativo</h2>

      {/* Navegação */}
      <nav className="flex flex-col space-y-2">
        {/* Link para gerenciamento de usuários */}
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaUser />
          <span>Usuários</span>
        </NavLink>

        {/* Link para gerenciamento de produtos */}
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaBoxOpen />
          <span>Produtos</span>
        </NavLink>

        {/* Link para gerenciamento de pedidos */}
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaClipboardList />
          <span>Pedidos</span>
        </NavLink>

        {/* Link para voltar à loja */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
              : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
          }
        >
          <FaStore />
          <span>Loja</span>
        </NavLink>
      </nav>

      {/* Botão de logout */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;