import { create } from "zustand";

const useProductsStore = create((set, get) => ({
    smartphones: [],
    accessories: [],
    smartphoneDetail: null,
    accessoryDetail: null,
    loading: false,
    error: null,

    fetchData: async (endpoint, type) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`http://localhost:8080/${endpoint}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${type}`);
            }
            const result = await response.json();
            if (result.status !== "success" || !Array.isArray(result.data)) {
                throw new Error("Unexpected data format");
            }
            set({ [type]: result.data.map(item => ({ ...item })) });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    addProduct: async (endpoint, productData) => {
        try {
            const response = await fetch(`http://localhost:8080/${endpoint}/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });
            if (!response.ok) {
                throw new Error(`Failed to add product`);
            }
            const result = await response.json();
            if (result.status === "success") {
                // Обновите состояние с добавленным продуктом
                set(state => ({
                    [endpoint]: [...state[endpoint], result.data],
                }));
            } else {
                throw new Error("Unexpected server response");
            }
        } catch (error) {
            console.error(`Error adding product: ${error.message}`);
            set({ error: error.message });
        }
    },

    deleteDataById: async (id, endpoint, type) => {
        try {
            const response = await fetch(`http://localhost:8080/${endpoint}/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Failed to delete ${type}`);
            }
            set({
                [type]: get()[type].filter(item => item.id !== id),
            });
        } catch (error) {
            console.error(`Error deleting ${type}`, error);
        }
    },

    fetchDetail: async (id, endpoint, detailType) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`http://localhost:8080/${endpoint}/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${detailType} detail`);
            }
            const result = await response.json();
            set({ [`${detailType}Detail`]: result.data[0] });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    changeStatus: async (id, endpoint, isVerified) => {
        try {
            const response = await fetch(`http://localhost:8080/${endpoint}/${id}/verify`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ is_verified: isVerified })

            });

            if (!response.ok) {
                throw new Error("Failed to change smartphone status");
            }

            const updatedItem = await response.json();
            set({
                [endpoint]: get()[endpoint].map(item =>
                    item.id === id ? updatedItem.data : item
                ),
            });
        } catch (error) {
            console.error(`Error changing ${isVerified}`, error);
            set({ error: error.message });
        }
    },

    clearDetail: (detailType) => set({ [`${detailType}Detail`]: null }),

    // onToggleFavorite: (id, type) => {
    //     const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    //     // Проверка на существование элемента в избранных
    //     const existingIndex = storedFavorites.findIndex(
    //         favorite => favorite.id === id && favorite.type === type
    //     );

    //     if (existingIndex !== -1) {
    //         // Если элемент существует, удаляем его
    //         storedFavorites.splice(existingIndex, 1);
    //     } else {
    //         // Если элемента нет, добавляем его
    //         storedFavorites.push({ id, type });
    //     }

    //     // Сохраняем обновленный список избранных в localStorage
    //     localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    // },

    // onToggleCartProducts: (id, type) => {
    //     const storedCartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

    //     // Проверка на существование элемента в избранных
    //     const existingIndex = storedCartProducts.findIndex(
    //         cartProduct => cartProduct.id === id && cartProduct.type === type
    //     );

    //     if (existingIndex !== -1) {
    //         // Если элемент существует, удаляем его
    //         storedCartProducts.splice(existingIndex, 1);
    //     } else {
    //         // Если элемента нет, добавляем его
    //         storedCartProducts.push({ id, type });
    //     }

    //     // Сохраняем обновленный список избранных в localStorage
    //     localStorage.setItem("cartProducts", JSON.stringify(storedCartProducts));
    // },

    // getFavoriteProducts: () => {
    //     // Извлекаем избранные продукты из localStorage
    //     const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    //     // Получаем текущие продукты из store
    //     const { smartphones, accessories } = get();

    //     // Фильтруем текущие продукты по избранным
    //     const favoriteSmartphones = smartphones.filter(smartphone =>
    //         storedFavorites.some(fav => fav.id === smartphone.id && fav.type === "smartphones")
    //     );

    //     const favoriteAccessories = accessories.filter(accessory =>
    //         storedFavorites.some(fav => fav.id === accessory.id && fav.type === "accessories")
    //     );

    //     // Возвращаем объекты с избранными продуктами
    //     return {
    //         smartphones: favoriteSmartphones,
    //         accessories: favoriteAccessories
    //     };
    // },

    // getCartProducts: () => {
    //     // Извлекаем избранные продукты из localStorage
    //     const storedCartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

    //     // Получаем текущие продукты из store
    //     const { smartphones, accessories } = get();

    //     // Фильтруем текущие продукты по избранным
    //     const cartProductsSmartphones = smartphones.filter(smartphone =>
    //         storedCartProducts.some(fav => fav.id === smartphone.id && fav.type === "smartphones")
    //     );

    //     const cartProductsAccessories = accessories.filter(accessory =>
    //         storedCartProducts.some(fav => fav.id === accessory.id && fav.type === "accessories")
    //     );

    //     // Возвращаем объекты с избранными продуктами
    //     return {
    //         smartphones: cartProductsSmartphones,
    //         accessories: cartProductsAccessories
    //     };
    // },

}));

export default useProductsStore;
