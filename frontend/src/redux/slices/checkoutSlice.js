import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Configurações da API
const API_URL = import.meta.env.VITE_BACKEND_URL;
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
});

// Thunk para criar sessão de checkout
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/checkout`,
        checkoutData,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao processar checkout" }
      );
    }
  }
);

// Thunk para finalizar checkout (adicionado como exemplo de extensão)
export const completeCheckout = createAsyncThunk(
  "checkout/completeCheckout",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/checkout/complete`,
        { checkoutId },
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao finalizar checkout" }
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,      // Dados da sessão de checkout
    loading: false,      // Estado de carregamento
    error: null,         // Mensagem de erro
    success: false,      // Feedback positivo
    paymentStatus: null, // Status do pagamento
  },
  reducers: {
    // Limpa mensagens e estados
    clearCheckoutMessages: (state) => {
      state.error = null;
      state.success = false;
    },
    // Reseta o estado do checkout
    resetCheckout: (state) => {
      state.checkout = null;
      state.paymentStatus = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Criação de checkout - Pendente
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // Criação de checkout - Sucesso
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
        state.success = "Checkout criado com sucesso!";
      })
      // Criação de checkout - Falha
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha ao criar checkout";
      })
      
      // Finalização de checkout - Pendente
      .addCase(completeCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // Finalização de checkout - Sucesso
      .addCase(completeCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload.status;
        state.success = "Pagamento processado com sucesso!";
      })
      // Finalização de checkout - Falha
      .addCase(completeCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha no processamento do pagamento";
        state.paymentStatus = "failed";
      });
  }
});

// Exporta as actions e o reducer
export const { clearCheckoutMessages, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;