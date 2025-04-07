import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
  // Obtém o ID do pedido da URL
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Obtém os detalhes do pedido, estado de carregamento e erros do Redux
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  // Efeito para carregar os detalhes do pedido quando o componente é montado ou o ID muda
  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  // Estados de carregamento e erro
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Detalhes do Pedido</h2>
      
      {!orderDetails ? (
        <p>Nenhum detalhe do pedido encontrado</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          {/* Informações do pedido */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Pedido Nº: #{orderDetails._id}
              </h3>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? "Aprovado" : "Pendente"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isDelivered ? "Entregue" : "Em processamento"}
              </span>
            </div>
          </div>

          {/* Informações de pagamento e entrega */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Pagamento</h4>
              <p>Método: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Pago" : "Não pago"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Entrega</h4>
              <p>Método: {orderDetails.shippingMethod}</p>
              <p>
                Endereço:{" "}
                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>

          {/* Lista de produtos */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Produtos</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Produto</th>
                  <th className="py-2 px-4">Preço Unitário</th>
                  <th className="py-2 px-4">Quantidade</th>
                  <th className="py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className="border-b">
                    <td className="py-2 px-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                      />
                      <Link
                        to={`/produto/${item.productId}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4">R$ {item.price.toFixed(2).replace(".", ",")}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">
                      R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Link para voltar aos pedidos */}
          <Link to="/meus-pedidos" className="text-blue-500 hover:underline">
            Voltar para Meus Pedidos
          </Link>
        </div>
      )}
    </div>
  );
};
export default OrderDetailsPage;