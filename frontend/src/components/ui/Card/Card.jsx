import Image from "../Image/Image";

/**
 * Компонент карточка.
 * @param {object} props - Свойства компонента.
 * @param {object} props.details - Детали карточки смартфона.
 * @param {string} props.details.id - Идентификатор карточки.
 * @param {string} props.details.name - Название смартфона.
 * @param {string} props.details.phone_model - Модель смартфона.
 * @param {string} props.details.description - Описание смартфона.
 * @param {string} [props.details.price] - Цена смартфона.
 * @param {array} [props.details.imgSrc] - Массив с путями изображений.
 * @param {function} props.onClick - Обработчик клика по карточке (необязательно).
 * @returns {JSX.Element} Элемент JSX.
 */
export const Card = (props) => {
    const {
        id,
        name,
        phone_model,
        price,
        color,
        images,
    } = props.details;

    const { onCardClick, onHeartClick } = props;

    // Обработчик клика на иконку сердечка
    const handleFavorite = (event) => {
        event.stopPropagation(); // Предотвр. всплытие события

        onHeartClick && onHeartClick(id);
    };

    // Обработчик клика по карточке
    const handleCardClick = () => {
        onCardClick && onCardClick("smartphone", id);
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
                {price && (
                    <div className="absolute top-0 right-0 bg-violet-600 text-white px-2 py-1 m-2 rounded-md text-sm font-normal">
                        SALE
                    </div>
                )}
                <button
                    onClick={handleFavorite}
                    // className={`absolute top-0 left-0 m-2 p-2 rounded-full z-0 ${isFavorite ? "text-indigo-500" : "text-white"
                    //     }`}
                    className="absolute top-0 left-0 m-2 p-2 rounded-full z-0  text-white"
                >
                    <svg
                        className="w-6 h-6 fill-current"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                    </svg>
                </button>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-zinc-200">{name}</h3>
                {phone_model && (
                    <p className="text-zinc-200 text-semibold mb-4">{phone_model}</p>
                )}
                {color && <p className="text-zinc-200 text-semibold mb-4">{color}</p>}
                {/* {rating && (
                    <div className="text-yellow-500 mb-4">
                        {"★".repeat(Math.floor(rating)) +
                            "☆".repeat(5 - Math.floor(rating))}
                    </div>
                )} */}
                <div className="flex items-center justify-between">
                    <span className="font-extrabold text-md text-zinc-200">{price.toLocaleString('ru-RU')} ₽</span>
                </div>
            </div>
        </div>
    );
};
