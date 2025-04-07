import { useDispatch, useSelector } from "react-redux";
import MyOrdersPage from "./MyOrdersPage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

const Profile = () => {
  // Obtém o usuário do estado global de autenticação
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Efeito para redirecionar para a página de login se não houver usuário autenticado
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    dispatch(logout()); // Desloga o usuário
    dispatch(clearCart()); // Limpa o carrinho
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Seção esquerda - Perfil do usuário */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {user?.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{user?.email}</p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
            >
              Sair
            </button>
          </div>
          
          {/* Seção direita - Histórico de pedidos (componente MyOrdersPage) */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;