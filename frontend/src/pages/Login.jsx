import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/login.webp";
import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
  // Estados para armazenar email e senha
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Hooks do Redux e React Router
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Seletores para obter dados do estado global
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Obtém parâmetro de redirecionamento da URL ou usa "/" como padrão
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  // Efeito para redirecionar usuário após login
  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        // Se houver itens no carrinho como convidado, faz merge com carrinho do usuário
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        // Redireciona diretamente
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex">
      {/* Seção do formulário de login */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">T&T Store</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Olá! 👋🏻</h2>
          <p className="text-center mb-6">
            Digite seu e-mail e senha para fazer login.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Digite seu endereço de e-mail"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Digite sua senha"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "carregando..." : "Entrar"}
          </button>
          <p className="mt-6 text-center text-sm">
            Não tem uma conta?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>

      {/* Seção da imagem (visível apenas em desktop) */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={login}
            alt="Faça login na sua conta"
            className="h-[750px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default Login;