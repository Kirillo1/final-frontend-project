import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState({ smartphones: [], accessories: [] });

    const toggleFavorite = (category, id) => {
        setFavorites((prev) => {
            const categoryFavorites = prev[category] || [];
            const isAlreadyFavorite = categoryFavorites.includes(id);

            return {
                ...prev,
                [category]: isAlreadyFavorite
                    ? categoryFavorites.filter(item => item !== id)
                    : [...categoryFavorites, id],
            };
        });
    };

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoriteContext);
