import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card/Card";
import useSmartphonesStore from "../store/useSmartphonesStore";
import useAccessoriesStore from "../store/useAccessoriesStore";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate(); // хук для роутинга
    // Стор для работы с смартфонами
    const { smartphones, getSmartphones } = useSmartphonesStore();

    // Стор для работы с аксессуарами
    const { accessories, getAccessories } = useAccessoriesStore();

    useEffect(() => {
        getSmartphones();
    }, [getSmartphones]);

    useEffect(() => {
        getAccessories();
    }, [getAccessories]);

    // Обработчик клика по карточке смартфона
    const handleSmartphoneCardClick = (name, id) => {
        navigate(`/smartphone/${name}/${id}/`)
    }

    // Обработчик клика по карточке аксессуара
    const handleAccessorCardClick = (name, id) => {
        navigate(`/accessory/${name}/${id}/`)
    }

    return (
        <section className="new-products">
            <div className="max-w-7xl mx-auto px-2 relative">
                <h1 className="mb-4 text-4xl font-bold text-zinc-100">Новинки 2024 года!</h1>

                <section className="smartphones">
                    <div className="max-w-7xl mx-auto px-2">
                        <h3 className="mb-4 text-4xl font-bold text-zinc-100">
                            Смартфоны
                        </h3>
                        <div className="flex flex-wrap gap-9">
                            {!!smartphones &&
                                smartphones.map((smartphone) => (
                                    <Card
                                        key={smartphone?.id}
                                        details={smartphone}
                                        onCardClick={handleSmartphoneCardClick}
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
                                        details={accessory}
                                        onCardClick={handleAccessorCardClick}
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