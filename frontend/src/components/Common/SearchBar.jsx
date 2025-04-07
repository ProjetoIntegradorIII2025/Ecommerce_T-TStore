import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProductsByFilters,
  setFilters,
} from "../../redux/slices/productsSlice";

/**
 * Componente de barra de pesquisa com funcionalidade de busca e filtragem
 * 
 * @returns {JSX.Element} Componente de barra de pesquisa
 */
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar a abertura da barra
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Alterna a visibilidade da barra de pesquisa
  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Manipula o envio do formulário de pesquisa
   * @param {Event} e - Evento do formulário
   */
  const handleSearch = (e) => {
    e.preventDefault();
    // Atualiza os filtros e busca os produtos correspondentes
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    // Navega para a página de coleções com o termo de busca
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false); // Fecha a barra após a busca
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full"
          aria-label="Formulário de pesquisa"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
              aria-label="Campo de busca"
            />
            {/* Ícone de busca */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              aria-label="Pesquisar"
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>
          {/* Botão para fechar */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            aria-label="Fechar busca"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button 
          onClick={handleSearchToggle}
          aria-label="Abrir busca"
        >
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;