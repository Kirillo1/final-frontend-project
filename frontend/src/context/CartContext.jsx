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
      const categoryCartProducts = prev[category] || [];
      const isAlreadyCartProducts = categoryCartProducts.includes(id);

      const updatedCartProducts = {
        ...prev,
        [category]: isAlreadyCartProducts
          ? categoryCartProducts.filter((item) => item !== id)
          : [...categoryCartProducts, id],
      };

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
