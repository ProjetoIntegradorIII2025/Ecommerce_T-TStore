import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp";

/**
 * Componente de coleção em destaque - Seção promocional principal
 * 
 * @returns {JSX.Element} Componente de coleção em destaque
 */
const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0" aria-labelledby="featured-collection-heading">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        {/* Conteúdo Esquerdo - Texto */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Conforto e Estilo
          </h2>
          <h2 id="featured-collection-heading" className="text-4xl lg:text-5xl font-bold mb-6">
            Roupas feitas para o seu dia a dia
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Descubra roupas de alta qualidade e confortáveis que combinam perfeitamente
            moda e funcionalidade. Projetadas para você se sentir e parecer incrível todos os dias.
          </p>
          <Link
            to="/collections/all"
            className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition-colors"
            aria-label="Compre agora nossa coleção"
          >
            Compre Agora
          </Link>
        </div>

        {/* Conteúdo Direito - Imagem */}
        <div className="lg:w-1/2">
          <img
            src={featured}
            alt="Modelo vestindo peças da coleção em destaque"
            className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;