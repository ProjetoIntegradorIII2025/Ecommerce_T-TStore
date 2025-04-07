import { Link } from "react-router-dom";

/**
 * Componente de Grade de Produtos - Exibe produtos em formato de grid
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.products - Lista de produtos para exibir
 * @param {boolean} props.loading - Estado de carregamento
 * @param {string} props.error - Mensagem de erro (se houver)
 * @returns {JSX.Element} Componente de grade de produtos
 */
const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg animate-pulse">
            <div className="w-full h-96 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Erro ao carregar produtos: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nenhum produto encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link 
          key={product._id} 
          to={`/product/${product._id}`} 
          className="block group"
          aria-label={`Ver detalhes do produto ${product.name}`}
        >
          <div className="bg-white p-4 rounded-lg hover:shadow-md transition-all">
            <div className="w-full h-80 mb-4 overflow-hidden rounded-lg">
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.altText || `Imagem do produto ${product.name}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                loading="lazy"
              />
            </div>
            <h3 className="text-gray-900 font-medium mb-2 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-gray-800 font-bold">
                R$ {product.price.toLocaleString('pt-BR')}
              </p>
              {product.originalPrice && (
                <p className="text-gray-400 text-sm line-through">
                  R$ {product.originalPrice.toLocaleString('pt-BR')}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;