import { create } from "zustand";

/**
 * Стор для управления аксессуарами и состоянием сохраненных аксессуаров.
 */
const useAccessoriesStore = create((set) => ({
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
    }
}));

export default useAccessoriesStore;