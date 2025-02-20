import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState({ smartphones: [], accessories: [] });

    const toggleCartProduct = (category, id) => {
        setCartProducts((prev) => {
            const categoryCartProducts = prev[category] || [];
            const isAlreadyCartProducts = categoryCartProducts.includes(id);

            return {
                ...prev,
                [category]: isAlreadyCartProducts
                    ? categoryCartProducts.filter(item => item !== id)
                    : [...categoryCartProducts, id],
            };
        });
    };

    return (
        <CartContext.Provider value={{ cartProducts, toggleCartProduct }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartProducts = () => useContext(CartContext);