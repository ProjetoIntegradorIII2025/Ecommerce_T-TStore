import { Link } from "react-router-dom";
import heroImg from "../../assets/rabbit-hero.webp";

/**
 * Exibe a seção principal do banner na página inicial
 * Contém uma imagem de destaque com texto e botão de chamada para ação
 */
const Hero = () => {
  return (
    <section className="relative">
      {/* Imagem de fundo em tamanho responsivo */}
      <img
        src={heroImg}
        alt="Rabbit"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />
      {/* Overlay escuro com conteúdo centralizado */}
      <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            Pronto para <br /> as Férias
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore nossos produtos para férias com envio rápido para todo o estado.
          </p>
          <Link
            to="#"
            className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg"
          >
            Comprar Agora
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Hero;