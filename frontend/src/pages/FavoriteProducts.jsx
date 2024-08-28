import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";

import { useNavigate } from "react-router-dom";

const FavoritesList = () => {

    const navigate = useNavigate(); // хук для роутинга
    const {
        smartphones,
        accessories,
        getFavoriteProducts,
        onToggleFavorite
    } = useProductsStore(state => ({
        smartphones: state.smartphones,
        accessories: state.accessories,
        getFavoriteProducts: state.getFavoriteProducts,
        onToggleFavorite: state.onToggleFavorite
    }));

    const [favorites, setFavorites] = useState(new Set()); // Инициализация как Set

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        console.log("Stored Favorites:", storedFavorites); // Вывод данных из localStorage
        const favoritesSet = new Set(storedFavorites.map(item => `${item.type}-${item.id}`));
        setFavorites(favoritesSet);
        console.log("Favorites Set:", favoritesSet); // Вывод данных в Set
    }, [smartphones, accessories]);

    const handleFavorite = (id, type) => {
        onToggleFavorite(id, type);

        setFavorites(prevFavorites => {
            const updatedFavorites = new Set(prevFavorites);
            const key = `${type}-${id}`;

            if (updatedFavorites.has(key)) {
                updatedFavorites.delete(key);
            } else {
                updatedFavorites.add(key);
            }

            const storedFavorites = Array.from(updatedFavorites).map(fav => {
                const [favType, favId] = fav.split("-");
                return { id: parseInt(favId, 10), type: favType };
            });
            localStorage.setItem("favorites", JSON.stringify(storedFavorites));
            return updatedFavorites;
        });
    };

    // Обработчик клика по карточке смартфона
    const handleSmartphoneCardClick = (name, id) => {
        navigate(`/smartphone/${name}/${id}/`)
    }

    // Обработчик клика по карточке аксессуара
    const handleAccessorCardClick = (name, id) => {
        navigate(`/accessory/${name}/${id}/`)
    }

    const favoriteSmartphones = getFavoriteProducts()?.smartphones;
    const favoriteAccessories = getFavoriteProducts()?.accessories;

    const handleAddCartClick = () => {
        console.log(123)
    }

    return (
        <section className="new-products">
            <div className="max-w-7xl mx-auto px-2 relative">
                <h1 className="mb-4 text-4xl font-bold text-zinc-100">Понравившиеся товары</h1>

                <section className="smartphones">
                    <div className="max-w-7xl mx-auto px-2">
                        <div className="flex flex-wrap gap-9">
                            {!!favoriteSmartphones &&
                                favoriteSmartphones.map((smartphone) => (
                                    <Card
                                        key={smartphone?.id}
                                        details={{
                                            ...smartphone,
                                            isFavorite: favorites.has(`smartphones-${smartphone.id}`)
                                        }}
                                        onCardClick={() => handleSmartphoneCardClick("smartphones", smartphone.id)}
                                        onHeartClick={() => handleFavorite(smartphone.id, "smartphones")}
                                    />
                                ))}
                        </div>
                    </div>
                </section>

                <section className="accessories">
                    <div className="max-w-7xl mx-auto px-2">
                        <div className="flex flex-wrap gap-9">
                            {!!favoriteAccessories &&
                                favoriteAccessories.map((accessory) => (
                                    <Card
                                        key={accessory?.id}
                                        details={{
                                            ...accessory,
                                            isFavorite: favorites.has(`accessories-${accessory.id}`)
                                        }}
                                        onCardClick={() => handleAccessorCardClick("accessories", accessory.id)}
                                        onHeartClick={() => handleFavorite(accessory.id, "accessories")}
                                    />
                                ))}
                        </div>
                    </div>
                </section>
                <section>
                    <div className="max-w-7xl mx-auto px-2">
                        <button 
                            className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
                            onClick={handleAddCartClick}
                        >
                            Добавить в корзину
                        </button>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default FavoritesList;