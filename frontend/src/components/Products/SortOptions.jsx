import { useSearchParams } from "react-router-dom";

/**
 * Componente de Opções de Ordenação - Permite ordenar produtos por diferentes critérios
 * 
 * @returns {JSX.Element} Componente de ordenação
 */
const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Manipula a mudança na seleção de ordenação
   * @param {React.ChangeEvent<HTMLSelectElement>} e - Evento de mudança
   */
  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    if (sortBy) {
      searchParams.set("sortBy", sortBy);
    } else {
      searchParams.delete("sortBy");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-6 flex items-center justify-end">
      <label htmlFor="sort" className="mr-3 text-sm font-medium text-gray-600">
        Ordenar por:
      </label>
      <select
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
        className="border p-2 rounded-md focus:outline-none"
        aria-label="Ordenar produtos"
      >
        <option value="">Padrão</option>
        <option value="priceAsc">Preço: Menor para maior</option>
        <option value="priceDesc">Preço: Maior para menor</option>
        <option value="newest">Mais recentes</option>
        <option value="popularity">Mais populares</option>
      </select>
    </div>
  );
};

export default SortOptions;