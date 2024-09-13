import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card/Card";
import Alert from "../components/ui/Alert/Alert";
import useProductsStore from "../store/useProductsStore";

const FavoritesList = () => {
    const navigate = useNavigate();
    const {
        smartphones,
        accessories,
        getFavoriteProducts,
        onToggleFavorite,
        onToggleCartProducts
    } = useProductsStore(state => ({
        smartphones: state.smartphones,
        accessories: state.accessories,
        getFavoriteProducts: state.getFavoriteProducts,
        onToggleFavorite: state.onToggleFavorite,
        onToggleCartProducts: state.onToggleCartProducts
    }));

    const [favorites, setFavorites] = useState(new Set());

     // Стейт для скрытия/показа и передачи сообщения в Alert
     const [alertState, setAlertState] = useState({
        isOpen: false,
        message: "",
    });

    // // Обработчик закрытия компонента Alert
    const handleCloseAlert = () => {
        setAlertState({ ...alertState, isOpen: false });
    };

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
        combinedFavorites
            .map(combinedFavorite => ({
                id: combinedFavorite.id,
                type: combinedFavorite?.ram_capacity ? "smartphones" : "accessories"
            }))
            .forEach(({ id, type }) => onToggleCartProducts(id, type));

        setAlertState({
            isOpen: true,
            variant: "success",
            message: "Товар добавлен в корзину",
        });
    };


    return (
        <>
        <section className="new-products">
            <div className="max-w-7xl mx-auto px-2 relative">
                <h1 className="mb-4 text-4xl font-bold text-zinc-100">Понравившиеся товары</h1>

                <div className="max-w-7xl mx-auto">
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

                <div className="max-w-7xl mx-auto py-3">
                    <button
                        className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleAddCartClick}
                    >
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </section>
        <Alert
            title=""
            subtitle={alertState?.message}
            variant={alertState?.variant}
            isOpen={alertState?.isOpen}
            onClose={handleCloseAlert}
        />
        </>
    );
};

export default FavoritesList;
