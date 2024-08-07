import { create } from "zustand";

/**
 * Стор для управления аксессуарами и состоянием сохраненных аксессуаров.
 */
const useAccessoriesStore = create((set, get) => ({
    accessories: [], // Начальное состояние для смартфонов

    getAccessories: async () => {
        try {
            // Выполнение запроса
            const response = await fetch("http://localhost:8080/accessories");

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
            const accessories = result.data.map((product) => ({ ...product }));

            // Обновление состояния
            set({ accessories: accessories });
        } catch (error) {
            console.error("Error fetching smartphones", error);
        }
    },

    deleteAccessoryById: async (id) => {
        try {
            // Выполнение запроса на удаление
            const response = await fetch(`http://localhost:8080/accessories/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete accessory");
            }

            // Обновление состояния после успешного удаления
            const { accessories } = get();
            set({
                accessories: accessories.filter((accessory) => accessory.id !== id),
            });
        } catch (error) {
            console.error("Error deleting smartphone", error);
        }
    },

}));

export default useAccessoriesStore;