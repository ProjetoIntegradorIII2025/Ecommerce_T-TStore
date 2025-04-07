import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Responsável por exibir a gaveta lateral do carrinho de compras
 * @param {boolean} drawerOpen - Estado que controla se a gaveta está aberta
 * @param {function} toggleCartDrawer - Função para alternar a abertura/fechamento da gaveta
 */
const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  /**
   * Função para lidar com o processo de checkout
   * Redireciona para login caso o usuário não esteja autenticado
   */
  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Botão de fechar */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {/* Conteúdo do carrinho com área rolável */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Seu Carrinho</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Seu carrinho está vazio.</p>
        )}
      </div>

      {/* Botão de finalizar compra fixo na parte inferior */}
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Finalizar Compra
            </button>
            <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
              Frete, impostos e códigos de desconto calculados no checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default CartDrawer;