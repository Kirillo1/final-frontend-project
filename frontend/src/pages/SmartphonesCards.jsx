import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";
import { useNavigate } from "react-router-dom";

const SmartphonesCards = () => {
    const navigate = useNavigate(); // хук для роутинга
    // Стор для работы с смартфонами
    // const { smartphones, getSmartphones } = useSmartphonesStore();
    const {
        smartphones,
        fetchData,
    } = useProductsStore(state => ({
        smartphones: state.smartphones,
        fetchData: state.fetchData,
    }));

    useEffect(() => {
        fetchData("smartphones", "smartphones");
    }, [fetchData]);

    // Обработчик клика по карточке
    const handleCardClick = (endpoint, id) => {
        navigate(`/product_detail/${endpoint}/${id}/`)
    }

    return (
        <>
            <section className="products">
                <div className="max-w-7xl mx-auto px-2 mt-4">
                    <h2 className="mb-5 text-4xl font-bold text-zinc-100">
                        Смартфоны
                    </h2>
                    <div className="flex flex-wrap gap-9 py-10">
                        {!!smartphones &&
                            smartphones.map((smartphone) => (
                                <Card
                                    key={smartphone?.id}
                                    details={smartphone}
                                    onCardClick={handleCardClick}
                                />
                            ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default SmartphonesCards;
