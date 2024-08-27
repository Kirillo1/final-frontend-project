import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";

const ProductsCards = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState(new Set());

    // Определяем тип продукта на основе URL
    const isSmartphones = location.pathname.includes("smartphone");
    const endpoint = isSmartphones ? "smartphones" : "accessories";
    const type = isSmartphones ? "smartphones" : "accessories";

    const {
        [type]: products,
        fetchData,
        onToggleFavorite,
    } = useProductsStore(state => ({
        [type]: state[type],
        fetchData: state.fetchData,
        onToggleFavorite: state.onToggleFavorite,
    }));

    useEffect(() => {
        fetchData(endpoint, type);
    }, [fetchData, endpoint, type]);

    useEffect(() => {
        if (isSmartphones) {
            const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
            setFavorites(new Set(storedFavorites.filter(item => item.type === "smartphones").map(item => item.id)));
        }
    }, [products, isSmartphones]);

    const handleCardClick = (id) => {
        navigate(`/product_detail/${endpoint}/${id}/`);
    };

    const handleFavorite = (id) => {
        if (isSmartphones) {
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
        }
    };

    return (
        <section className="products">
            <div className="max-w-7xl mx-auto px-2 mt-4">
                <h2 className="mb-5 text-4xl font-bold text-zinc-100">
                    {isSmartphones ? "Смартфоны" : "Аксессуары"}
                </h2>
                <div className="flex flex-wrap gap-9 py-10">
                    {!!products &&
                        products.map((product) => (
                            <Card
                                key={product.id}
                                details={{
                                    ...product,
                                    ...(isSmartphones && { isFavorite: favorites.has(product.id) }),
                                }}
                                onCardClick={() => handleCardClick(product.id)}
                                {...(isSmartphones && { onHeartClick: () => handleFavorite(product.id) })}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsCards;
