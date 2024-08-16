import Image from "../Image/Image";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';

export const Card = (props) => {
    const {
        id,
        name,
        phone_model,
        price,
        color,
        images,
        isFavorite // Добавлено
    } = props.details;

    const { onCardClick, onHeartClick } = props;

    // Обработчик клика на иконку сердечка
    const handleFavorite = (event) => {
        event.stopPropagation(); // Предотвратить всплытие события
        console.log(1)
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
                <button
                    className="absolute top-0 right-0 bg-violet-600 text-white px-2 py-1 m-2 rounded-md text-sm font-normal"
                >
                    <LocalMallRoundedIcon />
                </button>
                <button
                    onClick={handleFavorite}
                    className={`absolute top-0 left-0 m-2 p-2 rounded-full z-0 ${isFavorite ? "text-indigo-500" : "text-white"}`}
                >
                    <FavoriteRoundedIcon />
                </button>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-zinc-200">{name}</h3>
                {phone_model && (
                    <p className="text-zinc-200 text-semibold mb-4">{phone_model}</p>
                )}
                {color && <p className="text-zinc-200 text-semibold mb-4">{color}</p>}
                <div className="flex items-center justify-between">
                    <span className="font-extrabold text-md text-zinc-200">{price.toLocaleString('ru-RU')} ₽</span>
                </div>
            </div>
        </div>
    );
};
