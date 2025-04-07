import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4 lg:px-0">
        {/* Newsletter */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            Seja o primeiro a saber sobre novos produtos, eventos exclusivos e
            ofertas online.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Cadastre-se e ganhe 10% de desconto na primeira compra.
          </p>

          {/* Formulário de newsletter */}
          <form className="flex">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all"
            >
              Assinar
            </button>
          </form>
        </div>

        {/* Links de Produtos */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Produtos</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Masculino
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Feminino
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Infantil
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Unissex
              </Link>
            </li>
          </ul>
        </div>

        {/* Links de Suporte */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Ajuda</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Contato
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Dúvidas Frequentes
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">
                Recursos
              </Link>
            </li>
          </ul>
        </div>

        {/* Redes Sociais */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Siga-nos</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
              aria-label="Facebook"
            >
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
              aria-label="Instagram"
            >
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
              aria-label="Twitter/X"
            >
              <RiTwitterXLine className="h-4 w-4" />
            </a>
          </div>
          <p className="text-gray-500">Atendimento</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" />
            (11) 91234-5678
          </p>
        </div>
      </div>

      {/* Rodapé Inferior */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          © 2025, CompileTab. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;