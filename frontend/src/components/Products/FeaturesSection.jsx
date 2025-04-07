import {
  HiArrowPathRoundedSquare,
  HiOutlineCreditCard,
  HiShoppingBag,
} from "react-icons/hi2";

/**
 * Seção de Destaques - Exibe os benefícios e vantagens da loja
 * 
 * @returns {JSX.Element} Componente de seção de destaques
 */
const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white" aria-label="Vantagens da loja">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Destaque 1 - Frete Grátis */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4 bg-gray-50" aria-hidden="true">
            <HiShoppingBag className="text-xl text-gray-800" />
          </div>
          <h4 className="tracking-tighter mb-2 font-medium">FRETE GRÁTIS</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            Para compras acima de R$ 500,00
          </p>
        </div>

        {/* Destaque 2 - Devolução */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4 bg-gray-50" aria-hidden="true">
            <HiArrowPathRoundedSquare className="text-xl text-gray-800" />
          </div>
          <h4 className="tracking-tighter mb-2 font-medium">TROCA EM 45 DIAS</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            Garantia de satisfação
          </p>
        </div>

        {/* Destaque 3 - Pagamento Seguro */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4 bg-gray-50" aria-hidden="true">
            <HiOutlineCreditCard className="text-xl text-gray-800" />
          </div>
          <h4 className="tracking-tighter mb-2 font-medium">PAGAMENTO SEGURO</h4>
          <p className="text-gray-600 text-sm tracking-tighter">
            Processo 100% seguro
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;