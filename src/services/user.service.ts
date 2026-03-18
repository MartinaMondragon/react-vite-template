import { api } from "@/lib/api";
import type { ApiResponse, PaginatedResponse, User } from "@/types";

export const userService = {
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<User>> => {
    const { data } = await api.get<PaginatedResponse<User>>("/users", {
      params: { page, limit },
    });
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await api.get<ApiResponse<User>>(`/users/${id}`);
    return data.data;
  },

  create: async (payload: Omit<User, "id" | "createdAt">): Promise<User> => {
    const { data } = await api.post<ApiResponse<User>>("/users", payload);
    return data.data;
  },

  update: async (id: string, updates: Partial<User>): Promise<User> => {
    const { data } = await api.patch<ApiResponse<User>>(`/users/${id}`, updates);
    return data.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
