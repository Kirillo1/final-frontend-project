import { create } from "zustand";

const useUsersStore = create((set, get) => ({
    users: [],  // Начальное состояние пользователей
    userDetail: null,
    loading: false,
    error: null,

    fetchUsersData: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:8080/users/auth/all-users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch users`);
            }
            const result = await response.json();

            if (Array.isArray(result)) {
                set({ users: result });  // Устанавливаем массив пользователей в состояние
            } else {
                throw new Error("Unexpected data format");
            }
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

}));

export default useUsersStore;
