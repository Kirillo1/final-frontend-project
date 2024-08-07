import { create } from "zustand";

/**
 * Стор для управления смартфонами и состоянием сохраненных смартфонов.
 */
const useSmartphonesStore = create((set, get) => ({
    smartphones: [], // Начальное состояние для смартфонов

    getSmartphones: async () => {
        try {
            // Выполнение запроса
            const response = await fetch("http://localhost:8080/smartphones");

            if (!response.ok) {
                throw new Error("Failed to fetch smartphones");
            }

            // Асинхронная сериализация
            const result = await response.json();
            console.log(result);

            // Проверка структуры данных
            if (result.status !== "success" || !Array.isArray(result.data)) {
                throw new Error("Unexpected data format");
            }

            // Перезапись переменной на полученные данные
            const smartphones = result.data.map((product) => ({ ...product }));

            // Обновление состояния
            set({ smartphones });
        } catch (error) {
            console.error("Error fetching smartphones", error);
        }
    },

    deleteSmartphoneById: async (id) => {
        try {
            // Выполнение запроса на удаление
            const response = await fetch(`http://localhost:8080/smartphones/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete smartphone");
            }

            // Обновление состояния после успешного удаления
            const { smartphones } = get();
            set({
                smartphones: smartphones.filter((smartphone) => smartphone.id !== id),
            });
        } catch (error) {
            console.error("Error deleting smartphone", error);
        }
    },

    fetchSmartphoneDetail: async (id) => {
        set({ loading: true, error: null }); // Начать загрузку и сбросить ошибки
        try {
            const response = await fetch(`http://localhost:8080/smartphones/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch smartphone detail");
            }
            const result = await response.json();
            set({ smartphoneDetail: result.data[0] });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    clearSmartphoneDetail: () => set({ smartphoneDetail: null }),

}));

export default useSmartphonesStore;
