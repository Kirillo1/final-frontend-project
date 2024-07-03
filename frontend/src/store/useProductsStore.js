import { create } from "zustand";
// import { initialProducts } from "../../data";

/**
 * Стор для управления продуктами и состоянием сохраненных продуктов.
 */
const useProductsStore = create((set) => {
    // Инициализация переменной для хранения продуктов
    let products;


    async function getProducts() {
        try {
            // Выполнение запроса
            const response = await fetch("http://localhost:8080/smartphones");

            if (!response?.ok) {
                throw new Error("Failed to fetch products");
            }

            // Асинхронная сериализация
            const data = await response?.json();
            console.log(data)
            // Перезапись переменной на полученные данные
            products = data?.map((product) => ({...product}));

            set({ products });
        } catch (error) {
            console.error("Error fetching products");
        }
    }

    return {
        products,
        getProducts,
    };
});

export default useProductsStore;
