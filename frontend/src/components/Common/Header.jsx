import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

/**
 * Componente Header
 * Responsável por renderizar o cabeçalho da aplicação
 * Inclui a barra superior (Topbar) e a barra de navegação (Navbar)
 */
const Header = () => {
  return (
    <header className="border-b border-gray-200">
      {/* Barra superior */}
      <Topbar />
      {/* Barra de navegação */}
      <Navbar />
      {/* Gaveta do carrinho */}
    </header>
  );
};
export default Header;