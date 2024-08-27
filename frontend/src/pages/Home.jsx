import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";

import { useNavigate } from "react-router-dom";

const Home = () => {
    const {
        smartphones,
        accessories,
        fetchData,
        onToggleFavorite
    } = useProductsStore(state => ({
        smartphones: state.smartphones,
        accessories: state.accessories,
        fetchData: state.fetchData,
        onToggleFavorite: state.onToggleFavorite
    }));

    const [favorites, setFavorites] = useState(new Set()); // Инициализация как Set
    const navigate = useNavigate(); // хук для роутинга

    useEffect(() => {
        fetchData("smartphones", "smartphones");
        fetchData("accessories", "accessories");
    }, [fetchData]);

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

    const handleCardClick = (endpoint, id) => {
        navigate(`/product_detail/${endpoint}/${id}/`);
    };

    return (
        <section className="new-products">
            <div className="max-w-7xl mx-auto px-2 relative">
                <h1 className="mb-4 text-4xl font-bold text-zinc-100">Новинки 2024 года!</h1>

                <section className="smartphones">
                    <div className="max-w-7xl mx-auto px-2">
                        <h3 className="mb-4 text-4xl font-bold text-zinc-100">
                            Смартфоны
                        </h3>
                        <div className="flex flex-wrap gap-9">
                            {!!smartphones &&
                                smartphones.map((smartphone) => (
                                    <Card
                                        key={smartphone?.id}
                                        details={{
                                            ...smartphone,
                                            isFavorite: favorites.has(smartphone.id) // Проверяем наличие id в Set
                                        }}
                                        onCardClick={handleCardClick}
                                        onHeartClick={handleFavorite}
                                    />
                                ))}
                        </div>
                    </div>
                </section>

                <section className="accessories">
                    <div className="max-w-7xl mx-auto px-2">
                        <h3 className="mb-4 text-4xl font-bold text-zinc-100">
                            Аксессуары
                        </h3>
                        <div className="flex flex-wrap gap-9">
                            {!!accessories &&
                                accessories.map((accessory) => (
                                    <Card
                                        key={accessory?.id}
                                        details={accessory}
                                        onCardClick={handleCardClick}
                                    />
                                ))}
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Home;