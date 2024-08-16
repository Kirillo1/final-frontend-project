import { useEffect } from "react";
import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";
import { useNavigate } from "react-router-dom";

const SmartphonesCards = () => {
    const navigate = useNavigate(); // хук для роутинга

    const {
        smartphones,
        fetchData,
        onToggleFavorite
    } = useProductsStore(state => ({
        smartphones: state.smartphones,
        fetchData: state.fetchData,
        onToggleFavorite: state.onToggleFavorite
    }));

    useEffect(() => {
        fetchData("smartphones", "smartphones");
    }, [fetchData]);

    // Обработчик клика по карточке
    const handleCardClick = (endpoint, id) => {
        navigate(`/product_detail/${endpoint}/${id}/`);
    };

    // Обработчик добавления товара в сохраненки 
    const handleFavorite = (id) => {
        onToggleFavorite(id); // вкл/выкл товара в сохраненки
    };

    return (
        <section className="products">
            <div className="max-w-7xl mx-auto px-2 mt-4">
                <h2 className="mb-5 text-4xl font-bold text-zinc-100">
                    Смартфоны
                </h2>
                <div className="flex flex-wrap gap-9 py-10">
                    {!!smartphones &&
                        smartphones.map((smartphone) => (
                            <Card
                                key={smartphone.id}
                                details={{
                                    ...smartphone,
                                    isFavorite: smartphone.isFavorite
                                }}
                                onCardClick={handleCardClick}
                                onHeartClick={handleFavorite}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default SmartphonesCards;
