import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");

    let parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : null;
    if (
      !parsedFavorites ||
      !Array.isArray(parsedFavorites.smartphones) ||
      !Array.isArray(parsedFavorites.accessories)
    ) {
      parsedFavorites = { smartphones: [], accessories: [] };
    }

    return parsedFavorites;
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (category, id) => {
    setFavorites((prev) => {
      const categoryFavorites = prev[category] || [];
      const isAlreadyFavorite = categoryFavorites.includes(id);

      const updatedFavorites = {
        ...prev,
        [category]: isAlreadyFavorite
          ? categoryFavorites.filter((item) => item !== id)
          : [...categoryFavorites, id],
      };

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
