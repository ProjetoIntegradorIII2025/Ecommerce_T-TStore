import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Configurações da API
const API_URL = import.meta.env.VITE_BACKEND_URL;
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
});

// Funções auxiliares para localStorage
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] };
  } catch (error) {
    console.error("Erro ao carregar carrinho do localStorage:", error);
    return { products: [] };
  }
};

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Erro ao salvar carrinho no localStorage:", error);
  }
};

// Busca o carrinho do usuário ou convidado
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/cart`, {
        params: { userId, guestId }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao buscar carrinho" }
      );
    }
  }
);

// Adiciona item ao carrinho
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/api/cart`, {
        productId,
        quantity,
        size,
        color,
        guestId,
        userId
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao adicionar ao carrinho" }
      );
    }
  }
);

// Atualiza quantidade de um item
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity, guestId, userId, size, color },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${API_URL}/api/cart`, {
        productId,
        quantity,
        guestId,
        userId,
        size,
        color
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao atualizar quantidade" }
      );
    }
  }
);

// Remove item do carrinho
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${API_URL}/api/cart`,
        data: { productId, guestId, userId, size, color }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao remover item" }
      );
    }
  }
);

// Merge carrinho de convidado com usuário
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/cart/merge`,
        { guestId, user },
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao mesclar carrinhos" }
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    // Limpa o carrinho
    clearCart: (state) => {
      state.cart = { products: [] };
      state.success = "Carrinho limpo com sucesso!";
      localStorage.removeItem("cart");
    },
    // Limpa mensagens
    clearCartMessages: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Busca carrinho
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha ao buscar carrinho";
      })

      // Adiciona item
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.success = "Item adicionado ao carrinho!";
        saveCartToStorage(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha ao adicionar item";
      })

      // Atualiza quantidade
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.success = "Quantidade atualizada!";
        saveCartToStorage(action.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha ao atualizar quantidade";
      })

      // Remove item
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.success = "Item removido do carrinho!";
        saveCartToStorage(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha ao remover item";
      })

      // Merge carrinhos
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.success = "Carrinhos mesclados com sucesso!";
        saveCartToStorage(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha ao mesclar carrinhos";
      });
  }
});

export const { clearCart, clearCartMessages } = cartSlice.actions;
export default cartSlice.reducer;