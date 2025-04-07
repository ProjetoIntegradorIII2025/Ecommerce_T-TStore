import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

/**
 * Componente Topbar
 * Exibe a barra superior do site com links de redes sociais e informações de contato
 * Possui design responsivo para diferentes tamanhos de tela
 */
const Topbar = () => {
  return (
    <div className="bg-rabbit-red text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Ícones de redes sociais - visíveis apenas em telas médias e maiores */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-gray-300"
          >
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-gray-300"
          >
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a
            href="https://www.x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="hover:text-gray-300"
          >
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>
        {/* Mensagem centralizada */}
        <div className="text-sm text-center flex-grow">
          <span>Enviamos para todo o estado - Frete rápido e confiável!</span>
        </div>
        {/* Número de telefone - visível apenas em telas médias e maiores */}
        <div className="text-sm hidden md:block">
          <a href="tel:+1234567890" className="hover:text-gray-300">
            (11) 91234-5678
          </a>
        </div>
      </div>
    </div>
  );
};
export default Topbar;
