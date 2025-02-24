import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { smartphones, accessories, fetchData } = useProductsStore((state) => ({
    smartphones: state.smartphones,
    accessories: state.accessories,
    fetchData: state.fetchData,
  }));

  const [favorites, setFavorites] = useState(new Set());
  const [cartProducts, setCartProducts] = useState(new Set());

  const navigate = useNavigate();

  useEffect(() => {
    fetchData("smartphones", "smartphones");
    fetchData("accessories", "accessories");
  }, [fetchData]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");

    const favorites = storedFavorites
      ? JSON.parse(storedFavorites)
      : { smartphones: [], accessories: [] };

    const validFavorites =
      favorites &&
      Array.isArray(favorites.smartphones) &&
      Array.isArray(favorites.accessories)
        ? favorites
        : { smartphones: [], accessories: [] };

    setFavorites(
      new Set([
        ...validFavorites.smartphones.map((id) => `smartphones-${id}`),
        ...validFavorites.accessories.map((id) => `accessories-${id}`),
      ])
    );
  }, []);

  useEffect(() => {
    const storedCartProducts = localStorage.getItem("cartProducts");

    const cartProducts = storedCartProducts
      ? JSON.parse(storedCartProducts)
      : { smartphones: [], accessories: [] };

    const validCartProducts =
      cartProducts &&
      Array.isArray(cartProducts.smartphones) &&
      Array.isArray(cartProducts.accessories)
        ? cartProducts
        : { smartphones: [], accessories: [] };

    setCartProducts(
      new Set([
        ...validCartProducts.smartphones.map((id) => `smartphones-${id}`),
        ...validCartProducts.accessories.map((id) => `accessories-${id}`),
      ])
    );
  }, []);

  const handleCardClick = (endpoint, id) => {
    navigate(`/product_detail/${endpoint}/${id}/`);
  };

  return (
    <section className="new-products">
      <div className="max-w-7xl mx-auto px-2 relative">
        <h1 className="mb-4 text-4xl font-bold text-zinc-100">
          Новинки 2025 года!
        </h1>

        <section className="smartphones">
          <div className="max-w-7xl mx-auto px-2">
            <h3 className="mb-4 text-4xl font-bold text-zinc-100">Смартфоны</h3>
            <div className="flex flex-wrap gap-9">
              {!!smartphones &&
                smartphones.map((smartphone) => (
                  <Card
                    key={smartphone?.id}
                    details={{
                      ...smartphone,
                      isFavorite: favorites.has(`smartphones-${smartphone.id}`),
                      isCartProduct: cartProducts.has(
                        `smartphones-${smartphone.id}`
                      ),
                    }}
                    onCardClick={() =>
                      handleCardClick("smartphones", smartphone.id)
                    }
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
                      isFavorite: favorites.has(`accessories-${accessory.id}`),
                      isCartProduct: cartProducts.has(
                        `accessories-${accessory.id}`
                      ),
                    }}
                    onCardClick={() =>
                      handleCardClick("accessories", accessory.id)
                    }
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
