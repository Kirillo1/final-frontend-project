import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Stepper } from "../Stepper/Stepper";
import Image from "../Image/Image";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Переключение изображения вперёд
  const nextImage = (event) => {
    event.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Переключение изображения назад
  const prevImage = (event) => {
    event.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleCartProduct = (event) => {
    event.stopPropagation();
    toggleCartProduct("smartphones", id, price);
  };

  const handleFavorite = (event) => {
    event.stopPropagation();
    toggleFavorite("smartphones", id);
  };

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
          src={`../assets/smartphones/${images[currentImageIndex]}`}
          alt={name}
        />

        {/* Кнопки для переключения изображений */}
        {images.length > 1 && (
          <>
            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 
    text-violet-600 w-8 h-8 rounded-full 
      flex items-center justify-center transition-transform 
                 duration-200 hover:scale-150"
              onClick={prevImage}
            >
              <NavigateBeforeIcon />
            </button>
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 
       text-violet-600 w-8 h-8 rounded-full 
       transition-transform 
                 duration-200 hover:scale-150"
              onClick={nextImage}
            >
              <span>
                <NavigateNextIcon />
              </span>
            </button>
          </>
        )}

        <button
          className={`absolute top-0 m-2 p-2 right-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center z-0 ${
            isCartProduct ? "text-violet-600" : "text-white"
          }`}
          onClick={handleCartProduct}
        >
          <LocalMallRoundedIcon />
        </button>
        {!isCartPage && (
          <button
            onClick={handleFavorite}
            className={`absolute top-0 left-0 m-2 p-2 bg-black bg-opacity-30 rounded-full flex items-center justify-center z-0 ${
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
