import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState(() => {
    const storedCartProducts = localStorage.getItem("cartProducts");

    let parsedCartProducts = storedCartProducts
      ? JSON.parse(storedCartProducts)
      : null;
    if (
      !parsedCartProducts ||
      !Array.isArray(parsedCartProducts.smartphones) ||
      !Array.isArray(parsedCartProducts.accessories)
    ) {
      parsedCartProducts = { smartphones: [], accessories: [] };
    }

    return parsedCartProducts;
  });

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  const toggleCartProduct = (category, id) => {
    setCartProducts((prev) => {
      const categoryProducts = prev[category] || [];
      const productIndex = categoryProducts.findIndex((item) => item.id === id);

      let updatedCartProducts;

      if (productIndex === -1) {
        updatedCartProducts = {
          ...prev,
          [category]: [...categoryProducts, { id, quantity: 1 }],
        };
      } else {
        const updatedCategory = categoryProducts.filter(
          (item) => item.id !== id
        );
        updatedCartProducts = { ...prev, [category]: updatedCategory };
      }

      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
      return updatedCartProducts;
    });
  };

  return (
    <CartContext.Provider value={{ cartProducts, toggleCartProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartProducts = () => useContext(CartContext);
