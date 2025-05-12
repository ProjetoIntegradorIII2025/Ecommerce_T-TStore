import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

/**
 * Componente de Novos Lançamentos - Exibe produtos recém-chegados com scroll horizontal
 * 
 * @returns {JSX.Element} Componente de novos lançamentos
 */
const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  // Busca os novos lançamentos da API
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Erro ao buscar novos lançamentos:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  // Manipuladores de scroll com arrastar
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Scroll programático com os botões
  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ 
      left: scrollAmount, 
      behavior: "smooth" // Corrigido typo (behaviour -> behavior)
    });
  };

  // Atualiza a visibilidade dos botões de scroll
  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  // Configura listeners de scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-0" aria-label="Novos lançamentos">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Novos Lançamentos</h2>
        <p className="text-lg text-gray-600 mb-8">
          Descubra as últimas tendências direto da passarela, adicionadas recentemente
          para manter seu guarda-roupa na moda.
        </p>

        {/* Botões de Scroll */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${
              canScrollLeft
                ? "bg-white text-black hover:bg-gray-100"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            } transition-colors`}
            aria-label="Rolar para a esquerda"
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${
              canScrollRight
                ? "bg-white text-black hover:bg-gray-100"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            } transition-colors`}
            aria-label="Rolar para a direita"
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Conteúdo Scrollável */}
      <div
        ref={scrollRef}
        className={`container mx-auto overflow-x-auto flex space-x-6 relative ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } hide-scrollbar`} // Adicionada classe para esconder scrollbar
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        aria-live="polite"
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[280px] flex-shrink-0 relative group" // Tamanho mínimo ajustado
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || `Produto ${product.name}`}
              className="w-full h-[400px] object-cover rounded-lg transition-transform group-hover:scale-105"
              draggable="false"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 rounded-b-lg">
              <Link 
                to={`/product/${product._id}`} 
                className="block hover:text-gray-300 transition-colors"
                aria-label={`Ver detalhes de ${product.name}`}
              >
                <h4 className="font-medium text-lg">{product.name}</h4>
                <p className="mt-1">R$ {product.price.toLocaleString('pt-BR')}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;