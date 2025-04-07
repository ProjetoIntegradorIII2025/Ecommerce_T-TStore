import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Configurações da API
const API_URL = import.meta.env.VITE_BACKEND_URL;
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
});

// Busca os pedidos do usuário
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/orders/my-orders`,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao buscar pedidos" }
      );
    }
  }
);

// Busca detalhes de um pedido específico
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/orders/${orderId}`,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao buscar detalhes do pedido" }
      );
    }
  }
);

// Cria um novo pedido (adicionado como exemplo de extensão)
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/orders`,
        orderData,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao criar pedido" }
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],          // Lista de pedidos do usuário
    orderDetails: null,  // Detalhes de um pedido específico
    totalOrders: 0,      // Contagem total de pedidos
    loading: false,      // Estado de carregamento
    error: null,         // Mensagem de erro
    success: false       // Feedback positivo
  },
  reducers: {
    // Limpa mensagens de status
    clearOrderMessages: (state) => {
      state.error = null;
      state.success = false;
    },
    // Reseta os detalhes do pedido
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Busca de pedidos do usuário
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha ao carregar pedidos";
      })

      // Busca detalhes do pedido
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha ao carregar detalhes";
      })

      // Criação de novo pedido
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload); // Adiciona no início do array
        state.totalOrders += 1;
        state.success = "Pedido criado com sucesso!";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha ao criar pedido";
      });
  }
});

// Exporta as actions e o reducer
export const { clearOrderMessages, clearOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;