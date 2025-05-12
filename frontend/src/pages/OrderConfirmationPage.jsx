import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const OrderConfirmationPage = () => {
  // Hooks do Redux e React Router
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Obtém os dados do checkout do estado global
  const { checkout } = useSelector((state) => state.checkout);

  // Efeito para limpar o carrinho quando o pedido é confirmado
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      // Redireciona se não houver dados de checkout
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  // Calcula a data estimada de entrega (10 dias após a compra)
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString("pt-BR");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Obrigado pelo seu pedido!
      </h1>

      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* Informações do pedido */}
            <div>
              <h2 className="text-xl font-semibold">
                Número do pedido: {checkout._id}
              </h2>
              <p className="text-gray-500">
                Data do pedido: {new Date(checkout.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
            
            {/* Data estimada de entrega */}
            <div>
              <p className="text-emerald-700 text-sm">
                Previsão de entrega:{" "}
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          
          {/* Itens do pedido */}
          <div className="mb-20">
            {checkout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | Tamanho: {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">R$ {item.price.toFixed(2).replace(".", ",")}</p>
                  <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Informações de pagamento e entrega */}
          <div className="grid grid-cols-2 gap-8">
            {/* Informações de pagamento */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Pagamento</h4>
              <p className="text-gray-600">PayPal</p>
            </div>

            {/* Informações de entrega */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Endereço de entrega</h4>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderConfirmationPage;