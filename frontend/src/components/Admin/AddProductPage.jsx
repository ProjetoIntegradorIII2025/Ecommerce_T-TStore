import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/slices/productsSlice";
import axios from "axios";

// Componente para adicionar um novo produto
const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.products);

  // Estado para armazenar os dados do produto
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  // Manipulador de alteração dos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Manipulador de upload de imagem
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Manipulador de envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData))
      .unwrap()
      .then(() => {
        navigate("/admin/products");
      })
      .catch((error) => {
        console.error("Falha ao criar produto:", error);
      });
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Adicionar Novo Produto</h2>
      <form onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Nome do Produto</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Descrição */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Descrição</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          />
        </div>

        {/* Preço */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Preço</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Quantidade em Estoque */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Quantidade em Estoque</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Categoria */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Categoria</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Selecione uma Categoria</option>
            <option value="shoes">Calçados</option>
            <option value="accessories">Acessórios</option>
          </select>
        </div>

        {/* Marca */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Marca</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Tamanhos */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Tamanhos (separados por vírgula)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Cores */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Cores (separadas por vírgula)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Coleções */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Coleção</label>
          <input
            type="text"
            name="collections"
            value={productData.collections}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Material */}
        {/*<div className="mb-6">
          <label className="block font-semibold mb-2">Material</label>
          <input
            type="text"
            name="material"
            value={productData.material}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>*/}

        {/* Gênero */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Gênero</label>
          <select
            name="gender"
            value={productData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Selecione o Gênero</option>
            <option value="men">Masculino</option>
            <option value="women">Feminino</option>
            <option value="kids">Infantil</option>
            <option value="unisex">Unissex</option>
          </select>
        </div>

        {/* Upload de Imagem */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Enviar Imagem</label>
          <input type="file" onChange={handleImageUpload} />
          {uploading && <p className="text-gray-500 mt-2">Enviando imagem...</p>}
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Imagem do Produto"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Botão de Submissão */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Adicionar Produto
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;