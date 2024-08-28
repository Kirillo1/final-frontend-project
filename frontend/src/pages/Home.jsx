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

    const [favorites, setFavorites] = useState(new Set());
    const navigate = useNavigate();

    useEffect(() => {
        fetchData("smartphones", "smartphones");
        fetchData("accessories", "accessories");
    }, [fetchData]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(new Set(storedFavorites.map(item => `${item.type}-${item.id}`))); // Используем уникальный ключ для каждого типа и ID
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

            // Обновляем `localStorage` с учетом обоих типов
            const storedFavorites = Array.from(updatedFavorites).map(fav => {
                const [favType, favId] = fav.split("-");
                return { id: parseInt(favId, 10), type: favType };
            });
            localStorage.setItem("favorites", JSON.stringify(storedFavorites));

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
                                            isFavorite: favorites.has(`smartphones-${smartphone.id}`)
                                        }}
                                        onCardClick={() => handleCardClick("smartphones", smartphone.id)}
                                        onHeartClick={() => handleFavorite(smartphone.id, "smartphones")}
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
                                        details={{
                                            ...accessory,
                                            isFavorite: favorites.has(`accessories-${accessory.id}`)
                                        }}
                                        onCardClick={() => handleCardClick("accessories", accessory.id)}
                                        onHeartClick={() => handleFavorite(accessory.id, "accessories")}
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
