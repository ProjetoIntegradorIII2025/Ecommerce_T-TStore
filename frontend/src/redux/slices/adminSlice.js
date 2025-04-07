import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Configurações base da API
const API_URL = import.meta.env.VITE_BACKEND_URL;
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
});

// Busca todos os usuários (apenas admin)
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/users`, getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erro ao buscar usuários");
    }
  }
);

// Adiciona um novo usuário
export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/users`,
        userData,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erro ao criar usuário");
    }
  }
);

// Atualiza informações do usuário
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/users/${id}`,
        { name, email, role },
        getAuthHeader()
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erro ao atualizar usuário");
    }
  }
);

// Remove um usuário
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/admin/users/${id}`, getAuthHeader());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erro ao remover usuário");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],       // Lista de usuários
    loading: false,  // Estado de carregamento
    error: null,     // Mensagem de erro
    success: null    // Mensagem de sucesso
  },
  reducers: {
    // Limpa mensagens de status
    clearAdminMessages: (state) => {
      state.error = null;
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Busca de usuários
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Adição de usuário
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user);
        state.success = "Usuário criado com sucesso!";
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha ao criar usuário";
      })

      // Atualização de usuário
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) state.users[index] = action.payload;
        state.success = "Usuário atualizado com sucesso!";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha ao atualizar usuário";
      })

      // Remoção de usuário
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user._id !== action.payload);
        state.success = "Usuário removido com sucesso!";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Falha ao remover usuário";
      });
  },
});

// Exporta as actions e o reducer
export const { clearAdminMessages } = adminSlice.actions;
export default adminSlice.reducer;