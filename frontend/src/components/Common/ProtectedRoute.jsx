import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * Componente para proteger rotas que requerem autenticação e/ou permissões específicas
 * 
 * @param {Object} props - Propriedades do componente
 * @param {ReactNode} props.children - Componentes filhos a serem renderizados se autenticados
 * @param {string} [props.role] - Nível de permissão necessário para acessar a rota (opcional)
 * @returns {ReactNode} - Componente protegido ou redirecionamento para login
 */
const ProtectedRoute = ({ children, role }) => {
  // Obtém o usuário do estado global do Redux
  const { user } = useSelector((state) => state.auth);

  // Verifica se o usuário não está autenticado ou não tem a permissão necessária
  if (!user || (role && user.role !== role)) {
    // Redireciona para a página de login mantendo a navegação limpa (replace)
    return <Navigate to="/login" replace />;
  }

  // Renderiza os componentes filhos se autenticado e autorizado
  return children;
};

export default ProtectedRoute;