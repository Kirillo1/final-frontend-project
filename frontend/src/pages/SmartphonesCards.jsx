import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";
import { useNavigate } from "react-router-dom";

const SmartphonesCards = () => {
    const navigate = useNavigate(); // хук для роутинга
    const [favorites, setFavorites] = useState(new Set()); // Инициализация как Set

    const {
        smartphones,
        fetchData,
        onToggleFavorite
    } = useProductsStore(state => ({
        smartphones: state.smartphones,
        fetchData: state.fetchData,
        onToggleFavorite: state.onToggleFavorite
    }));

    useEffect(() => {
        fetchData("smartphones", "smartphones");
    }, [fetchData]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(new Set(storedFavorites.filter(item => item.type === "smartphones").map(item => item.id)));
    }, [smartphones]);

    const handleCardClick = (endpoint, id) => {
        navigate(`/product_detail/${endpoint}/${id}/`);
    };

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

    return (
        <section className="products">
            <div className="max-w-7xl mx-auto px-2 mt-4">
                <h2 className="mb-5 text-4xl font-bold text-zinc-100">
                    Смартфоны
                </h2>
                <div className="flex flex-wrap gap-9 py-10">
                    {!!smartphones &&
                        smartphones.map((smartphone) => (
                            <Card
                                key={smartphone.id}
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
    );
};

export default SmartphonesCards;
