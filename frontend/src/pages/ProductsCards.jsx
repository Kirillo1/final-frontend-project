import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";

const ProductsCards = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState(new Set());
    const [cartProducts, setCartProducts] = useState(new Set());

    // Определяем тип продукта на основе URL
    const isSmartphones = location.pathname.includes("smartphone");
    const isAccessories = location.pathname.includes("accessories");

    const endpoint = isSmartphones ? "smartphones" : "accessories";
    const type = isSmartphones ? "smartphones" : "accessories";

    const {
        [type]: products,
        fetchData,
        onToggleFavorite,
        onToggleCartProducts
    } = useProductsStore(state => ({
        [type]: state[type],
        fetchData: state.fetchData,
        onToggleFavorite: state.onToggleFavorite,
        onToggleCartProducts: state.onToggleCartProducts
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

    useEffect(() => {
        if (isAccessories) {
            const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
            setFavorites(new Set(storedFavorites.filter(item => item.type === "accessories").map(item => item.id)));
        }
    }, [products, isAccessories]);

    useEffect(() => {
        if (isSmartphones) {
            const storedSmartphoneCartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
            setCartProducts(new Set(storedSmartphoneCartProducts.filter(item => item.type === "smartphones").map(item => item.id)));
        }
    }, [products, isSmartphones]);

    useEffect(() => {
        if (isAccessories) {
            const storedAccessoriesCartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
            setCartProducts(new Set(storedAccessoriesCartProducts.filter(item => item.type === "accessories").map(item => item.id)));
        }
    }, [products, isAccessories]);

    const handleCardClick = (id) => {
        navigate(`/product_detail/${endpoint}/${id}/`);
    };

    const handleFavorite = (id, type) => {
        if (isSmartphones && type === "smartphone") {
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
        } else if (isAccessories && type === "accessory") {
            onToggleFavorite(id, "accessories");

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

    const handleCart = (id, type) => {
        if (isSmartphones && type === "smartphone") {
            onToggleCartProducts(id, "smartphones");

            setCartProducts(prevCartProducts => {
                const updatedCartProducts = new Set(prevCartProducts);
                if (updatedCartProducts.has(id)) {
                    updatedCartProducts.delete(id);
                } else {
                    updatedCartProducts.add(id);
                }
                return updatedCartProducts;
            });
        } else if (isAccessories && type === "accessory") {
            onToggleCartProducts(id, "accessories");

            setCartProducts(prevCartProducts => {
                const updatedCartProducts = new Set(prevCartProducts);
                if (updatedCartProducts.has(id)) {
                    updatedCartProducts.delete(id);
                } else {
                    updatedCartProducts.add(id);
                }
                return updatedCartProducts;
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
                                    ...(isAccessories && { isFavorite: favorites.has(product.id) }),
                                    ...(isSmartphones && { isCartProduct: cartProducts.has(product.id) }),
                                    ...(isAccessories && { isCartProduct: cartProducts.has(product.id) }),

                                }}
                                onCardClick={() => handleCardClick(product.id)}
                                {...(isSmartphones && { onHeartClick: () => handleFavorite(product.id, "smartphone") })}
                                {...(isAccessories && { onHeartClick: () => handleFavorite(product.id, "accessory") })}
                                {...(isSmartphones && { onCartClick: () => handleCart(product.id, "smartphone") })}
                                {...(isAccessories && { onCartClick: () => handleCart(product.id, "accessory") })}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsCards;
