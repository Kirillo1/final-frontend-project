import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card/Card";
import Alert from "../components/ui/Alert/Alert";
import useProductsStore from "../store/useProductsStore";

const FavoritesList = () => {
  const navigate = useNavigate();
  const { smartphones, accessories } = useProductsStore((state) => ({
    smartphones: state.smartphones,
    accessories: state.accessories,
    onToggleCartProducts: state.onToggleCartProducts,
  }));

  const [favorites, setFavorites] = useState({
    smartphones: [],
    accessories: [],
  });

  // Стейт для скрытия/показа и передачи сообщения в Alert
  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: "",
  });

  // Обработчик закрытия компонента Alert
  const handleCloseAlert = () => {
    setAlertState({ ...alertState, isOpen: false });
  };

  const loadFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");
    let storedData = storedFavorites ? JSON.parse(storedFavorites) : null;

    if (
      !storedData ||
      typeof storedData !== "object" ||
      !Array.isArray(storedData.smartphones) ||
      !Array.isArray(storedData.accessories)
    ) {
      storedData = { smartphones: [], accessories: [] };
    }

    setFavorites({
      smartphones: storedData.smartphones || [],
      accessories: storedData.accessories || [],
    });
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "favorites") {
        loadFavorites();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleCardClick = (type, id) => {
    const route =
      type === "smartphones"
        ? `/product_detail/smartphones/${id}/`
        : `/product_detail/accessories/${id}/`;
    navigate(route);
  };

  return (
    <>
      <section className="new-products">
        <div className="max-w-7xl mx-auto px-2 relative">
          <h1 className="mb-4 text-4xl font-bold text-zinc-100">
            Понравившиеся товары
          </h1>

          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-9">
              {smartphones
                .filter((item) => favorites.smartphones.includes(item.id))
                .map((item) => (
                  <Card
                    key={item?.id}
                    details={{
                      ...item,
                      isFavorite: true,
                    }}
                    onCardClick={() =>
                      handleCardClick("smartphones", item.id)
                    }
                  />
                ))}
              {accessories
                .filter((item) => favorites.accessories.includes(item.id))
                .map((item) => (
                  <Card
                    key={item?.id}
                    details={{
                      ...item,
                      isFavorite: true,
                    }}
                    onCardClick={() =>
                      handleCardClick("accessories", item.id)
                    }
                  />
                ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto py-3">
            <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded">
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
