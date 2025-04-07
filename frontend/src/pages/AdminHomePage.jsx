import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../redux/slices/adminOrderSlice";

/**
 * Página Inicial do Admin - Exibe resumo e estatísticas do painel administrativo
 * 
 * @returns {JSX.Element} Componente da página inicial do admin
 */
const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  // Carrega produtos e pedidos ao montar o componente
  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
      
      {/* Estado de carregamento ou erro */}
      {productsLoading || ordersLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : productsError ? (
        <p className="text-red-500 p-4 bg-red-50 rounded-lg">
          Erro ao carregar produtos: {productsError}
        </p>
      ) : ordersError ? (
        <p className="text-red-500 p-4 bg-red-50 rounded-lg">
          Erro ao carregar pedidos: {ordersError}
        </p>
      ) : (
        <>
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white shadow-md rounded-lg border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold mb-2">Faturamento</h2>
              <p className="text-2xl font-bold">
                R$ {totalSales.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-sm text-gray-500 mt-1">Total em vendas</p>
            </div>
            
            <div className="p-6 bg-white shadow-md rounded-lg border-l-4 border-green-500">
              <h2 className="text-xl font-semibold mb-2">Pedidos</h2>
              <p className="text-2xl font-bold">{totalOrders}</p>
              <p className="text-sm text-gray-500 mt-1">Total de pedidos</p>
              <Link 
                to="/admin/orders" 
                className="inline-block mt-3 text-blue-600 hover:text-blue-800 transition-colors"
                aria-label="Gerenciar pedidos"
              >
                Gerenciar Pedidos →
              </Link>
            </div>
            
            <div className="p-6 bg-white shadow-md rounded-lg border-l-4 border-purple-500">
              <h2 className="text-xl font-semibold mb-2">Produtos</h2>
              <p className="text-2xl font-bold">{products.length}</p>
              <p className="text-sm text-gray-500 mt-1">Produtos cadastrados</p>
              <Link
                to="/admin/products"
                className="inline-block mt-3 text-blue-600 hover:text-blue-800 transition-colors"
                aria-label="Gerenciar produtos"
              >
                Gerenciar Produtos →
              </Link>
            </div>
          </div>

          {/* Tabela de Pedidos Recentes */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Pedidos Recentes</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nº do Pedido
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.length > 0 ? (
                    orders.slice(0, 5).map((order) => (
                      <tr 
                        key={order._id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => window.location.href = `/admin/orders/${order._id}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order._id.substring(0, 8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.user?.name || 'Visitante'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          R$ {order.totalPrice.toFixed(2).replace('.', ',')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {order.status === 'completed' ? 'Concluído' : 
                             order.status === 'pending' ? 'Pendente' : 
                             order.status === 'cancelled' ? 'Cancelado' : order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                        Nenhum pedido recente encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHomePage;