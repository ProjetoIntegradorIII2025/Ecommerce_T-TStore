import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Configurações da API
const API_URL = import.meta.env.VITE_BACKEND_URL;
const getAuthHeader = () => ({
  headers: { 
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    'Content-Type': 'application/json'
  }
});

// Filtros iniciais
const initialFilters = {
  category: "",
  size: "",
  color: "",
  gender: "",
  brand: "",
  minPrice: "",
  maxPrice: "",
  sortBy: "",
  search: "",
  material: "",
  collection: "",
};

// Busca produtos com filtros
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      
      // Adiciona apenas filtros com valor definido
      Object.entries(filters).forEach(([key, value]) => {
        if (value) query.append(key, value);
      });

      const response = await axios.get(
        `${API_URL}/api/products?${query.toString()}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao buscar produtos" }
      );
    }
  }
);

// Busca detalhes de um produto
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao buscar detalhes do produto" }
      );
    }
  }
);

// Atualiza um produto
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/products/${id}`,
        productData,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao atualizar produto" }
      );
    }
  }
);

// Busca produtos similares
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/products/similar/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao buscar produtos similares" }
      );
    }
  }
);

// Cria um novo produto
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/products`,
        productData,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao criar produto" }
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,     // Produto selecionado para detalhes
    similarProducts: [],       // Produtos similares
    loading: false,            // Estado de carregamento
    error: null,               // Mensagem de erro
    success: false,            // Feedback positivo
    filters: initialFilters    // Filtros atuais
  },
  reducers: {
    // Define filtros
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    // Limpa todos os filtros
    clearFilters: (state) => {
      state.filters = initialFilters;
    },
    // Limpa mensagens
    clearMessages: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Busca produtos com filtros
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Busca detalhes do produto
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Atualiza produto
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        
        // Atualiza na lista de produtos
        const index = state.products.findIndex(
          p => p._id === updatedProduct._id
        );
        if (index !== -1) state.products[index] = updatedProduct;
        
        // Atualiza produto selecionado se for o mesmo
        if (state.selectedProduct?._id === updatedProduct._id) {
          state.selectedProduct = updatedProduct;
        }
        
        state.success = "Produto atualizado com sucesso!";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Busca produtos similares
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Cria novo produto
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload); // Adiciona no início
        state.success = "Produto criado com sucesso!";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
  }
});

export const { setFilters, clearFilters, clearMessages } = productsSlice.actions;
export default productsSlice.reducer;