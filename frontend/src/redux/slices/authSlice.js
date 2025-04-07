import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Recupera informações do usuário do localStorage se disponíveis
const getInitialUserState = () => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Erro ao analisar userInfo do localStorage:", error);
    return null;
  }
};

// Gera ou recupera um ID de convidado
const getInitialGuestId = () => {
  const guestId = localStorage.getItem("guestId") || `guest_${Date.now()}`;
  localStorage.setItem("guestId", guestId);
  return guestId;
};

// Estado inicial
const initialState = {
  user: getInitialUserState(),
  guestId: getInitialGuestId(),
  loading: false,
  error: null,
  success: false, // Adicionado estado para feedback positivo
};

// Configurações da API
const API_URL = import.meta.env.VITE_BACKEND_URL;

// Thunk para login do usuário
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, userData);
      
      // Armazena dados no localStorage
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao fazer login" }
      );
    }
  }
);

// Thunk para registro de usuário
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/users/register`, 
        userData
      );
      
      // Armazena dados no localStorage
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Erro ao registrar usuário" }
      );
    }
  }
);

// Slice de autenticação
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action para logout
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${Date.now()}`;
      state.success = false;
      
      // Limpa localStorage
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },
    
    // Action para gerar novo ID de convidado
    generateNewGuestId: (state) => {
      state.guestId = `guest_${Date.now()}`;
      localStorage.setItem("guestId", state.guestId);
    },
    
    // Action para limpar mensagens de erro/sucesso
    clearAuthMessages: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login - Pendente
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // Login - Sucesso
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = "Login realizado com sucesso!";
      })
      // Login - Falha
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha no login";
      })
      
      // Registro - Pendente
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // Registro - Sucesso
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = "Registro realizado com sucesso!";
      })
      // Registro - Falha
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha no registro";
      });
  },
});

// Exporta as actions e o reducer
export const { logout, generateNewGuestId, clearAuthMessages } = authSlice.actions;
export default authSlice.reducer;