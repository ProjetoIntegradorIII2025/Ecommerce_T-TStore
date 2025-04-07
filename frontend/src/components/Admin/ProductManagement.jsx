import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slices/adminProductSlice";

// Componente para gerenciamento de produtos (área administrativa)
const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  // Carrega os produtos quando o componente é montado
  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  // Função para deletar um produto com confirmação
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      dispatch(deleteProduct(id));
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Gerenciamento de Produtos</h2>
      
      {/* Botão para adicionar novo produto */}
      <Link
        to="/admin/products/add"
        className="flex justify-end bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-fit ml-auto"
      >
        Adicionar Produto
      </Link>
      
      {/* Tabela de produtos */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">Preço</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">R${product.price}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">
                    {/* Botão para editar produto */}
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Editar
                    </Link>
                    {/* Botão para excluir produto */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductManagement;