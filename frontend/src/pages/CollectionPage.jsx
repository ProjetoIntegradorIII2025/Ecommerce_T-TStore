import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

/**
 * Página de Coleção - Exibe produtos filtrados por coleção
 */
const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Busca produtos quando os parâmetros mudam
  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mapeia nomes de coleções para português
  const collectionNames = {
    'men': 'Masculino',
    'women': 'Feminino',
    'kids': 'Infantil',
    'unisex': 'Unissex',
    'all': 'Todos os Produtos'
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Botão de Filtro Mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden flex items-center justify-center gap-2 p-3 bg-black text-white sticky top-0 z-40"
        aria-label="Abrir filtros"
        aria-expanded={isSidebarOpen}
      >
        <FaFilter />
        <span>Filtrar Produtos</span>
      </button>

      {/* Sidebar de Filtros */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-72 bg-white shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:w-64 lg:shadow-none`}
      >
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4">Filtros</h3>
          <FilterSidebar />
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="flex-grow p-4 lg:p-6">
        <header className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 capitalize">
            {collectionNames[collection] || collection}
          </h1>
          <p className="text-gray-600 mt-2">
            {products.length} produtos encontrados
          </p>
        </header>

        {/* Opções de Ordenação */}
        <div className="mb-6">
          <SortOptions />
        </div>

        {/* Grade de Produtos */}
        <ProductGrid 
          products={products} 
          loading={loading} 
          error={error} 
        />

        {/* Feedback quando não há produtos */}
        {!loading && products.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">
              Nenhum produto encontrado nesta coleção.
            </p>
            <button
              onClick={() => {
                dispatch(fetchProductsByFilters({ collection }));
                window.scrollTo(0, 0);
              }}
              className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CollectionPage;