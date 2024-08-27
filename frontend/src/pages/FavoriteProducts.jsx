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
        setFavorites(new Set(storedFavorites.filter(item => item.type === "smartphones").map(item => item.id)));
    }, [smartphones]);

    // Обработчик добавления товара в сохраненки 
    const handleFavorite = (id) => {
        onToggleFavorite(id, "smartphones");
        setFavorites(prevFavorites => {
            const updatedFavorites = new Set(prevFavorites);
            if (updatedFavorites.has(id)) {
                updatedFavorites.delete(id);
            } else {
                updatedFavorites.add(id);
            }
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
                                            isFavorite: favorites.has(smartphone.id) // Проверяем наличие id в Set
                                        }}                                      
                                        onCardClick={handleSmartphoneCardClick}
                                        onHeartClick={handleFavorite}
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
                                        details={accessory}
                                        onCardClick={handleAccessorCardClick}
                                    />
                                ))}
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default FavoritesList;