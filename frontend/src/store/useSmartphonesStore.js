import { create } from "zustand";

/**
 * Стор для управления смартфонами и состоянием сохраненных смартфонов.
 */
const useSmartphonesStore = create((set) => ({
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
    }
}));

export default useSmartphonesStore;
