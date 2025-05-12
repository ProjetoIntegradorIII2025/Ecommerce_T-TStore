import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";

/**
 * Seção de Coleções por Gênero - Exibe as coleções masculina e feminina
 */
const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0" aria-label="Coleções por gênero">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Coleção Feminina */}
        <div className="relative flex-1 group">
          <img
            src={womensCollectionImage}
            alt="Modelo vestindo peças da coleção feminina"
            className="w-full h-[700px] object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Coleção Feminina
            </h2>
            <Link
              to="/collections/all?gender=Feminino"
              className="text-gray-900 underline hover:text-gray-700 transition-colors"
              aria-label="Ver coleção feminina"
              onClick={() => window.scrollTo(0, 0)}
            >
              Compre Agora
            </Link>
          </div>
        </div>

        {/* Coleção Masculina */}
        <div className="relative flex-1 group">
          <img
            src={mensCollectionImage}
            alt="Modelo vestindo peças da coleção masculina"
            className="w-full h-[700px] object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Coleção Masculina
            </h2>
            <Link
              to="/collections/all?gender=Masculino"
              className="text-gray-900 underline hover:text-gray-700 transition-colors"
              aria-label="Ver coleção masculina"
              onClick={() => window.scrollTo(0, 0)}
            >
              Compre Agora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;