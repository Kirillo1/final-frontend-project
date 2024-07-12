import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card/Card";
import useSmartphonesStore from "../store/useSmartphonesStore";
import { useNavigate } from "react-router-dom";

const Cards = () => {
    const navigate = useNavigate(); // хук для роутинга
    // Стор для работы с смартфонами
    const { smartphones, getSmartphones } = useSmartphonesStore();

    useEffect(() => {
        getSmartphones();
    }, [getSmartphones]);

    // Обработчик клика по карточке
    const handleCardClick = (name, id) => {
        navigate(`/smartphone/${name}/${id}/`)
    }

    return (
        <>
            <section className="products">
                <div className="max-w-7xl mx-auto px-2">
                    <h2 className="mb-4 text-4xl font-bold text-zinc-800">
                        Смартфоны
                    </h2>
                    <div className="flex flex-wrap gap-9">
                        {!!smartphones &&
                            smartphones.map((smartphone) => (
                                <Card
                                    key={smartphone?.id}
                                    details={smartphone}
                                    onCardClick={handleCardClick}
                                />
                            ))}
                    </div>
                    <div></div>
                </div>
            </section>
        </>
    );
};

export default Cards;
