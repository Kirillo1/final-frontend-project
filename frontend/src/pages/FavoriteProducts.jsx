import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";
import { useNavigate } from "react-router-dom";

const FavoritesList = () => {
    const navigate = useNavigate();
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

    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const favoritesSet = new Set(storedFavorites.map(item => `${item.type}-${item.id}`));

        setFavorites(favoritesSet);
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

    const handleCardClick = (type, name, id) => {
        const route = type === "smartphones" ? `/smartphone/${name}/${id}/` : `/accessory/${name}/${id}/`;
        navigate(route);
    };

    const favoriteSmartphones = getFavoriteProducts()?.smartphones || [];
    const favoriteAccessories = getFavoriteProducts()?.accessories || [];

    // Объединение массивов
    const combinedFavorites = [...favoriteSmartphones.map(item => ({ ...item, type: "smartphones" })),
    ...favoriteAccessories.map(item => ({ ...item, type: "accessories" }))];

    const handleAddCartClick = () => {
        console.log(123)
    }

    return (
        <section className="new-products">
            <div className="max-w-7xl mx-auto px-2 relative">
                <h1 className="mb-4 text-4xl font-bold text-zinc-100">Понравившиеся товары</h1>

                <div className="max-w-7xl mx-auto px-2">
                    <div className="flex flex-wrap gap-9">
                        {combinedFavorites.map((item) => (
                            <Card
                                key={item?.id}
                                details={{
                                    ...item,
                                    isFavorite: favorites.has(`${item.type}-${item.id}`)
                                }}
                                onCardClick={() => handleCardClick(item.type, item.type, item.id)}
                                onHeartClick={() => handleFavorite(item.id, item.type)}
                            />
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-2">
                    <button
                        className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleAddCartClick}
                    >
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FavoritesList;
