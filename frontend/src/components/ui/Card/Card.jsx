import { useLocation } from "react-router-dom";
import { Stepper } from "../Stepper/Stepper";
import Image from "../Image/Image";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import { useFavorites } from "../../../context/FavoriteContext";
import { useCartProducts } from "../../../context/CartContext";
import { useMemo } from "react";

export const Card = (props) => {
  const { id, name, phone_model, price, color, images, productType } =
    props.details;
  const { onCardClick } = props;

  const { favorites, toggleFavorite } = useFavorites();
  const { cartProducts, toggleCartProduct } = useCartProducts();
  const location = useLocation();

  const isCartProduct =
    cartProducts?.smartphones?.some((item) => item.id === id) ||
    cartProducts?.accessories?.some((item) => item.id === id) ||
    false;

  const isFavorite = favorites?.smartphones?.includes(id) || false;

  const isCartPage = location.pathname.includes("/cart");

  const stepperValue = useMemo(() => {
    if (!isCartPage) return 1;

    const storedCartProducts = localStorage.getItem("cartProducts");
    const storedData = storedCartProducts
      ? JSON.parse(storedCartProducts)
      : null;

    if (!storedData) return 1;

    const product = storedData[productType]?.find((item) => item.id === id);
    return product ? product.quantity : 1;
  }, [isCartPage, productType, id]);

  // Обработчик клика на иконку корзины
  const handleCartProduct = (event) => {
    event.stopPropagation(); // Предотвратить всплытие события
    toggleCartProduct("smartphones", id, price);
  };

  // Обработчик клика на иконку сердечка
  const handleFavorite = (event) => {
    event.stopPropagation();
    toggleFavorite("smartphones", id);
  };

  // Обработчик клика по карточке
  const handleCardClick = () => {
    onCardClick && onCardClick("smartphone", id);
  };

  const handleQuantityChange = (value) => {
    if (props.onQuantityChange) {
      props.onQuantityChange(value);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-gray-500 max-w-72 rounded-md overflow-hidden shadow-xl hover:shadow-violet-600 mb-1 cursor-pointer"
    >
      <div className="relative">
        <Image
          className="w-full max-h-60"
          isCritical={true}
          src={`../assets/smartphones/${images[0]}`}
          alt={name}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 transition-opacity duration-300 hover:opacity-40"></div>
        <button
          className={`absolute top-0 m-2 p-2 right-0 rounded-full z-0 ${
            isCartProduct ? "text-violet-600" : "text-white"
          }`}
          onClick={handleCartProduct}
        >
          <LocalMallRoundedIcon />
        </button>
        {!isCartPage && ( // Показываем кнопку избранного только если не на странице корзины
          <button
            onClick={handleFavorite}
            className={`absolute top-0 left-0 m-2 p-2 rounded-full z-0 ${
              isFavorite ? "text-violet-500" : "text-white"
            }`}
          >
            <FavoriteRoundedIcon />
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 text-zinc-200">{name}</h3>
        {phone_model && (
          <p className="text-zinc-200 text-semibold mb-4">{phone_model}</p>
        )}
        {color && <p className="text-zinc-200 text-semibold mb-4">{color}</p>}
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-md text-zinc-200">
            {price.toLocaleString("ru-RU")} ₽
          </span>
        </div>
        {isCartPage && (
          <div className="flex justify-center">
            <Stepper
              step={1}
              minValue={1}
              maxValue={10}
              defaultValue={stepperValue}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
