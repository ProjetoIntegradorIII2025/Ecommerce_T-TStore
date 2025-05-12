import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * Componente de filtro lateral para produtos
 */
const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    /**material: [],**/
    brand: [],
    minPrice: 0,
    maxPrice: 1000, // Alterado para valor mais realista em R$
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = ["Calçados", "Acessórios"];

  const colors = [
    "Vermelho",
    "Azul",
    "Preto",
    "Verde",
    "Amarelo",
    "Cinza",
    "Branco",
    "Rosa",
    "Bege",
    "Azul Marinho",
  ];

  const sizes = ["15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45", ];

  const materials = [
    "Algodão",
    "Lã",
    "Jeans",
    "Poliéster",
    "Seda",
    "Linho",
    "Viscolycra",
    "Malha",
  ];

  const brands = [
    "Nike",
    "Adidas",
    "Olympikus",
    "Puma",
    "Asics",
    "New Balance",
    "Fila",
    "Converse",
    "Vans",
  ];

  const genders = ["Masculino", "Feminino", "Infantil", "Unissex"];

  // Atualiza os filtros quando os parâmetros da URL mudam
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 1000,
    });
    setPriceRange([0, params.maxPrice || 1000]);
  }, [searchParams]);

  /**
   * Manipula mudanças nos filtros
   */
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  /**
   * Atualiza os parâmetros da URL com os filtros atuais
   */
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  /**
   * Manipula mudança no filtro de preço
   */
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filtrar</h3>

      {/* Filtro de Categoria */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Categoria</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              id={`category-${category}`}
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <label htmlFor={`category-${category}`} className="text-gray-700 cursor-pointer">
              {category}
            </label>
          </div>
        ))}
      </div>

      {/* Filtro de Gênero */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gênero</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              id={`gender-${gender}`}
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <label htmlFor={`gender-${gender}`} className="text-gray-700 cursor-pointer">
              {gender}
            </label>
          </div>
        ))}
      </div>

      {/* Filtro de Cor */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Cor</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              aria-label={`Filtrar por cor ${color}`}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: getColorHex(color) }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Filtro de Tamanho */}
      <div className="mb-6">
  <label className="block text-gray-600 font-medium mb-2">Tamanho</label>
  <div className="grid grid-cols-2 gap-2">
    {sizes.map((size) => (
      <div key={size} className="flex items-center mb-1">
        <input
          type="checkbox"
          name="size"
          id={`size-${size}`}
          value={size}
          onChange={handleFilterChange}
          checked={filters.size.includes(size)}
          className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
        />
        <label htmlFor={`size-${size}`} className="text-gray-700 cursor-pointer">
          {size}
        </label>
      </div>
    ))}
  </div>
</div>

      {/* Filtro de Material */}
      {/*<div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              id={`material-${material}`}
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <label htmlFor={`material-${material}`} className="text-gray-700 cursor-pointer">
              {material}
            </label>
          </div>
        ))}
      </div>*/}

      {/* Filtro de Marca */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Marca</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              id={`brand-${brand}`}
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <label htmlFor={`brand-${brand}`} className="text-gray-700 cursor-pointer">
              {brand}
            </label>
          </div>
        ))}
      </div>

      {/* Filtro de Faixa de Preço */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Faixa de Preço
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={1000}
          step={10}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          aria-label="Selecione a faixa de preço máxima"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>R$ 0</span>
          <span>R$ {priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

// Função auxiliar para obter código hexadecimal das cores
const getColorHex = (color) => {
  const colorMap = {
    "Vermelho": "#ff0000",
    "Azul": "#0000ff",
    "Preto": "#000000",
    "Verde": "#008000",
    "Amarelo": "#ffff00",
    "Cinza": "#808080",
    "Branco": "#ffffff",
    "Rosa": "#ffc0cb",
    "Bege": "#f5f5dc",
    "Azul Marinho": "#000080"
  };
  return colorMap[color] || "#cccccc";
};

export default FilterSidebar;